/**
 * Delaware Coastal Dashboard — WebSocket companion server
 *
 * Aggregates free public APIs (Open-Meteo, NWS, NOAA CO-OPS, NDBC)
 * and broadcasts a unified payload to connected browsers every minute.
 *
 * Usage:
 *   cd server && npm install && npm start
 *   Then set window.DASHBOARD_CONFIG.WS_URL = "ws://localhost:8787" in config.js
 *
 * Deploy options: Railway, Render, Fly.io, a VPS, or Cloudflare Workers (adapt).
 */

const http = require('http');
const { WebSocketServer } = require('ws');

const PORT = process.env.PORT || 8787;
const PUSH_MS = Number(process.env.PUSH_MS || 60_000);

const LOCATIONS = [
  { id: 'cape-henlopen', lat: 38.777, lon: -75.095 },
  { id: 'rehoboth', lat: 38.7209, lon: -75.0766 },
  { id: 'dewey', lat: 38.6929, lon: -75.0751 },
  { id: 'de-seashore', lat: 38.610, lon: -75.065 },
  { id: 'bethany', lat: 38.5396, lon: -75.0552 },
  { id: 'fenwick', lat: 38.451, lon: -75.051 }
];

async function fetchJson(url, headers = {}) {
  const res = await fetch(url, { headers: { 'User-Agent': '(Delaware Coastal Dashboard WS, github)', ...headers } });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.json();
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': '(Delaware Coastal Dashboard WS, github)' } });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.text();
}

async function fetchOpenMeteo(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max&timezone=America%2FNew_York&forecast_days=7&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`;
  return fetchJson(url);
}

async function fetchNWSAlerts() {
  try {
    return await fetchJson('https://api.weather.gov/alerts/active?point=38.72,-75.08', {
      Accept: 'application/geo+json'
    });
  } catch {
    return { features: [] };
  }
}

async function fetchTidePredictions(stationId) {
  const now = new Date();
  const begin = now.toISOString().slice(0, 10).replace(/-/g, '');
  const endDate = new Date(now.getTime() + 2 * 24 * 3600 * 1000);
  const end = endDate.toISOString().slice(0, 10).replace(/-/g, '');
  const url = `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?begin_date=${begin}&end_date=${end}&station=${stationId}&product=predictions&datum=MLLW&time_zone=lst_ldt&interval=hilo&units=english&format=json`;
  return fetchJson(url);
}

async function fetchNDBCBuoy() {
  try {
    const text = await fetchText('https://www.ndbc.noaa.gov/data/realtime2/44009.txt');
    const lines = text.trim().split('\n').filter(l => !l.startsWith('#'));
    if (!lines.length) return null;
    const parts = lines[0].trim().split(/\s+/);
    return {
      windDir: parts[5] !== 'MM' ? parseFloat(parts[5]) : null,
      windSpd: parts[6] !== 'MM' ? parseFloat(parts[6]) * 1.15078 : null,
      gust: parts[7] !== 'MM' ? parseFloat(parts[7]) * 1.15078 : null,
      waveHt: parts[8] !== 'MM' ? parseFloat(parts[8]) * 3.28084 : null,
      wavePeriod: parts[9] !== 'MM' ? parseFloat(parts[9]) : null,
      pressure: parts[12] !== 'MM' ? parseFloat(parts[12]) : null,
      airTemp: parts[13] !== 'MM' ? parseFloat(parts[13]) * 9 / 5 + 32 : null,
      waterTemp: parts[14] !== 'MM' ? parseFloat(parts[14]) * 9 / 5 + 32 : null,
      time: `${parts[0]}-${parts[1]}-${parts[2]} ${parts[3]}:${parts[4]} UTC`
    };
  } catch {
    return null;
  }
}

let lastStation = '8557380';
let cachedPayload = null;

async function buildPayload(stationId = lastStation) {
  lastStation = stationId || lastStation;
  const [alerts, primaryWeather, buoy, tides] = await Promise.all([
    fetchNWSAlerts(),
    fetchOpenMeteo(38.72, -75.08),
    fetchNDBCBuoy(),
    fetchTidePredictions(lastStation).catch(() => null)
  ]);

  const weatherCache = {};
  await Promise.all(
    LOCATIONS.map(async (loc) => {
      try {
        weatherCache[loc.id] = await fetchOpenMeteo(loc.lat, loc.lon);
      } catch {
        weatherCache[loc.id] = primaryWeather;
      }
    })
  );

  cachedPayload = {
    alerts,
    primaryWeather,
    buoy,
    weatherCache,
    tides,
    timestamp: Date.now()
  };
  return cachedPayload;
}

function broadcast(wss, obj) {
  const data = JSON.stringify(obj);
  for (const client of wss.clients) {
    if (client.readyState === 1) client.send(data);
  }
}

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, clients: wss.clients.size, lastPush: cachedPayload?.timestamp || null }));
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Delaware Coastal Dashboard WebSocket server. Connect via ws://host:' + PORT);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (socket) => {
  console.log('[ws] client connected, total=', wss.clients.size);
  if (cachedPayload) {
    socket.send(JSON.stringify({ type: 'update', payload: cachedPayload }));
  }
  socket.on('message', async (raw) => {
    try {
      const msg = JSON.parse(String(raw));
      if (msg.type === 'subscribe' && msg.station) {
        lastStation = msg.station;
        const payload = await buildPayload(lastStation);
        socket.send(JSON.stringify({ type: 'update', payload }));
      } else if (msg.type === 'pong') {
        // keepalive ack
      }
    } catch (e) {
      console.warn('[ws] bad message', e.message);
    }
  });
  socket.on('close', () => console.log('[ws] client disconnected, total=', wss.clients.size));
});

async function tick() {
  try {
    const payload = await buildPayload(lastStation);
    broadcast(wss, { type: 'update', payload });
    console.log('[push] clients=', wss.clients.size, 'at', new Date().toISOString());
  } catch (e) {
    console.error('[push] failed', e.message);
  }
}

server.listen(PORT, () => {
  console.log(`Delaware Coastal Dashboard WS server on port ${PORT}`);
  console.log(`Set config.js WS_URL to "ws://localhost:${PORT}" (or wss:// for production)`);
  tick();
  setInterval(tick, PUSH_MS);
  // Keepalive pings every 25s
  setInterval(() => broadcast(wss, { type: 'ping', t: Date.now() }), 25_000);
});
