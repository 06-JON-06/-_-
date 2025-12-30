import './style.css';

const symbols = ['🍒','🍋','🔔','⭐','7️⃣','🍀','🍇','🍉'];

const app = document.getElementById('app');
app.innerHTML = `
  <div class="slot-wrapper">
    <div class="slot-machine" id="slot-machine"></div>
    <div class="controls">
      <button id="lever" class="lever">Pull Lever</button>
    </div>
    <div id="message" class="message"></div>
  </div>
`;

const machine = document.getElementById('slot-machine');
const lever = document.getElementById('lever');
const message = document.getElementById('message');

const reels = [];
const REEL_COUNT = 3;

for (let r = 0; r < REEL_COUNT; r++) {
  const reel = document.createElement('div');
  reel.className = 'reel';
  reel.innerHTML = `
    <div class="slot top"></div>
    <div class="slot center"></div>
    <div class="slot bottom"></div>
  `;
  machine.appendChild(reel);
  reels.push({
    el: reel,
    top: reel.querySelector('.top'),
    center: reel.querySelector('.center'),
    bottom: reel.querySelector('.bottom'),
    idx: Math.floor(Math.random() * symbols.length)
  });
}

function renderReel(reel) {
  const len = symbols.length;
  const i = reel.idx;
  reel.top.textContent = symbols[(i - 1 + len) % len];
  reel.center.textContent = symbols[i % len];
  reel.bottom.textContent = symbols[(i + 1) % len];
}

reels.forEach(r => renderReel(r));

let spinning = false;

function spinOnce() {
  if (spinning) return;
  spinning = true;
  lever.disabled = true;
  lever.classList.add('active');
  message.textContent = '';

  // Durations so last reel stops at ~2000ms
  const durations = [1600, 1800, 2000];
  const minDelay = 40; // fast
  const maxDelay = 220; // slow
  let finished = 0;

  reels.forEach((reel, idx) => {
    const start = Date.now();
    function step() {
      reel.idx = (reel.idx + 1) % symbols.length;
      renderReel(reel);
      const elapsed = Date.now() - start;
      if (elapsed >= durations[idx]) {
        // ensure final symbol aligns exactly
        finished += 1;
        if (finished === REEL_COUNT) finishSpin();
        return;
      }
      const t = elapsed / durations[idx];
      const delay = Math.max(minDelay, Math.round(minDelay + (maxDelay - minDelay) * (t * t)));
      setTimeout(step, delay);
    }
    step();
  });

  function finishSpin() {
    spinning = false;
    lever.disabled = false;
    lever.classList.remove('active');
    const centers = reels.map(r => r.center.textContent);
    const allSame = centers.every(s => s === centers[0]);
    if (allSame) {
      message.textContent = `大当たり！ ${centers[0]} x${REEL_COUNT}`;
      message.classList.add('win');
    } else {
      message.textContent = '残念...';
      message.classList.remove('win');
    }
  }
}

lever.addEventListener('click', spinOnce);
document.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'Enter') spinOnce();
});

console.log('Slot machine (3 reels) ready');
