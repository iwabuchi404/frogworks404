#!/usr/bin/env node
// Project Mixer hook - sends notification to local HTTP server
// Port is discovered via PROJECT_MIXER_PORT_FILE env var (set by PM's PTY).
const http = require('http');
const fs = require('fs');

const portFile = process.env.PROJECT_MIXER_PORT_FILE;
if (!portFile) { process.exit(0); }

let port = null;
try {
  const data = JSON.parse(fs.readFileSync(portFile, 'utf-8'));
  port = data.port;
} catch (e) {}

if (!port) { process.exit(0); }

const arg = process.argv[2] || '';
const namedEvent = arg && !arg.startsWith('{');
let argPayload = null;
if (arg.startsWith('{')) {
  try { argPayload = JSON.parse(arg); } catch (e) {}
}

function send(input = {}) {
  const notification = {
    ...input,
    cwd: input.cwd || process.cwd(),
    pty_id: Number(process.env.PROJECT_MIXER_PTY_ID) || undefined,
    agent_source: input.agent_source || (namedEvent ? 'claude' : 'codex'),
  };
  if (!notification.hook_event_type && !notification.hook_event_name && !notification.event && !notification.type) {
    notification.hook_event_type = arg || 'Notification';
  }
  const payload = JSON.stringify(notification);
  const req = http.request({
    hostname: '127.0.0.1',
    port: port,
    path: '/hook',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) },
  }, () => { process.stdout.write('{}\n'); process.exit(0); });
  req.on('error', () => { process.exit(0); });
  req.write(payload);
  req.end();
}

if (argPayload) {
  send(argPayload);
} else {
  let stdin = '';
  process.stdin.setEncoding('utf-8');
  process.stdin.on('data', (chunk) => { stdin += chunk; });
  process.stdin.on('end', () => {
    let input = {};
    if (stdin.trim()) {
      try { input = JSON.parse(stdin); } catch (e) {}
    }
    send(input);
  });
  process.stdin.resume();
}
