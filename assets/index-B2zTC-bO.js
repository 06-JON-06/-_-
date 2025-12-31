(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))h(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const p of o.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&h(p)}).observe(document,{childList:!0,subtree:!0});function u(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function h(n){if(n.ep)return;n.ep=!0;const o=u(n);fetch(n.href,o)}})();const c=["🍒","🍋","🔔","⭐","7️⃣","🍀","🍇","🍉","🔁"],P=document.getElementById("app");P.innerHTML=`
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
`;const y=document.createElement("div");y.className="role-stack";y.id="role-stack";document.body.appendChild(y);let g=null;function k(){y.innerHTML="";const e=document.createElement("div");e.className="role-item",g?e.innerHTML=`<span class="role-symbol">${g.symbol||""}</span><span class="role-text">${g.role}</span>`:e.innerHTML='<span class="role-symbol">—</span><span class="role-text">保存なし</span>',y.appendChild(e)}function H(e,t){!e||e==="はずれ"||(g={role:e,symbol:t},k())}const $=document.getElementById("slot-machine"),v=document.getElementById("lever"),f=document.getElementById("message"),r=document.getElementById("role-select"),a=document.getElementById("role-preview"),d=[],O=3;for(let e=0;e<O;e++){const t=document.createElement("div");t.className="reel",t.innerHTML=`
    <div class="slot top"></div>
    <div class="slot center"></div>
    <div class="slot bottom"></div>
  `,$.appendChild(t),d.push({el:t,top:t.querySelector(".top"),center:t.querySelector(".center"),bottom:t.querySelector(".bottom"),idx:Math.floor(Math.random()*c.length)})}function x(e){const t=c.length,u=e.idx;e.top.textContent=c[(u-1+t)%t],e.center.textContent=c[u%t],e.bottom.textContent=c[(u+1)%t]}d.forEach(e=>x(e));let L=!1;function T(){if(L)return;L=!0,v.disabled=!0,r&&(r.disabled=!0),v.classList.add("active"),f.textContent="";const e=["はずれ","リプレイ","ベル","スイカ","チェリー"],t={はずれ:null,リプレイ:"🔁",ベル:"🔔",スイカ:"🍉",チェリー:"🍒"},u={はずれ:.6,リプレイ:.15,ベル:.15,スイカ:.06,チェリー:.04};function h(){const s=Math.random();let l=0;for(const m of e)if(l+=u[m]||0,s<l)return m;return"はずれ"}const n=r?r.value:"auto",o=n&&n!=="auto"?n:h();if(a){const s=t[o]||"";a.textContent=`次回: ${s} ${o}`.trim()}const p=t[o],E=p?c.indexOf(p):-1,C=[1600,1800,2e3],b=40,I=220;let M=0;d.forEach((s,l)=>{const m=Date.now();function i(){s.idx=(s.idx+1)%c.length,x(s);const w=Date.now()-m;if(w>=C[l]){E>=0?s.idx=E:s.idx=Math.floor(Math.random()*c.length),x(s),M+=1,M===O&&N(o);return}const S=w/C[l],B=Math.max(b,Math.round(b+(I-b)*(S*S)));setTimeout(i,B)}i()});function N(s){L=!1,v.disabled=!1,r&&(r.disabled=!1),v.classList.remove("active");let l=d.map(i=>i.center.textContent),m=l.every(i=>i===l[0]);if(s==="はずれ"&&m&&(d[0].idx=(d[0].idx+1)%c.length,x(d[0]),l=d.map(i=>i.center.textContent),m=l.every(i=>i===l[0])),s==="はずれ"){f.textContent="はずれ...",f.classList.remove("win"),a&&(a.textContent="次回: 自動");return}f.textContent=`${s}！`,f.classList.add("win"),H(s,t[s]),a&&(a.textContent="次回: 自動")}}v.addEventListener("click",T);document.addEventListener("keydown",e=>{(e.key===" "||e.key==="Enter")&&T()});r&&a&&r.addEventListener("change",()=>{a.textContent=r.value==="auto"?"自動":r.value});console.log("Slot machine (3 reels) ready");
