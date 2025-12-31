import './style.css';

const symbols = ['🍒','🍋','🔔','⭐','7️⃣','🍀','🍇','🍉','🔁'];

const app = document.getElementById('app');
app.innerHTML = `
  <div class="slot-wrapper">
    <div class="slot-machine" id="slot-machine"></div>
    <div class="controls">
        <button id="lever" class="lever">Pull Lever</button>
        <label for="role-select" class="role-label">当たる役:</label>
        <select id="role-select">
          <option value="auto">自動</option>
          <option value="はずれ">はずれ</option>
          <option value="リプレイ">リプレイ</option>
          <option value="ベル">ベル</option>
          <option value="スイカ">スイカ</option>
          <option value="チェリー">チェリー</option>
        </select>
        <span id="role-preview" class="role-preview">次回: 自動</span>
    </div>
    <div id="message" class="message"></div>
  </div>
`;

// 成立した役を溜めるスタック（右上表示）
const stackContainer = document.createElement('div');
stackContainer.className = 'role-stack';
stackContainer.id = 'role-stack';
document.body.appendChild(stackContainer);

let lastRole = null;

function renderStack() {
  stackContainer.innerHTML = '';
  const el = document.createElement('div');
  el.className = 'role-item';
  if (!lastRole) {
    el.innerHTML = `<span class="role-symbol">—</span><span class="role-text">保存なし</span>`;
  } else {
    el.innerHTML = `<span class="role-symbol">${lastRole.symbol || ''}</span><span class="role-text">${lastRole.role}</span>`;
  }
  stackContainer.appendChild(el);
}

function pushRoleToStack(role, symbol) {
  // はずれは保存しない（既存の保存は維持）
  if (!role || role === 'はずれ') return;
  lastRole = { role, symbol };
  renderStack();
}

const machine = document.getElementById('slot-machine');
const lever = document.getElementById('lever');
const message = document.getElementById('message');
const roleSelect = document.getElementById('role-select');
const rolePreview = document.getElementById('role-preview');

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
  if (roleSelect) roleSelect.disabled = true;
  lever.classList.add('active');
  message.textContent = '';

  // 役を内部で決定する
  const roles = ['はずれ', 'リプレイ', 'ベル', 'スイカ', 'チェリー'];
  const roleToSymbol = {
    'はずれ': null,
    'リプレイ': '🔁',
    'ベル': '🔔',
    'スイカ': '🍉',
    'チェリー': '🍒'
  };
  // 簡単な確率配分（合計1）
  const weights = {
    'はずれ': 0.6,
    'リプレイ': 0.15,
    'ベル': 0.15,
    'スイカ': 0.06,
    'チェリー': 0.04
  };

  function pickRole() {
    const rnd = Math.random();
    let acc = 0;
    for (const r of roles) {
      acc += weights[r] || 0;
      if (rnd < acc) return r;
    }
    return 'はずれ';
  }

  // 選択が手動の場合はそれを優先
  const selected = roleSelect ? roleSelect.value : 'auto';
  const assignedRole = (selected && selected !== 'auto') ? selected : pickRole();
  // レバー時に抽選された次回の役をプレビュー表示
  if (rolePreview) {
    const sym = roleToSymbol[assignedRole] || '';
    rolePreview.textContent = `次回: ${sym} ${assignedRole}`.trim();
  }
  // 目標となるセンターシンボルのインデックス（はずれは後でランダムに決める）
  const targetSymbol = roleToSymbol[assignedRole];
  const targetIndex = targetSymbol ? symbols.indexOf(targetSymbol) : -1;

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
        // 終了時に役に合わせてセンターを固定する
        if (targetIndex >= 0) {
          // 目標シンボルに合わせてインデックスを設定
          reel.idx = targetIndex;
        } else {
          // はずれ：揃わないようにランダムに決める（全て同じにならないよう配慮）
          // まずランダムに決める
          reel.idx = Math.floor(Math.random() * symbols.length);
        }
        renderReel(reel);
        finished += 1;
        if (finished === REEL_COUNT) finishSpin(assignedRole);
        return;
      }
      const t = elapsed / durations[idx];
      const delay = Math.max(minDelay, Math.round(minDelay + (maxDelay - minDelay) * (t * t)));
      setTimeout(step, delay);
    }
    step();
  });

  function finishSpin(assignedRole) {
    spinning = false;
    lever.disabled = false;
    if (roleSelect) roleSelect.disabled = false;
    lever.classList.remove('active');
    let centers = reels.map(r => r.center.textContent);
    let allSame = centers.every(s => s === centers[0]);

    // assignedRole が はずれ のときに偶然揃ってしまったら崩す
    if (assignedRole === 'はずれ' && allSame) {
      // 1つ目のリールを変えて揃わないようにする
      reels[0].idx = (reels[0].idx + 1) % symbols.length;
      renderReel(reels[0]);
      centers = reels.map(r => r.center.textContent);
      allSame = centers.every(s => s === centers[0]);
    }

    if (assignedRole === 'はずれ') {
      message.textContent = 'はずれ...';
      message.classList.remove('win');
      // プレビューはスピン後は未確定表示に戻す
      if (rolePreview) rolePreview.textContent = '次回: 自動';
      return;
    }

    // それ以外は決まった役を表示
    message.textContent = `${assignedRole}！`;
    message.classList.add('win');
    // 成立役を単一スロットに保存
    pushRoleToStack(assignedRole, roleToSymbol[assignedRole]);
    // プレビューはスピン後は未確定表示に戻す
    if (rolePreview) rolePreview.textContent = '次回: 自動';
  }
}

lever.addEventListener('click', spinOnce);
document.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'Enter') spinOnce();
});

// プレビュー更新と制御
if (roleSelect && rolePreview) {
  roleSelect.addEventListener('change', () => {
    rolePreview.textContent = roleSelect.value === 'auto' ? '自動' : roleSelect.value;
  });
}

console.log('Slot machine (3 reels) ready');
