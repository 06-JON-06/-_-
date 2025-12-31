(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))v(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const f of n.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&v(f)}).observe(document,{childList:!0,subtree:!0});function d(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function v(e){if(e.ep)return;e.ep=!0;const n=d(e);fetch(e.href,n)}})();const c=["🍒","🍋","🔔","⭐","7️⃣","🍀","🍇","🍉","🔁"],P=document.getElementById("app");P.innerHTML=`
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
        <!--
        <span id="role-preview" class="role-preview">自動</span>
        -->
    </div>
    <div id="message" class="message"></div>
  </div>
`;const N=document.getElementById("slot-machine"),p=document.getElementById("lever"),m=document.getElementById("message"),r=document.getElementById("role-select"),C=document.getElementById("role-preview"),a=[],M=3;for(let o=0;o<M;o++){const t=document.createElement("div");t.className="reel",t.innerHTML=`
    <div class="slot top"></div>
    <div class="slot center"></div>
    <div class="slot bottom"></div>
  `,N.appendChild(t),a.push({el:t,top:t.querySelector(".top"),center:t.querySelector(".center"),bottom:t.querySelector(".bottom"),idx:Math.floor(Math.random()*c.length)})}function h(o){const t=c.length,d=o.idx;o.top.textContent=c[(d-1+t)%t],o.center.textContent=c[d%t],o.bottom.textContent=c[(d+1)%t]}a.forEach(o=>h(o));let g=!1;function S(){if(g)return;g=!0,p.disabled=!0,r&&(r.disabled=!0),p.classList.add("active"),m.textContent="";const o=["はずれ","リプレイ","ベル","スイカ","チェリー"],t={はずれ:null,リプレイ:"🔁",ベル:"🔔",スイカ:"🍉",チェリー:"🍒"},d={はずれ:.6,リプレイ:.15,ベル:.15,スイカ:.06,チェリー:.04};function v(){const s=Math.random();let i=0;for(const u of o)if(i+=d[u]||0,s<i)return u;return"はずれ"}const e=r?r.value:"auto",n=e&&e!=="auto"?e:v(),f=t[n],x=f?c.indexOf(f):-1,b=[1600,1800,2e3],y=40,O=220;let E=0;a.forEach((s,i)=>{const u=Date.now();function l(){s.idx=(s.idx+1)%c.length,h(s);const L=Date.now()-u;if(L>=b[i]){x>=0?s.idx=x:s.idx=Math.floor(Math.random()*c.length),h(s),E+=1,E===M&&I(n);return}const w=L/b[i],B=Math.max(y,Math.round(y+(O-y)*(w*w)));setTimeout(l,B)}l()});function I(s){g=!1,p.disabled=!1,r&&(r.disabled=!1),p.classList.remove("active");let i=a.map(l=>l.center.textContent),u=i.every(l=>l===i[0]);if(s==="はずれ"&&u&&(a[0].idx=(a[0].idx+1)%c.length,h(a[0]),i=a.map(l=>l.center.textContent),u=i.every(l=>l===i[0])),s==="はずれ"){m.textContent="はずれ...",m.classList.remove("win");return}m.textContent=`${s}！`,m.classList.add("win")}}p.addEventListener("click",S);document.addEventListener("keydown",o=>{(o.key===" "||o.key==="Enter")&&S()});r&&C&&r.addEventListener("change",()=>{C.textContent=r.value==="auto"?"自動":r.value});console.log("Slot machine (3 reels) ready");
