/**
 * Delaware Coastal Dashboard
 * Free public data only — NWS, NOAA CO-OPS, Open-Meteo, NDBC
 */

const LOCATIONS = [
  {
    id: 'cape-henlopen',
    name: 'Cape Henlopen SP',
    town: 'Lewes',
    lat: 38.777,
    lon: -75.095,
    type: 'park',
    tideStation: '8557380',
    webcam: 'https://www.cmllf.com/webcam/',
    notes: 'Ocean + bay beaches, fishing pier, trails'
  },
  {
    id: 'rehoboth',
    name: 'Rehoboth Beach',
    town: 'Rehoboth Beach',
    lat: 38.7209,
    lon: -75.0766,
    type: 'town',
    tideStation: '8557863',
    webcam: 'https://www.atlanticsandshotel.com/webcam/',
    notes: 'Boardwalk, guarded beach in season'
  },
  {
    id: 'dewey',
    name: 'Dewey Beach',
    town: 'Dewey Beach',
    lat: 38.6929,
    lon: -75.0751,
    type: 'town',
    tideStation: '8557863',
    webcam: null,
    notes: 'Lively beach town, bay + ocean access'
  },
  {
    id: 'de-seashore',
    name: 'Delaware Seashore SP',
    town: 'Indian River Inlet',
    lat: 38.610,
    lon: -75.065,
    type: 'park',
    tideStation: '8557863',
    webcam: null,
    notes: 'Ocean + bay, marina, inlet bridge'
  },
  {
    id: 'bethany',
    name: 'Bethany Beach',
    town: 'Bethany Beach',
    lat: 38.5396,
    lon: -75.0552,
    type: 'town',
    tideStation: '8557863',
    webcam: 'https://www.townofbethanybeach.com/',
    notes: 'Family beach, boardwalk'
  },
  {
    id: 'fenwick',
    name: 'Fenwick Island SP',
    town: 'Fenwick Island',
    lat: 38.451,
    lon: -75.051,
    type: 'park',
    tideStation: '8557863',
    webcam: null,
    notes: 'Quieter ocean + Assawoman Bay access'
  }
];

const PARKS = [
  {
    name: 'Cape Henlopen State Park',
    status: 'Open',
    hours: '8 AM – Sunset',
    fee: '$10 DE / $20 out-of-state',
    notes: 'Daily year-round. Lifeguards Memorial Day–Labor Day. Seasonal Point closures for nesting birds (Mar–Sep).'
  },
  {
    name: 'Delaware Seashore State Park',
    status: 'Open',
    hours: '8 AM – Sunset',
    fee: '$10 DE / $20 out-of-state',
    notes: 'Daily year-round. Guarded swimming in season. Drive-on surf fishing areas may have restrictions.'
  },
  {
    name: 'Fenwick Island State Park',
    status: 'Open',
    hours: '8 AM – Sunset',
    fee: '$10 DE / $20 out-of-state',
    notes: 'Daily year-round. Administered with Delaware Seashore. Quiet ocean beach + bay recreation area.'
  },
  {
    name: 'Holts Landing State Park',
    status: 'Open',
    hours: '8 AM – Sunset',
    fee: '$10 DE / $20 out-of-state',
    notes: 'Bay-side park. Boat ramp, picnicking, crabbing/clamming. No ocean beach.'
  }
];

const WEBCAMS = [
  {
    id: 'atlantic-sands',
    name: 'Atlantic Sands Boardwalk',
    loc: 'Rehoboth Beach',
    embed: 'https://player.brownrice.com/embed/atlanticsands2',
    external: 'https://www.visitdebeaches.com/webcams/live-boardwalk-cam-atlantic-sands-hotel-in-rehoboth-beach/',
    note: 'Ocean & boardwalk from Atlantic Sands Hotel rooftop'
  },
  {
    id: 'cmlf-lewes',
    name: 'Cape May–Lewes Ferry',
    loc: 'Lewes / Delaware Bay',
    embed: null,
    external: 'https://www.cmlf.com/check-traffic-live-webcam-feeds/',
    note: 'Ferry terminal, staging lanes & bay views'
  },
  {
    id: 'boardwalk-plaza',
    name: 'Boardwalk Plaza Hotel',
    loc: 'Rehoboth Beach',
    embed: null,
    external: 'https://www.boardwalkplaza.com/',
    note: 'Oceanfront beach view'
  },
  {
    id: 'bethany-town',
    name: 'Bethany Beach Boardwalk',
    loc: 'Bethany Beach',
    embed: null,
    external: 'https://www.townofbethanybeach.com/',
    note: 'Town boardwalk & beach cams'
  },
  {
    id: 'sea-colony',
    name: 'Sea Colony Beach',
    loc: 'Bethany Beach',
    embed: null,
    external: 'https://www.seacolony.com/',
    note: 'Oceanfront resort beach'
  },
  {
    id: 'dewey-bay',
    name: 'Dewey Beach / Bay Resort',
    loc: 'Dewey Beach',
    embed: null,
    external: 'https://bayresort.com/',
    note: 'Rehoboth Bay pier view'
  },
  {
    id: 'deldot',
    name: 'DelDOT Coastal Cams',
    loc: 'Route 1 / Indian River Inlet',
    embed: null,
    external: 'https://deldot.gov/map/',
    note: 'Traffic & inlet bridge cameras'
  },
  {
    id: 'dupont-nature',
    name: 'DuPont Nature Center',
    loc: 'Mispillion Harbor',
    embed: null,
    external: 'https://www.dupontnaturecenter.com/',
    note: 'Bay wildlife & harbor'
  }
];

// ---------- Helpers ----------
function formatTime(isoOrDate) {
  const d = typeof isoOrDate === 'string' ? new Date(isoOrDate) : isoOrDate;
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/New_York' });
}

function formatDay(iso) {
  return new Date(iso).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'America/New_York' });
}

function windDir(deg) {
  if (deg == null) return '—';
  const dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  return dirs[Math.round(deg / 22.5) % 16];
}

function weatherIcon(code, isDay = true) {
  // Open-Meteo WMO weather codes simplified
  if (code === 0) return isDay ? '☀️' : '🌙';
  if (code <= 3) return '⛅';
  if (code <= 48) return '🌫️';
  if (code <= 67) return '🌧️';
  if (code <= 77) return '🌨️';
  if (code <= 82) return '🌦️';
  if (code <= 99) return '⛈️';
  return '🌡️';
}

function riskBadge(level) {
  const map = {
    low: { bg: 'bg-emerald-900/60 text-emerald-300 border-emerald-700', label: 'Low' },
    moderate: { bg: 'bg-amber-900/60 text-amber-300 border-amber-700', label: 'Moderate' },
    high: { bg: 'bg-red-900/60 text-red-300 border-red-700', label: 'High' },
    unknown: { bg: 'bg-slate-800 text-slate-400 border-slate-600', label: '—' }
  };
  const s = map[level] || map.unknown;
  return `<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${s.bg}">${s.label}</span>`;
}

// ---------- Data Fetchers ----------
async function fetchOpenMeteo(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max&timezone=America%2FNew_York&forecast_days=7&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Open-Meteo failed');
  return res.json();
}

async function fetchNWSAlerts() {
  // Point near Rehoboth / Sussex County coast
  const url = 'https://api.weather.gov/alerts/active?point=38.72,-75.08';
  const res = await fetch(url, {
    headers: { 'User-Agent': '(Delaware Coastal Dashboard, github-pages)', 'Accept': 'application/geo+json' }
  });
  if (!res.ok) return { features: [] };
  return res.json();
}

async function fetchTidePredictions(stationId) {
  const now = new Date();
  const begin = now.toISOString().slice(0, 10).replace(/-/g, '');
  const endDate = new Date(now.getTime() + 2 * 24 * 3600 * 1000);
  const end = endDate.toISOString().slice(0, 10).replace(/-/g, '');
  const url = `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?begin_date=${begin}&end_date=${end}&station=${stationId}&product=predictions&datum=MLLW&time_zone=lst_ldt&interval=hilo&units=english&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Tide API failed');
  return res.json();
}

async function fetchNDBCBuoy() {
  // 44009 Delaware Bay
  try {
    const url = 'https://www.ndbc.noaa.gov/data/realtime2/44009.txt';
    const res = await fetch(url);
    if (!res.ok) return null;
    const text = await res.text();
    const lines = text.trim().split('\n');
    // Skip header lines starting with #
    const dataLines = lines.filter(l => !l.startsWith('#'));
    if (dataLines.length < 1) return null;
    const parts = dataLines[0].trim().split(/\s+/);
    // Format: YY MM DD hh mm WDIR WSPD GST WVHT DPD APD MWD PRES ATD ATMP DEWPT VIS PTDY TIDE
    return {
      windDir: parts[5] !== 'MM' ? parseFloat(parts[5]) : null,
      windSpd: parts[6] !== 'MM' ? parseFloat(parts[6]) * 1.15078 : null, // m/s → mph approx
      gust: parts[7] !== 'MM' ? parseFloat(parts[7]) * 1.15078 : null,
      waveHt: parts[8] !== 'MM' ? parseFloat(parts[8]) * 3.28084 : null, // m → ft
      wavePeriod: parts[9] !== 'MM' ? parseFloat(parts[9]) : null,
      pressure: parts[12] !== 'MM' ? parseFloat(parts[12]) : null,
      airTemp: parts[13] !== 'MM' ? parseFloat(parts[13]) * 9/5 + 32 : null,
      waterTemp: parts[14] !== 'MM' ? parseFloat(parts[14]) * 9/5 + 32 : null,
      time: `${parts[0]}-${parts[1]}-${parts[2]} ${parts[3]}:${parts[4]} UTC`
    };
  } catch (e) {
    console.warn('NDBC fetch failed', e);
    return null;
  }
}

// ---------- Renderers ----------
function renderAlerts(alerts) {
  const banner = document.getElementById('alerts-banner');
  const list = document.getElementById('alerts-list');
  if (!alerts.features || alerts.features.length === 0) {
    banner.classList.add('hidden');
    return;
  }
  banner.classList.remove('hidden');
  list.innerHTML = alerts.features.slice(0, 5).map(f => {
    const p = f.properties;
    return `<div><strong>${p.event}</strong> — ${p.headline || p.description?.slice(0, 160) || ''}… <span class="opacity-75">(${p.severity || 'Active'})</span></div>`;
  }).join('');
}

function renderSnapshot(weather, buoy) {
  const grid = document.getElementById('snapshot-grid');
  const c = weather.current;
  const items = [
    { label: 'Air Temp', value: `${Math.round(c.temperature_2m)}°F`, sub: `Feels ${Math.round(c.apparent_temperature)}°F` },
    { label: 'Wind', value: `${Math.round(c.wind_speed_10m)} mph`, sub: windDir(c.wind_direction_10m) },
    { label: 'Gusts', value: `${Math.round(c.wind_gusts_10m || 0)} mph`, sub: 'Peak' },
    { label: 'Humidity', value: `${c.relative_humidity_2m}%`, sub: 'Relative' },
    { label: 'Water Temp', value: buoy?.waterTemp ? `${Math.round(buoy.waterTemp)}°F` : '—', sub: 'Buoy 44009' },
    { label: 'Wave Height', value: buoy?.waveHt != null ? `${buoy.waveHt.toFixed(1)} ft` : '—', sub: buoy?.wavePeriod ? `${buoy.wavePeriod}s period` : 'Offshore' }
  ];
  grid.innerHTML = items.map(i => `
    <div class="glass rounded-xl p-4 card-hover transition">
      <p class="text-xs text-ocean-400 uppercase tracking-wide">${i.label}</p>
      <p class="text-2xl font-semibold text-white mt-1">${i.value}</p>
      <p class="text-xs text-ocean-300 mt-0.5">${i.sub}</p>
    </div>
  `).join('');
  document.getElementById('snapshot-meta').textContent = `Updated ${formatTime(new Date())} ET`;
}

function renderBeachCards(locations, weatherCache) {
  const container = document.getElementById('beach-cards');
  container.innerHTML = locations.map(loc => {
    const w = weatherCache[loc.id];
    const c = w?.current;
    const code = c?.weather_code ?? 0;
    const temp = c ? Math.round(c.temperature_2m) : '—';
    const wind = c ? `${Math.round(c.wind_speed_10m)} mph ${windDir(c.wind_direction_10m)}` : '—';
    const precip = c?.precipitation ? `${c.precipitation.toFixed(2)} in` : '0 in';
    const isPark = loc.type === 'park';
    return `
      <article class="glass rounded-2xl p-5 card-hover transition flex flex-col">
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-lg font-semibold text-white">${loc.name}</h3>
              ${isPark ? '<span class="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-ocean-700 text-ocean-200">Park</span>' : '<span class="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-ocean-800 text-ocean-300">Town</span>'}
            </div>
            <p class="text-sm text-ocean-400">${loc.town}</p>
          </div>
          <div class="text-3xl" title="Conditions">${weatherIcon(code)}</div>
        </div>
        <div class="mt-4 grid grid-cols-3 gap-3 text-center">
          <div>
            <p class="text-2xl font-semibold text-white">${temp}°</p>
            <p class="text-[11px] text-ocean-400">Air</p>
          </div>
          <div>
            <p class="text-sm font-medium text-ocean-200 leading-tight">${wind}</p>
            <p class="text-[11px] text-ocean-400">Wind</p>
          </div>
          <div>
            <p class="text-sm font-medium text-ocean-200">${precip}</p>
            <p class="text-[11px] text-ocean-400">Precip</p>
          </div>
        </div>
        <p class="mt-4 text-xs text-ocean-400 flex-1">${loc.notes}</p>
        <div class="mt-4 pt-3 border-t border-ocean-700/50 flex items-center justify-between text-xs">
          <span class="text-ocean-300">Rip risk: check NWS Surf Zone</span>
          <a href="https://forecast.weather.gov/MapClick.php?lat=${loc.lat}&lon=${loc.lon}" target="_blank" rel="noopener" class="text-ocean-300 hover:text-white underline">NWS</a>
        </div>
      </article>
    `;
  }).join('');
}

function renderForecast(daily) {
  const strip = document.getElementById('forecast-strip');
  if (!daily) return;
  strip.innerHTML = daily.time.map((t, i) => {
    const max = Math.round(daily.temperature_2m_max[i]);
    const min = Math.round(daily.temperature_2m_min[i]);
    const pop = daily.precipitation_probability_max[i] ?? 0;
    const code = daily.weather_code[i];
    const uv = daily.uv_index_max?.[i];
    return `
      <div class="w-28 flex-shrink-0 glass rounded-xl p-3 text-center">
        <p class="text-xs font-medium text-ocean-300">${formatDay(t)}</p>
        <div class="text-2xl my-2">${weatherIcon(code)}</div>
        <p class="text-white font-semibold">${max}°</p>
        <p class="text-ocean-400 text-sm">${min}°</p>
        <p class="text-[11px] text-ocean-400 mt-2">${pop}% rain</p>
        ${uv != null ? `<p class="text-[10px] text-ocean-500">UV ${Math.round(uv)}</p>` : ''}
      </div>
    `;
  }).join('');
}

function renderTides(data) {
  const list = document.getElementById('tide-list');
  const chart = document.getElementById('tide-chart');
  if (!data?.predictions) {
    list.innerHTML = '<li class="text-ocean-400">Tide data unavailable</li>';
    chart.innerHTML = '';
    return;
  }
  const preds = data.predictions.slice(0, 8);
  list.innerHTML = preds.map(p => {
    const isHigh = p.type === 'H';
    return `
      <li class="flex items-center justify-between py-1.5 border-b border-ocean-800/60 last:border-0">
        <span class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full ${isHigh ? 'bg-accent-gold' : 'bg-ocean-400'}"></span>
          <span class="text-ocean-200">${isHigh ? 'High' : 'Low'}</span>
        </span>
        <span class="text-white font-medium">${formatTime(p.t)}</span>
        <span class="text-ocean-300 tabular-nums">${parseFloat(p.v).toFixed(1)} ft</span>
      </li>
    `;
  }).join('');

  // Simple bar chart for next ~24h of hilo
  const maxH = Math.max(...preds.map(p => parseFloat(p.v)), 1);
  chart.innerHTML = preds.map(p => {
    const h = (parseFloat(p.v) / maxH) * 100;
    const isHigh = p.type === 'H';
    return `
      <div class="flex-1 flex flex-col items-center justify-end gap-1 group">
        <span class="text-[10px] text-ocean-400 opacity-0 group-hover:opacity-100 transition">${parseFloat(p.v).toFixed(1)}</span>
        <div class="w-full rounded-t tide-bar ${isHigh ? 'bg-gradient-to-t from-ocean-600 to-accent-gold' : 'bg-gradient-to-t from-ocean-800 to-ocean-500'}" style="height:${Math.max(h, 8)}%"></div>
        <span class="text-[10px] text-ocean-500">${formatTime(p.t).replace(/\s*(AM|PM)/, '')}</span>
      </div>
    `;
  }).join('');
}

function renderMarine(buoy, weather) {
  const panel = document.getElementById('marine-panel');
  const c = weather?.current;
  panel.innerHTML = `
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-ocean-900/50 rounded-xl p-4">
        <p class="text-xs text-ocean-400 uppercase">Wind (local)</p>
        <p class="text-xl font-semibold text-white mt-1">${c ? Math.round(c.wind_speed_10m) : '—'} mph</p>
        <p class="text-sm text-ocean-300">${c ? windDir(c.wind_direction_10m) : ''} • Gusts ${c ? Math.round(c.wind_gusts_10m || 0) : '—'} mph</p>
      </div>
      <div class="bg-ocean-900/50 rounded-xl p-4">
        <p class="text-xs text-ocean-400 uppercase">Seas (buoy)</p>
        <p class="text-xl font-semibold text-white mt-1">${buoy?.waveHt != null ? buoy.waveHt.toFixed(1) + ' ft' : '—'}</p>
        <p class="text-sm text-ocean-300">${buoy?.wavePeriod ? buoy.wavePeriod + 's period' : 'Check NWS marine'}</p>
      </div>
    </div>
    <div class="bg-ocean-900/40 rounded-xl p-4 text-sm text-ocean-300 leading-relaxed">
      <p class="font-medium text-ocean-200 mb-1">Rip Current Guidance</p>
      <p>Rip current risk is issued daily in the NWS Surf Zone Forecast for Delaware beaches (typically Low / Moderate / High). Always swim near a lifeguard and never swim alone. Conditions can change quickly near inlets, jetties, and piers.</p>
      <a href="https://www.weather.gov/phi/marine" target="_blank" rel="noopener" class="inline-block mt-2 text-ocean-300 underline hover:text-white">NWS Mount Holly Marine & Beach</a>
    </div>
  `;
}

function renderWater(buoy) {
  const panel = document.getElementById('water-panel');
  const wt = buoy?.waterTemp;
  const comfort = wt == null ? '—' : wt >= 75 ? 'Warm / trunks' : wt >= 70 ? 'Comfortable for most' : wt >= 65 ? 'Cool — consider rashguard' : 'Cold';
  panel.innerHTML = `
    <div class="flex items-center gap-6">
      <div>
        <p class="text-xs text-ocean-400 uppercase">Ocean Temp (Buoy 44009)</p>
        <p class="text-4xl font-semibold text-white mt-1">${wt != null ? Math.round(wt) + '°F' : '—'}</p>
        <p class="text-sm text-ocean-300 mt-1">${comfort}</p>
      </div>
      <div class="flex-1 space-y-2 text-sm">
        <div class="flex justify-between"><span class="text-ocean-400">Air (buoy)</span><span class="text-white">${buoy?.airTemp != null ? Math.round(buoy.airTemp) + '°F' : '—'}</span></div>
        <div class="flex justify-between"><span class="text-ocean-400">Pressure</span><span class="text-white">${buoy?.pressure != null ? buoy.pressure + ' mb' : '—'}</span></div>
        <div class="flex justify-between"><span class="text-ocean-400">Wind (buoy)</span><span class="text-white">${buoy?.windSpd != null ? Math.round(buoy.windSpd) + ' mph ' + windDir(buoy.windDir) : '—'}</span></div>
      </div>
    </div>
    <p class="text-xs text-ocean-500">Station 44009 — Delaware Bay, 26 NM SE of Cape May. Water temps near the beach can differ slightly.</p>
  `;
}

let activeWebcamId = null;

function selectWebcam(id) {
  const cam = WEBCAMS.find(c => c.id === id);
  if (!cam) return;
  activeWebcamId = id;

  const player = document.getElementById('webcam-player');
  const loading = document.getElementById('webcam-loading');
  const caption = document.getElementById('webcam-caption');
  const externalLink = document.getElementById('webcam-open-external');

  // Update thumbs active state
  document.querySelectorAll('[data-webcam-id]').forEach(el => {
    el.classList.toggle('ring-2', el.dataset.webcamId === id);
    el.classList.toggle('ring-accent-gold', el.dataset.webcamId === id);
    el.classList.toggle('opacity-100', el.dataset.webcamId === id);
    el.classList.toggle('opacity-70', el.dataset.webcamId !== id);
  });

  caption.textContent = `${cam.name} · ${cam.loc}${cam.note ? ' — ' + cam.note : ''}`;
  externalLink.href = cam.external;
  externalLink.classList.remove('hidden');

  loading.classList.remove('hidden');

  if (cam.embed) {
    player.innerHTML = `
      <iframe
        src="${cam.embed}"
        title="${cam.name} live webcam"
        class="absolute inset-0 w-full h-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    `;
    // Hide loading after a short delay (iframe has no reliable onload for all players)
    setTimeout(() => loading.classList.add('hidden'), 1800);
  } else {
    // No direct embed — show CTA to open source
    player.innerHTML = `
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-ocean-900 to-ocean-950">
        <svg class="w-14 h-14 text-ocean-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
        </svg>
        <p class="text-white font-medium mb-1">${cam.name}</p>
        <p class="text-sm text-ocean-400 mb-5 max-w-md">${cam.note || 'This feed is hosted on the source website and cannot be embedded here.'}</p>
        <a href="${cam.external}" target="_blank" rel="noopener"
           class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-ocean-600 hover:bg-ocean-500 text-white text-sm font-medium transition">
          Open live camera
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        </a>
      </div>
    `;
    loading.classList.add('hidden');
  }
}

function renderWebcams() {
  const thumbs = document.getElementById('webcam-thumbs');
  const tabs = document.getElementById('webcam-tabs');

  // Compact tabs for quick switch (desktop)
  if (tabs) {
    tabs.innerHTML = WEBCAMS.slice(0, 4).map(c => `
      <button type="button" data-webcam-tab="${c.id}"
        class="px-3 py-1.5 rounded-lg text-xs font-medium transition
          ${c.embed ? 'bg-ocean-700 text-ocean-100 hover:bg-ocean-600' : 'bg-ocean-900 text-ocean-400 hover:bg-ocean-800'}">
        ${c.name.split(' ')[0]}${c.name.split(' ')[1] ? ' ' + c.name.split(' ')[1] : ''}
      </button>
    `).join('');
    tabs.querySelectorAll('[data-webcam-tab]').forEach(btn => {
      btn.addEventListener('click', () => selectWebcam(btn.dataset.webcamTab));
    });
  }

  thumbs.innerHTML = WEBCAMS.map(c => `
    <button type="button" data-webcam-id="${c.id}"
      class="text-left rounded-xl overflow-hidden border border-ocean-700/60 bg-ocean-900/50 hover:border-ocean-500 transition card-hover opacity-70 focus:outline-none focus:ring-2 focus:ring-accent-gold">
      <div class="aspect-video bg-gradient-to-br from-ocean-800 to-ocean-950 flex items-center justify-center relative">
        ${c.embed
          ? '<span class="absolute top-2 left-2 text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-emerald-900/80 text-emerald-300 border border-emerald-700">Live embed</span>'
          : '<span class="absolute top-2 left-2 text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-ocean-800 text-ocean-400 border border-ocean-600">External</span>'}
        <svg class="w-8 h-8 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
        </svg>
      </div>
      <div class="p-2.5">
        <p class="text-sm font-medium text-white leading-tight">${c.name}</p>
        <p class="text-[11px] text-ocean-400 mt-0.5">${c.loc}</p>
      </div>
    </button>
  `).join('');

  thumbs.querySelectorAll('[data-webcam-id]').forEach(btn => {
    btn.addEventListener('click', () => selectWebcam(btn.dataset.webcamId));
  });

  // Auto-select first embeddable cam
  const firstEmbed = WEBCAMS.find(c => c.embed) || WEBCAMS[0];
  if (firstEmbed) selectWebcam(firstEmbed.id);
}

function renderParks() {
  const tbody = document.getElementById('parks-table');
  tbody.innerHTML = PARKS.map(p => `
    <tr class="hover:bg-ocean-900/40">
      <td class="py-3 pr-4 font-medium text-white">${p.name}</td>
      <td class="py-3 pr-4">
        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium status-open text-white">${p.status}</span>
      </td>
      <td class="py-3 pr-4 text-ocean-300">${p.hours}</td>
      <td class="py-3 pr-4 text-ocean-300">${p.fee}</td>
      <td class="py-3 text-ocean-400 text-xs max-w-xs">${p.notes}</td>
    </tr>
  `).join('');
}

// Soft-refresh the active webcam so the stream stays alive without a full UI rebuild.
function softRefreshWebcam() {
  if (!activeWebcamId) return;
  const cam = WEBCAMS.find(c => c.id === activeWebcamId);
  if (!cam || !cam.embed) return;

  const player = document.getElementById('webcam-player');
  const iframe = player?.querySelector('iframe');
  if (!iframe) return;

  try {
    iframe.src = iframe.src; // soft reconnect
  } catch {
    const base = cam.embed.split('?')[0];
    const sep = cam.embed.includes('?') ? '&' : '?';
    iframe.src = `${base}${sep}_t=${Date.now()}`;
  }
}

// ---------- Connection status UI ----------
function setConnectionStatus(mode) {
  // mode: 'ws' | 'poll' | 'connecting' | 'error'
  const dot = document.getElementById('conn-dot');
  const label = document.getElementById('conn-label');
  if (!dot || !label) return;
  const styles = {
    ws:         { color: 'bg-emerald-400', text: 'Live · WebSocket' },
    poll:       { color: 'bg-sky-400',     text: 'Polling · 2 min' },
    connecting: { color: 'bg-amber-500',   text: 'Connecting…' },
    error:      { color: 'bg-red-500',     text: 'Offline · retrying' }
  };
  const s = styles[mode] || styles.poll;
  dot.className = `w-2 h-2 rounded-full pulse-dot ${s.color}`;
  label.textContent = s.text;
}

// ---------- Apply a full data payload (from fetch or WebSocket) ----------
function applyPayload(payload, { softWebcam = true } = {}) {
  if (!payload) return;
  if (payload.alerts) renderAlerts(payload.alerts);
  if (payload.primaryWeather) {
    renderSnapshot(payload.primaryWeather, payload.buoy || null);
    renderForecast(payload.primaryWeather.daily);
    renderMarine(payload.buoy || null, payload.primaryWeather);
    renderWater(payload.buoy || null);
  }
  if (payload.weatherCache) renderBeachCards(LOCATIONS, payload.weatherCache);
  if (payload.tides) renderTides(payload.tides);
  if (softWebcam) softRefreshWebcam();
  const updatedEl = document.getElementById('last-updated');
  if (updatedEl) {
    const ts = payload.timestamp ? new Date(payload.timestamp) : new Date();
    updatedEl.textContent = `Updated ${formatTime(ts)} ET`;
  }
}

// ---------- Main client-side fetch (used for polling + initial load) ----------
async function loadDashboard({ softWebcam = true } = {}) {
  const updatedEl = document.getElementById('last-updated');
  updatedEl.textContent = 'Refreshing…';

  try {
    const station = document.getElementById('tide-station')?.value || '8557380';
    const [alerts, primaryWeather, buoy, tides] = await Promise.all([
      fetchNWSAlerts().catch(() => ({ features: [] })),
      fetchOpenMeteo(38.72, -75.08),
      fetchNDBCBuoy(),
      fetchTidePredictions(station).catch(() => null)
    ]);

    const weatherCache = {};
    await Promise.all(LOCATIONS.map(async loc => {
      try {
        weatherCache[loc.id] = await fetchOpenMeteo(loc.lat, loc.lon);
      } catch {
        weatherCache[loc.id] = primaryWeather;
      }
    }));

    applyPayload({
      alerts,
      primaryWeather,
      buoy,
      weatherCache,
      tides,
      timestamp: Date.now()
    }, { softWebcam });
  } catch (err) {
    console.error(err);
    updatedEl.textContent = 'Update error — retry';
    setConnectionStatus('error');
  }
}

// ---------- WebSocket realtime layer ----------
const cfg = window.DASHBOARD_CONFIG || { WS_URL: '', POLL_MS: 2 * 60 * 1000 };
let ws = null;
let pollTimer = null;
let reconnectTimer = null;
let wsConnected = false;

function startPolling() {
  stopPolling();
  setConnectionStatus(wsConnected ? 'ws' : 'poll');
  if (!wsConnected) setConnectionStatus('poll');
  pollTimer = setInterval(() => loadDashboard({ softWebcam: true }), cfg.POLL_MS || 120000);
}

function stopPolling() {
  if (pollTimer) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
}

function connectWebSocket() {
  const url = (cfg.WS_URL || '').trim();
  if (!url) {
    // No WS configured — pure polling mode (GitHub Pages default)
    setConnectionStatus('poll');
    startPolling();
    return;
  }

  setConnectionStatus('connecting');
  try {
    ws = new WebSocket(url);
  } catch (e) {
    console.warn('WebSocket construct failed, falling back to poll', e);
    setConnectionStatus('poll');
    startPolling();
    return;
  }

  ws.onopen = () => {
    wsConnected = true;
    setConnectionStatus('ws');
    // Still keep a slow poll as safety net (e.g. 10 min) but primary is WS
    stopPolling();
    pollTimer = setInterval(() => loadDashboard({ softWebcam: true }), Math.max(cfg.POLL_MS * 5, 600000));
    try {
      ws.send(JSON.stringify({ type: 'subscribe', station: document.getElementById('tide-station')?.value || '8557380' }));
    } catch (_) { /* ignore */ }
  };

  ws.onmessage = (ev) => {
    try {
      const msg = JSON.parse(ev.data);
      if (msg.type === 'update' && msg.payload) {
        applyPayload(msg.payload, { softWebcam: true });
        setConnectionStatus('ws');
      } else if (msg.type === 'ping') {
        ws.send(JSON.stringify({ type: 'pong' }));
      }
    } catch (e) {
      console.warn('WS message parse error', e);
    }
  };

  ws.onclose = () => {
    wsConnected = false;
    setConnectionStatus('error');
    // Fall back to polling and retry WS
    startPolling();
    if (reconnectTimer) clearTimeout(reconnectTimer);
    reconnectTimer = setTimeout(connectWebSocket, 15000);
  };

  ws.onerror = () => {
    try { ws.close(); } catch (_) { /* ignore */ }
  };
}

// Tide station change
document.getElementById('tide-station').addEventListener('change', async (e) => {
  const tides = await fetchTidePredictions(e.target.value).catch(() => null);
  renderTides(tides);
  if (wsConnected && ws && ws.readyState === WebSocket.OPEN) {
    try {
      ws.send(JSON.stringify({ type: 'subscribe', station: e.target.value }));
    } catch (_) { /* ignore */ }
  }
});

document.getElementById('refresh-btn').addEventListener('click', () => loadDashboard({ softWebcam: true }));

// Initial render of static parts + load
renderWebcams();
renderParks();
loadDashboard({ softWebcam: false });
connectWebSocket();
