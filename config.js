/**
 * Dashboard configuration
 * For GitHub Pages (static): leave WS_URL empty — client uses 2-minute polling.
 * For realtime: run the companion server (see server/) and set WS_URL to its WebSocket endpoint.
 */
window.DASHBOARD_CONFIG = {
  // e.g. "wss://your-server.example.com" or "ws://localhost:8787"
  WS_URL: '',
  // Polling interval when WebSocket is unavailable (ms)
  POLL_MS: 2 * 60 * 1000,
  // How often the companion server should push updates (server-side)
  SERVER_PUSH_MS: 60 * 1000
};
