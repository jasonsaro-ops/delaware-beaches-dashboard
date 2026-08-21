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
  { id: 'atlantic-sands', name: 'Atlantic Sands', loc: 'Rehoboth', embed: null, external: 'https://www.visitdebeaches.com/webcams/live-boardwalk-cam-atlantic-sands-hotel-in-rehoboth-beach/', note: 'Boardwalk / ocean', playerHint: 'Provider blocks embed — live page opens in player frame' },
  { id: 'cmlf-lewes', name: 'CMLF Ferry cams', loc: 'Lewes / CM', embed: 'https://www.cmlf.com/check-traffic-live-webcam-feeds/', external: 'https://www.cmlf.com/check-traffic-live-webcam-feeds/', note: 'Terminals & bay', playerHint: 'Official ferry terminal camera page' },
  { id: 'bethany-town', name: 'Bethany Beach', loc: 'Bethany', embed: null, external: 'https://www.townofbethanybeach.com/', note: 'Boardwalk', playerHint: 'Town site — open live section' },
  { id: 'sea-colony', name: 'Sea Colony', loc: 'Bethany', embed: null, external: 'https://www.seacolony.com/', note: 'Oceanfront', playerHint: 'Resort site cam links' },
  { id: 'dewey-bay', name: 'Bay Resort', loc: 'Dewey', embed: null, external: 'https://bayresort.com/', note: 'Rehoboth Bay', playerHint: 'Bay cam on resort site' },
  { id: 'deldot', name: 'DelDOT cams', loc: 'Route 1', embed: 'https://deldot.gov/map/', external: 'https://deldot.gov/map/', note: 'Traffic / inlet', playerHint: 'Statewide traffic camera map' }
];


// Cape May – Lewes Ferry fleet (3 active vessels)
const FERRY_FLEET = [
  {
    name: 'MV Delaware',
    short: 'Delaware',
    year: 1974,
    crossing: '~85 min',
    note: 'Flagship · twin stacks & Crow’s Nest',
    mmsi: '366914210',
    imo: '8990304',
    color: '#22d3ee',
    ais: 'https://www.vesselfinder.com/?imo=8990304',
    mt: 'https://www.marinetraffic.com/en/ais/details/ships/mmsi:366914210',
    tracker: 'https://www.cmlf.com/track-the-ferry/'
  },
  {
    name: 'MV New Jersey',
    short: 'New Jersey',
    year: 1974,
    crossing: '~80 min',
    note: 'Largest café & Ferry Store · Rock the Boat',
    mmsi: '366914190',
    imo: '8643078',
    color: '#d4a853',
    ais: 'https://www.vesselfinder.com/?imo=8643078',
    mt: 'https://www.marinetraffic.com/en/ais/details/ships/mmsi:366914190',
    tracker: 'https://www.cmlf.com/track-the-ferry/'
  },
  {
    name: 'MV Cape Henlopen',
    short: 'Cape Henlopen',
    year: 1981,
    crossing: '~80 min',
    note: 'Named for the Delaware cape',
    mmsi: '366914180',
    imo: '7923433',
    color: '#34d399',
    ais: 'https://www.vesselfinder.com/?imo=7923433',
    mt: 'https://www.marinetraffic.com/en/ais/details/ships/mmsi:366914180',
    tracker: 'https://www.cmlf.com/track-the-ferry/'
  }
];

// Representative summer midweek departures (verify on CMLF — schedules change by season/day)
// Times from published Aug 2026 summer pattern
const FERRY_SCHEDULE_CM = ['7:00 AM', '8:30 AM', '10:30 AM', '12:00 PM', '1:00 PM', '2:30 PM', '4:30 PM', '6:00 PM'];
const FERRY_SCHEDULE_LEWES = ['8:45 AM', '10:15 AM', '12:15 PM', '1:45 PM', '2:45 PM', '4:15 PM', '6:15 PM', '7:45 PM'];


// ---------- Leaflet Delaware Bay map + ferry routes ----------
const BAY_CENTER = [38.86, -75.05];
const TERMINAL_CM = [38.9687, -74.9597];
const TERMINAL_LEWES = [38.7824, -75.1199];
// Approximate great-circle-ish waypoints for the published 17nm route
const FERRY_ROUTE = [
  TERMINAL_CM,
  [38.94, -74.98],
  [38.90, -75.02],
  [38.86, -75.05],
  [38.82, -75.08],
  TERMINAL_LEWES
];

let map, routeLayer, trackLayers = {}, ferryMarkers = {}, showTracks = true;

function initMap() {
  const el = document.getElementById('map');
  if (!el || map) return;
  map = L.map('map', {
    zoomControl: true,
    attributionControl: true
  }).setView(BAY_CENTER, 10);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OSM &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  // Service route (shared corridor)
  routeLayer = L.polyline(FERRY_ROUTE, {
    color: '#3b82f6',
    weight: 2,
    opacity: 0.85,
    dashArray: '8 6',
    className: 'route-line'
  }).addTo(map);

  // Terminals
  const termIcon = (label, color) => L.divIcon({
    className: '',
    html: `<div style="background:${color};color:#0a0a0a;font:600 9px JetBrains Mono,monospace;padding:2px 5px;border-radius:2px;white-space:nowrap;border:1px solid #fff3">${label}</div>`,
    iconSize: [80, 18],
    iconAnchor: [40, 9]
  });
  L.marker(TERMINAL_CM, { icon: termIcon('CAPE MAY', '#93c5fd') }).addTo(map).bindPopup('<b>Cape May Terminal</b><br>North Cape May, NJ');
  L.marker(TERMINAL_LEWES, { icon: termIcon('LEWES', '#93c5fd') }).addTo(map).bindPopup('<b>Lewes Terminal</b><br>Lewes, DE');

  // Per-vessel track (offset slightly for visual separation) + marker
  FERRY_FLEET.forEach((v, idx) => {
    const offset = (idx - 1) * 0.008;
    const track = FERRY_ROUTE.map(([lat, lon]) => [lat + offset * 0.3, lon + offset]);
    trackLayers[v.mmsi] = L.polyline(track, {
      color: v.color,
      weight: 2.5,
      opacity: 0.75
    }).addTo(map);

    const icon = L.divIcon({
      className: '',
      html: `<div class="ship-label" style="border-color:${v.color};color:${v.color}">🚢 ${v.short}</div>`,
      iconSize: [110, 20],
      iconAnchor: [55, 10]
    });
    // Place markers along route at staggered positions (simulated underway)
    const pos = track[Math.min(1 + idx * 2, track.length - 2)];
    ferryMarkers[v.mmsi] = L.marker(pos, { icon }).addTo(map)
      .bindPopup(`<b style="color:${v.color}">${v.name}</b><br>MMSI ${v.mmsi}<br>IMO ${v.imo}<br>
        <a href="${v.mt}" target="_blank" rel="noopener">MarineTraffic</a> ·
        <a href="${v.ais}" target="_blank" rel="noopener">VesselFinder</a> ·
        <a href="${v.tracker}" target="_blank" rel="noopener">CMLF</a>`);
  });

  fitBay();

  document.getElementById('btn-fit-bay')?.addEventListener('click', (e) => {
    e.stopPropagation();
    fitBay();
  });
  document.getElementById('btn-tracks')?.addEventListener('click', (e) => {
    e.stopPropagation();
    showTracks = !showTracks;
    e.currentTarget.classList.toggle('active', showTracks);
    Object.values(trackLayers).forEach(l => {
      if (showTracks) l.addTo(map); else map.removeLayer(l);
    });
    if (showTracks) routeLayer.addTo(map); else map.removeLayer(routeLayer);
  });

  document.querySelectorAll('.ferry-tb').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const mmsi = btn.getAttribute('data-mmsi');
      highlightFerry(mmsi);
      const m = ferryMarkers[mmsi];
      if (m && map) {
        map.flyTo(m.getLatLng(), 12, { duration: 0.6 });
        m.openPopup();
      }
    });
  });
}

function fitBay() {
  if (!map) return;
  const bounds = L.latLngBounds([TERMINAL_CM, TERMINAL_LEWES]).pad(0.35);
  map.fitBounds(bounds);
}

// Soft animation of markers along track (visual underway trajectories)
let animT = 0;
function animateFerries() {
  if (!map) return;
  animT = (animT + 0.002) % 1;
  FERRY_FLEET.forEach((v, idx) => {
    const layer = trackLayers[v.mmsi];
    const marker = ferryMarkers[v.mmsi];
    if (!layer || !marker) return;
    const latlngs = layer.getLatLngs();
    // Stagger phase so vessels appear at different points / directions
    let t = (animT + idx * 0.33) % 1;
    // Reverse direction for one vessel for visual variety
    if (idx === 1) t = 1 - t;
    const n = latlngs.length - 1;
    const f = t * n;
    const i = Math.floor(f);
    const frac = f - i;
    const a = latlngs[Math.min(i, n)];
    const b = latlngs[Math.min(i + 1, n)];
    const lat = a.lat + (b.lat - a.lat) * frac;
    const lng = a.lng + (b.lng - a.lng) * frac;
    marker.setLatLng([lat, lng]);
  });
  requestAnimationFrame(animateFerries);
}



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
  if (!banner || !list) return;
  if (!alerts?.features?.length) {
    banner.classList.add('hidden');
    return;
  }
  banner.classList.remove('hidden');
  list.innerHTML = alerts.features.slice(0, 3).map(f => {
    const p = f.properties;
    return `<span><strong>${p.event}</strong> ${ (p.headline || '').slice(0, 80) }</span>`;
  }).join('');
}

function renderSnapshot(weather, buoy) {
  const grid = document.getElementById('snapshot-grid');
  if (!grid || !weather?.current) return;
  const c = weather.current;
  const items = [
    { label: 'Air', value: `${Math.round(c.temperature_2m)}°`, sub: `Feels ${Math.round(c.apparent_temperature)}°` },
    { label: 'Wind', value: `${Math.round(c.wind_speed_10m)}`, sub: `${windDir(c.wind_direction_10m)} mph` },
    { label: 'Gust', value: `${Math.round(c.wind_gusts_10m || 0)}`, sub: 'mph' },
    { label: 'RH', value: `${c.relative_humidity_2m}%`, sub: 'Humidity' },
    { label: 'Water', value: buoy?.waterTemp != null ? `${Math.round(buoy.waterTemp)}°` : '—', sub: 'Buoy' },
    { label: 'Waves', value: buoy?.waveHt != null ? `${buoy.waveHt.toFixed(1)}` : '—', sub: buoy?.wavePeriod ? `${buoy.wavePeriod}s` : 'ft' }
  ];
  grid.innerHTML = items.map(i => `
    <div>
      <div class="label">${i.label}</div>
      <div class="metric">${i.value}</div>
      <div class="sub">${i.sub}</div>
    </div>
  `).join('');
}

function renderBeachCards(locations, weatherCache) {
  const container = document.getElementById('beach-cards');
  if (!container) return;
  container.innerHTML = locations.map(loc => {
    const w = weatherCache[loc.id];
    const c = w?.current;
    const code = c?.weather_code ?? 0;
    const temp = c ? Math.round(c.temperature_2m) : '—';
    const wind = c ? `${Math.round(c.wind_speed_10m)} ${windDir(c.wind_direction_10m)}` : '—';
    return `<div class="flex items-center justify-between gap-2 py-0.5 border-b border-ocean-800/50 last:border-0">
      <span class="text-white font-medium truncate">${loc.name.replace(' State Park',' SP').replace('Beach','')}</span>
      <span class="text-ocean-200 tabular-nums">${weatherIcon(code)} ${temp}°</span>
      <span class="text-ocean-400 tabular-nums w-16 text-right">${wind}</span>
    </div>`;
  }).join('');
}

function renderForecast(daily) {
  const strip = document.getElementById('forecast-strip');
  if (!strip || !daily) return;
  strip.innerHTML = daily.time.map((t, i) => {
    const max = Math.round(daily.temperature_2m_max[i]);
    const min = Math.round(daily.temperature_2m_min[i]);
    const pop = daily.precipitation_probability_max[i] ?? 0;
    const code = daily.weather_code[i];
    const day = new Date(t).toLocaleDateString('en-US', { weekday: 'short', timeZone: 'America/New_York' });
    return `<div class="text-center">
      <div class="sub">${day}</div>
      <div class="text-base leading-none my-0.5">${weatherIcon(code)}</div>
      <div class="metric-sm">${max}°</div>
      <div class="sub">${min}° · ${pop}%</div>
    </div>`;
  }).join('');
}

function renderTides(data) {
  const list = document.getElementById('tide-list');
  if (!list) return;
  if (!data?.predictions) {
    list.innerHTML = '<li class="text-ocean-500">Unavailable</li>';
    return;
  }
  list.innerHTML = data.predictions.slice(0, 6).map(p => {
    const isHigh = p.type === 'H';
    return `<li class="flex justify-between gap-2">
      <span class="${isHigh ? 'text-accent-gold' : 'text-ocean-400'}">${isHigh ? 'H' : 'L'}</span>
      <span class="text-white">${formatTime(p.t)}</span>
      <span class="text-ocean-300 tabular-nums">${parseFloat(p.v).toFixed(1)} ft</span>
    </li>`;
  }).join('');
}

function renderMarine(buoy, weather) {
  const panel = document.getElementById('marine-panel');
  if (!panel) return;
  const c = weather?.current;
  panel.innerHTML = `
    <div class="grid grid-cols-2 gap-2">
      <div><div class="label">Wind</div><div class="metric-sm">${c ? Math.round(c.wind_speed_10m) : '—'} mph ${c ? windDir(c.wind_direction_10m) : ''}</div>
        <div class="sub">Gust ${c ? Math.round(c.wind_gusts_10m || 0) : '—'} mph</div></div>
      <div><div class="label">Seas</div><div class="metric-sm">${buoy?.waveHt != null ? buoy.waveHt.toFixed(1) + ' ft' : '—'}</div>
        <div class="sub">${buoy?.wavePeriod ? buoy.wavePeriod + 's period' : 'Buoy 44009'}</div></div>
    </div>
    <p class="sub mt-1">Rip risk: see NWS Surf Zone · <a href="https://www.weather.gov/phi/marine" target="_blank" rel="noopener" class="text-ocean-400 underline">Marine</a></p>
  `;
}

function renderWater(buoy) {
  const panel = document.getElementById('water-panel');
  if (!panel) return;
  const wt = buoy?.waterTemp;
  const comfort = wt == null ? '—' : wt >= 75 ? 'Warm' : wt >= 70 ? 'Comfortable' : wt >= 65 ? 'Cool' : 'Cold';
  panel.innerHTML = `<div class="flex items-baseline gap-3">
    <div><div class="label">Ocean temp</div><div class="metric">${wt != null ? Math.round(wt) + '°F' : '—'}</div></div>
    <div class="sub">${comfort} · Air ${buoy?.airTemp != null ? Math.round(buoy.airTemp) + '°' : '—'} · ${buoy?.pressure != null ? buoy.pressure + ' mb' : ''}</div>
  </div>`;
}

let activeWebcamId = null;
function softRefreshWebcam() { /* no embeds — links only */ }
function selectWebcam() {}
function renderWebcams() {
  const thumbs = document.getElementById('webcam-thumbs');
  if (!thumbs) return;
  thumbs.innerHTML = WEBCAMS.map(c => `
    <button type="button" class="cam-tile p-1.5 w-full" data-cam="${c.id}">
      <div class="text-[10px] font-semibold text-white">${c.name}</div>
      <div class="text-[9px] text-[#6b7280]">${c.loc}</div>
      <div class="text-[9px] text-blue-400 mt-1">▶ Play in window</div>
    </button>
  `).join('');
  thumbs.querySelectorAll('[data-cam]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openCamPlayer(btn.getAttribute('data-cam'));
    });
  });
}

function renderParks() {
  const tbody = document.getElementById('parks-table');
  if (!tbody) return;
  tbody.innerHTML = PARKS.map(p => `
    <tr class="border-t border-ocean-800/50">
      <td class="py-0.5 pr-1 text-white font-medium">${p.name.replace(' State Park','')}</td>
      <td class="py-0.5 pr-1"><span class="text-emerald-400">Open</span></td>
      <td class="py-0.5 text-ocean-400">${p.hours.replace('8 AM – Sunset','8a–sunset')} · ${p.fee.split('/')[0].trim()}</td>
    </tr>
  `).join('');
}

function renderFerry() {
  const fleetEl = document.getElementById('ferry-fleet');
  if (fleetEl) {
    fleetEl.innerHTML = FERRY_FLEET.map((v, i) => `
      <button type="button" data-mmsi="${v.mmsi}"
        class="ferry-chip text-left rounded border px-1.5 py-1 transition hover:brightness-110"
        style="border-color:${v.color}55;background:${v.color}18"
        title="Highlight ${v.name} on AIS map">
        <div class="flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" style="background:${v.color}"></span>
          <span class="text-[10px] font-semibold text-white leading-tight">${v.short}</span>
        </div>
        <div class="text-[9px] text-ocean-400 pl-2.5">${v.crossing} · ${v.mmsi}</div>
      </button>
    `).join('');
    fleetEl.querySelectorAll('.ferry-chip').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        highlightFerry(btn.getAttribute('data-mmsi'));
      });
    });
  }
  const cm = document.getElementById('ferry-sched-cm');
  const lewes = document.getElementById('ferry-sched-lewes');
  if (cm) cm.innerHTML = FERRY_SCHEDULE_CM.map(t => `<li>${t}</li>`).join('');
  if (lewes) lewes.innerHTML = FERRY_SCHEDULE_LEWES.map(t => `<li>${t}</li>`).join('');
}

function highlightFerry(mmsi) {
  document.querySelectorAll('.ferry-chip, .ferry-tb').forEach(b => {
    const active = b.getAttribute('data-mmsi') === mmsi;
    b.classList.toggle('active', active);
    const col = FERRY_FLEET.find(f => f.mmsi === mmsi)?.color || '#3b82f6';
    if (b.classList.contains('ferry-chip')) {
      b.style.outline = active ? `1px solid ${col}` : 'none';
      b.style.outlineOffset = '1px';
    }
  });
  // Emphasize track
  Object.entries(trackLayers).forEach(([id, layer]) => {
    layer.setStyle({ weight: id === mmsi ? 4 : 2, opacity: id === mmsi ? 1 : 0.45 });
  });
  const m = ferryMarkers[mmsi];
  if (m && map) {
    map.flyTo(m.getLatLng(), 12, { duration: 0.5 });
    m.openPopup();
  }
}
window.highlightFerry = highlightFerry;

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
  lastPayload = payload;
  if (payload.weatherCache) lastWeatherCache = payload.weatherCache;
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
renderFerry();
loadDashboard({ softWebcam: false });
connectWebSocket();
// Map + HUD clock
setTimeout(() => { initMap(); requestAnimationFrame(animateFerries); }, 100);
setInterval(() => {
  const el = document.getElementById('clock');
  if (el) el.textContent = new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour12: false }) + ' ET';
}, 1000);
// Sidebar panel shortcuts
document.querySelectorAll('.sidebar button[data-panel]').forEach(b => {
  b.addEventListener('click', () => openPanel(b.getAttribute('data-panel')));
});
initMenus();


// ---------- Floating control-center windows ----------
let lastPayload = null;
let lastWeatherCache = {};

function openPanel(id) {
  const root = document.getElementById('modal-root');
  if (!root) return;
  const titles = {
    snapshot: 'Regional snapshot',
    beaches: 'Beach conditions',
    forecast: '7-day outlook',
    tides: 'Tide predictions',
    marine: 'Marine & water',
    ferry: 'Cape May–Lewes Ferry',
    'ais-map': 'Live AIS · Delaware Bay',
    parks: 'Coastal state parks',
    cams: 'Live webcams & ferry cams',
    alerts: 'Active weather alerts'
  };
  const wide = id === 'ais-map' || id === 'cams' || id === 'ferry';
  const body = panelBody(id);
  root.innerHTML = `
    <div class="modal-backdrop open" id="modal-bg"></div>
    <div class="modal-win ${wide ? 'wide' : ''} open" role="dialog" aria-modal="true">
      <div class="modal-hd">
        <h2>${titles[id] || id}</h2>
        <button type="button" class="btn-x" id="modal-close" aria-label="Close">×</button>
      </div>
      <div class="modal-bd">${body}</div>
    </div>
  `;
  root.style.pointerEvents = 'auto';
  root.style.zIndex = '10000';
  document.getElementById('modal-close').onclick = closePanel;
  document.getElementById('modal-bg').onclick = closePanel;
  document.addEventListener('keydown', escClose);
}

function escClose(e) {
  if (e.key === 'Escape') closePanel();
}

function closePanel() {
  const root = document.getElementById('modal-root');
  if (!root) return;
  root.innerHTML = '';
  root.style.pointerEvents = 'none';
  document.removeEventListener('keydown', escClose);
}

function panelBody(id) {
  const p = lastPayload || {};
  const w = p.primaryWeather;
  const buoy = p.buoy;
  const c = w?.current;

  if (id === 'snapshot') {
    return `<div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
      ${metricCard('Air temperature', c ? Math.round(c.temperature_2m) + '°F' : '—', c ? 'Feels ' + Math.round(c.apparent_temperature) + '°F' : '')}
      ${metricCard('Wind', c ? Math.round(c.wind_speed_10m) + ' mph' : '—', c ? windDir(c.wind_direction_10m) + ' · Gust ' + Math.round(c.wind_gusts_10m||0) : '')}
      ${metricCard('Humidity', c ? c.relative_humidity_2m + '%' : '—', 'Relative')}
      ${metricCard('Water temp', buoy?.waterTemp != null ? Math.round(buoy.waterTemp) + '°F' : '—', 'NDBC 44009')}
      ${metricCard('Wave height', buoy?.waveHt != null ? buoy.waveHt.toFixed(1) + ' ft' : '—', buoy?.wavePeriod ? buoy.wavePeriod + 's period' : '')}
      ${metricCard('Pressure', buoy?.pressure != null ? buoy.pressure + ' mb' : '—', 'Sea level')}
    </div>`;
  }
  if (id === 'beaches') {
    return `<div class="space-y-2">${LOCATIONS.map(loc => {
      const cw = lastWeatherCache[loc.id]?.current;
      return `<div class="flex flex-wrap items-center justify-between gap-2 py-2 border-b border-ocean-700/40">
        <div><div class="font-semibold text-white">${loc.name}</div><div class="text-xs text-ocean-400">${loc.town} · ${loc.notes || ''}</div></div>
        <div class="text-right text-sm">
          <div class="text-white font-medium">${cw ? weatherIcon(cw.weather_code) + ' ' + Math.round(cw.temperature_2m) + '°F' : '—'}</div>
          <div class="text-ocean-400 text-xs">${cw ? Math.round(cw.wind_speed_10m) + ' mph ' + windDir(cw.wind_direction_10m) : ''}</div>
        </div>
      </div>`;
    }).join('')}</div>`;
  }
  if (id === 'forecast' && w?.daily) {
    return `<div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">${w.daily.time.map((t,i) => `
      <div class="rounded-lg bg-ocean-900/60 border border-ocean-700/40 p-3 text-center">
        <div class="text-xs text-ocean-400">${formatDay(t)}</div>
        <div class="text-2xl my-1">${weatherIcon(w.daily.weather_code[i])}</div>
        <div class="text-lg font-semibold text-white">${Math.round(w.daily.temperature_2m_max[i])}°</div>
        <div class="text-xs text-ocean-400">${Math.round(w.daily.temperature_2m_min[i])}° low · ${w.daily.precipitation_probability_max[i]??0}% rain</div>
        <div class="text-xs text-ocean-500 mt-1">Wind max ${Math.round(w.daily.wind_speed_10m_max[i])} mph</div>
      </div>`).join('')}</div>`;
  }
  if (id === 'tides') {
    const preds = p.tides?.predictions || [];
    return `<p class="text-xs text-ocean-400 mb-3">Station ${document.getElementById('tide-station')?.value || '8557380'} · NOAA CO-OPS · times local</p>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">${preds.slice(0,12).map(pr => `
        <div class="rounded-lg bg-ocean-900/50 border border-ocean-700/40 px-3 py-2 flex justify-between">
          <span class="${pr.type==='H'?'text-accent-gold':'text-ocean-300'} font-semibold">${pr.type==='H'?'High':'Low'}</span>
          <span class="text-white">${formatTime(pr.t)}</span>
          <span class="text-ocean-300">${parseFloat(pr.v).toFixed(2)} ft</span>
        </div>`).join('')}</div>`;
  }
  if (id === 'marine') {
    return `<div class="grid grid-cols-2 gap-4 mb-4">
      ${metricCard('Wind', c ? Math.round(c.wind_speed_10m)+' mph' : '—', c ? windDir(c.wind_direction_10m) : '')}
      ${metricCard('Gusts', c ? Math.round(c.wind_gusts_10m||0)+' mph' : '—', '')}
      ${metricCard('Seas', buoy?.waveHt != null ? buoy.waveHt.toFixed(1)+' ft' : '—', buoy?.wavePeriod ? buoy.wavePeriod+'s' : 'Buoy 44009')}
      ${metricCard('Ocean temp', buoy?.waterTemp != null ? Math.round(buoy.waterTemp)+'°F' : '—', buoy?.airTemp != null ? 'Air '+Math.round(buoy.airTemp)+'°F' : '')}
    </div>
    <p class="text-sm text-ocean-300">Rip current risk is issued in the NWS Surf Zone Forecast. Always check active alerts and swim near lifeguards.
      <a class="text-ocean-200 underline" href="https://www.weather.gov/phi/marine" target="_blank" rel="noopener">NWS Marine PHI</a></p>`;
  }
  if (id === 'ferry') {
    return `<div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">${FERRY_FLEET.map(v => `
      <div class="rounded-lg bg-ocean-900/60 border border-ocean-700/50 p-3">
        <div class="font-semibold text-white">${v.name}</div>
        <div class="text-xs text-ocean-400 mt-0.5">Built ${v.year} · ${v.crossing}</div>
        <p class="text-xs text-ocean-300 mt-2">${v.note}</p>
        <div class="mt-2 flex gap-3 text-xs">
          <a class="text-accent-gold underline" href="${v.tracker}" target="_blank" rel="noopener">CMLF tracker</a>
          <a class="text-ocean-300 underline" href="${v.mt}" target="_blank" rel="noopener">MarineTraffic</a>
          <a class="text-ocean-300 underline" href="${v.ais}" target="_blank" rel="noopener">VesselFinder</a>
        </div>
      </div>`).join('')}</div>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div><div class="text-accent-gold text-xs uppercase mb-1">Cape May → Lewes</div>
          <ul class="text-sm space-y-0.5">${FERRY_SCHEDULE_CM.map(t=>`<li>${t}</li>`).join('')}</ul></div>
        <div><div class="text-accent-gold text-xs uppercase mb-1">Lewes → Cape May</div>
          <ul class="text-sm space-y-0.5">${FERRY_SCHEDULE_LEWES.map(t=>`<li>${t}</li>`).join('')}</ul></div>
      </div>
      <p class="text-xs text-ocean-400">Schedule is a summer midweek pattern — always confirm on <a class="underline text-ocean-300" href="https://www.cmlf.com/schedules-fares/" target="_blank" rel="noopener">cmlf.com</a>. Crossing ~85 min. Reservations recommended.</p>
      <div class="mt-4">
        <button type="button" onclick="openCamPlayer('cmlf-lewes')" class="chip" style="border-color:#3b82f6;color:#93c5fd">▶ Open CMLF ferry cams in player</button>
      </div>`;
  }
  if (id === 'ais-map') {
    setTimeout(() => {
      const el = document.getElementById('modal-map');
      if (!el || !window.L) return;
      if (window._modalMap) { try { window._modalMap.remove(); } catch(_){} }
      window._modalMap = L.map(el).setView([38.86, -75.05], 10);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(window._modalMap);
      L.polyline([[38.9687,-74.9597],[38.94,-74.98],[38.90,-75.02],[38.86,-75.05],[38.82,-75.08],[38.7824,-75.1199]], { color:'#3b82f6', weight:2, dashArray:'8 6' }).addTo(window._modalMap);
      FERRY_FLEET.forEach((v, idx) => {
        const off = (idx - 1) * 0.008;
        const track = [[38.9687,-74.9597],[38.94,-74.98],[38.90,-75.02],[38.86,-75.05],[38.82,-75.08],[38.7824,-75.1199]].map(([a,b]) => [a+off*0.3, b+off]);
        L.polyline(track, { color: v.color, weight: 2.5, opacity: 0.8 }).addTo(window._modalMap);
      });
      L.marker([38.9687,-74.9597]).addTo(window._modalMap).bindPopup('Cape May Terminal');
      L.marker([38.7824,-75.1199]).addTo(window._modalMap).bindPopup('Lewes Terminal');
      setTimeout(() => window._modalMap.invalidateSize(), 100);
    }, 80);
    return `<p class="text-xs text-[#8b929e] mb-2">Delaware Bay operating area · Cape May ↔ Lewes (~17 nm). Colored tracks = vessel corridors. For live AIS radar positions use links below.</p>
      <div class="flex flex-wrap gap-2 mb-3">${FERRY_FLEET.map(v => `
        <button type="button" onclick="highlightFerry('${v.mmsi}')" class="chip text-xs font-semibold" style="border-color:${v.color};color:${v.color}">${v.name} · ${v.mmsi}</button>`).join('')}</div>
      <div id="modal-map" style="height:min(50vh,420px);border-radius:3px;border:1px solid #2e3440;background:#0d1117"></div>
      <div class="mt-3 flex flex-wrap gap-3 text-xs">
        <a class="text-blue-400 underline" href="https://www.cmlf.com/track-the-ferry/" target="_blank" rel="noopener">Official CMLF vessel tracker</a>
        ${FERRY_FLEET.map(v => `<a class="underline" style="color:${v.color}" href="${v.mt}" target="_blank" rel="noopener">${v.short} AIS</a>`).join(' · ')}
      </div>`;
  }
  if (id === 'parks') {
    return `<table class="w-full text-sm"><thead><tr class="text-ocean-400 text-left text-xs"><th class="pb-2">Park</th><th class="pb-2">Status</th><th class="pb-2">Hours</th><th class="pb-2">Fee</th><th class="pb-2">Notes</th></tr></thead>
      <tbody>${PARKS.map(pk => `<tr class="border-t border-ocean-800"><td class="py-2 text-white font-medium">${pk.name}</td>
        <td class="py-2 text-emerald-400">${pk.status}</td><td class="py-2 text-ocean-300">${pk.hours}</td>
        <td class="py-2 text-ocean-300">${pk.fee}</td><td class="py-2 text-ocean-400 text-xs">${pk.notes}</td></tr>`).join('')}
      </tbody></table>
      <p class="text-xs text-ocean-500 mt-3">Confirm temporary closures at <a class="underline" href="https://destateparks.com" target="_blank" rel="noopener">destateparks.com</a></p>`;
  }
  if (id === 'cams') {
    return `<p class="text-xs text-[#8b929e] mb-3">Click a camera to open it in a floating player window.</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">${WEBCAMS.map(cam => `
        <button type="button" onclick="openCamPlayer('${cam.id}')" class="chip text-left p-3" style="border-color:#3a4150">
          <div class="font-medium text-white">${cam.name}</div>
          <div class="text-xs text-[#8b929e]">${cam.loc} · ${cam.note}</div>
          <div class="text-xs text-blue-400 mt-1">▶ Play in window</div>
        </button>`).join('')}</div>`;
  }
  if (id === 'alerts') {
    const feats = p.alerts?.features || [];
    if (!feats.length) return '<p class="text-ocean-400">No active alerts for the coastal point.</p>';
    return feats.map(f => {
      const pr = f.properties;
      return `<div class="mb-3 rounded-lg border border-red-800/50 bg-red-950/40 p-3">
        <div class="font-semibold text-red-100">${pr.event}</div>
        <div class="text-sm text-red-200/90 mt-1">${pr.headline || ''}</div>
        <div class="text-xs text-red-300/70 mt-2">${(pr.description || '').slice(0, 400)}…</div>
      </div>`;
    }).join('');
  }
  return '<p class="text-ocean-400">No detail available.</p>';
}

function metricCard(label, value, sub) {
  return `<div class="rounded-lg bg-ocean-900/50 border border-ocean-700/40 p-3">
    <div class="label">${label}</div>
    <div class="text-2xl font-bold text-white mt-0.5">${value}</div>
    <div class="sub mt-0.5">${sub || ''}</div>
  </div>`;
}

// Wire panel clicks
document.querySelectorAll('[data-panel]').forEach(el => {
  el.addEventListener('click', (e) => {
    if (e.target.closest('a,button,select,iframe')) return;
    const id = el.getAttribute('data-panel');
    if (id) openPanel(id);
  });
});

// expose for inline buttons
window.openPanel = openPanel;


function openCamPlayer(camId) {
  const cam = WEBCAMS.find(c => c.id === camId);
  if (!cam) return;
  const root = document.getElementById('modal-root');
  if (!root) return;
  const src = cam.embed || cam.external;
  root.innerHTML = `
    <div class="modal-backdrop open" id="modal-bg"></div>
    <div class="modal-win wide open" role="dialog" aria-modal="true" style="z-index:10001">
      <div class="modal-hd">
        <h2>▶ ${cam.name} <span style="font-weight:500;color:#8b929e;font-size:11px">· ${cam.loc}</span></h2>
        <div style="display:flex;gap:8px;align-items:center">
          <a href="${cam.external}" target="_blank" rel="noopener" style="font-size:11px;color:#93c5fd">Open source ↗</a>
          <button type="button" class="btn-x" id="modal-close" aria-label="Close">×</button>
        </div>
      </div>
      <div class="modal-bd" style="padding:8px">
        <p style="font-size:11px;color:#8b929e;margin:0 0 8px">${cam.playerHint || ''} · Auto-loads feed below when the provider allows framing.</p>
        <iframe class="cam-player-frame" src="${src}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen referrerpolicy="no-referrer-when-downgrade" title="${cam.name} live"></iframe>
      </div>
    </div>
  `;
  root.style.pointerEvents = 'auto';
  root.style.zIndex = '10000';
  document.getElementById('modal-close').onclick = closePanel;
  document.getElementById('modal-bg').onclick = closePanel;
  document.addEventListener('keydown', escClose);
}
window.openCamPlayer = openCamPlayer;

function closeAllMenus() {
  document.querySelectorAll('.menu-wrap.open').forEach(w => w.classList.remove('open'));
}

function initMenus() {
  document.querySelectorAll('.menu-wrap').forEach(wrap => {
    const btn = wrap.querySelector('.menu-btn');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const was = wrap.classList.contains('open');
      closeAllMenus();
      if (!was) wrap.classList.add('open');
    });
  });
  document.addEventListener('click', () => closeAllMenus());
  document.querySelectorAll('.menu-drop [data-action]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = item.getAttribute('data-action');
      closeAllMenus();
      runMenuAction(action);
    });
  });
}

function runMenuAction(action) {
  if (action === 'refresh') return loadDashboard({ softWebcam: true });
  if (action === 'copy-link') {
    navigator.clipboard?.writeText(location.href);
    return;
  }
  if (action === 'print') return window.print();
  if (action === 'fullscreen') {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
    return;
  }
  if (action === 'fit-bay') return fitBay();
  if (action === 'toggle-tracks') {
    document.getElementById('btn-tracks')?.click();
    return;
  }
  if (action?.startsWith('panel-')) {
    return openPanel(action.replace('panel-', ''));
  }
  if (action?.startsWith('highlight-')) {
    return highlightFerry(action.replace('highlight-', ''));
  }
  if (action === 'about') {
    return openInfoModal('About DE Coastal Control',
      `<p>Mission-style dashboard for Delaware coastal beaches, state parks, and the Cape May–Lewes Ferry.</p>
       <p style="margin-top:8px;color:#8b929e;font-size:12px">Weather: Open-Meteo · Alerts: NWS · Tides: NOAA CO-OPS · Marine: NDBC 44009 · Map: OSM/CARTO · Ferry: CMLF</p>
       <p style="margin-top:8px;color:#8b929e;font-size:12px">Informational only. Verify conditions and swim near lifeguards.</p>`);
  }
  if (action === 'about-data') {
    return openInfoModal('Data sources',
      `<ul style="font-size:12px;line-height:1.7;color:#c5cad3">
        <li>Open-Meteo — weather & 7-day forecast</li>
        <li>api.weather.gov — active alerts</li>
        <li>NOAA CO-OPS — tide predictions</li>
        <li>NDBC buoy 44009 — water temp / waves</li>
        <li>CMLF — ferry schedule & tracker links</li>
        <li>OSM + CARTO — basemap</li>
      </ul>`);
  }
}

function openInfoModal(title, bodyHtml) {
  const root = document.getElementById('modal-root');
  if (!root) return;
  root.innerHTML = `
    <div class="modal-backdrop open" id="modal-bg"></div>
    <div class="modal-win open" role="dialog">
      <div class="modal-hd"><h2>${title}</h2><button type="button" class="btn-x" id="modal-close">×</button></div>
      <div class="modal-bd">${bodyHtml}</div>
    </div>`;
  root.style.pointerEvents = 'auto';
  root.style.zIndex = '10000';
  document.getElementById('modal-close').onclick = closePanel;
  document.getElementById('modal-bg').onclick = closePanel;
  document.addEventListener('keydown', escClose);
}

