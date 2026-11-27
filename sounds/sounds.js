const ctx = new (window.AudioContext || window.webkitAudioContext)();
let muted = false;

function beep(freq, ms, type = 'sine') {
  if (muted) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + ms / 1000);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + ms / 1000);
}

export function playMove() { beep(440, 80); }
export function playWin() { beep(523, 120); setTimeout(() => beep(659, 120), 130); setTimeout(() => beep(784, 200), 260); }
export function playDraw() { beep(330, 180, 'triangle'); }
export function setMuted(on) { muted = on; }
