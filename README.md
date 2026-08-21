# Delaware Coastal Dashboard

Premium live dashboard for **Delaware beaches and coastal state parks**.

Current conditions, 7-day outlook, tides, water temperature, NWS alerts, park status, and live webcams — powered by free public data.

## Features

- Regional snapshot (air temp, wind, water temp, waves)
- Beach & park cards (Cape Henlopen, Rehoboth, Dewey, Delaware Seashore, Bethany, Fenwick)
- 7-day forecast (Open-Meteo)
- NOAA tide predictions (station switcher)
- Active NWS weather alerts
- NDBC buoy 44009 marine data
- Live webcam player (Atlantic Sands embed + external cams)
- **Realtime WebSocket updates** (optional companion server) with automatic polling fallback
- Soft webcam refresh so streams keep playing
- Auto-refresh every 2 minutes in polling mode
- Dark ocean theme, responsive, GitHub Pages ready

## Quick start (static / GitHub Pages)

1. Push this folder to a GitHub repo.
2. **Settings → Pages → Deploy from branch → `main` / root**.
3. Open the site. It runs entirely in the browser (2-minute polling). No server required.

Local preview:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Realtime WebSocket mode (optional)

GitHub Pages is static — it cannot host a WebSocket server. For true push updates:

```bash
cd server
npm install
npm start
# Server listens on ws://localhost:8787
```

Then edit `config.js`:

```js
window.DASHBOARD_CONFIG = {
  WS_URL: 'ws://localhost:8787',  // or wss://your-deployed-host
  POLL_MS: 2 * 60 * 1000
};
```

Reload the dashboard. The status pill should show **Live · WebSocket**.

The server:

- Aggregates Open-Meteo, NWS alerts, NOAA tides, and NDBC buoy data
- Pushes a unified payload every 60 seconds
- Client falls back to polling if the socket drops (reconnect after 15s)

Deploy the server to Railway, Render, Fly.io, or any Node host. Use `wss://` in production.

Health check: `GET /health`

## Project layout

```
├── index.html      # UI shell
├── app.js          # Client logic, WebSocket + polling
├── config.js       # WS_URL and poll interval
├── README.md
└── server/
    ├── package.json
    └── index.js    # Companion WebSocket aggregator
```

## Data sources (free / public)

| Source | Use |
|--------|-----|
| Open-Meteo | Weather & 7-day forecast |
| api.weather.gov | Active alerts |
| NOAA CO-OPS | Tide predictions |
| NDBC | Buoy 44009 water temp / waves |
| Delaware State Parks | Hours & fees (published) |

## Notes

- Rip-current risk is linked via NWS Surf Zone Forecast; active alerts appear in the banner.
- Park status is seasonal published info — verify temporary closures on destateparks.com.
- Webcams are third-party; only some allow embedding. Soft-refresh keeps the active player alive across data cycles.
- Informational tool only. Follow lifeguards and official advisories.

## License

Dashboard code: MIT. Upstream data remains under agency terms.
