#!/usr/bin/env node
// Project Mixer hook - sends notification to local HTTP server
const http = require('http');

const hookUrl = process.env.PM_HOOK_URL;
const hookToken = process.env.PM_HOOK_TOKEN;
if (!hookUrl) { process.exit(0); }
if (!hookToken) { process.exit(0); }
let target;
try {
  target = new URL(hookUrl);
} catch (e) {
  process.exit(0);
}

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
    hostname: target.hostname,
    port: target.port,
    path: target.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
      'X-Project-Mixer-Hook': hookToken,
    },
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
