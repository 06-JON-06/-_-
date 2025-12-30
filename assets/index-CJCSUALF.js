(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const t of n)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function s(n){const t={};return n.integrity&&(t.integrity=n.integrity),n.referrerPolicy&&(t.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?t.credentials="include":n.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(n){if(n.ep)return;n.ep=!0;const t=s(n);fetch(n.href,t)}})();const i=["🍒","🍋","🔔","⭐","7️⃣","🍀","🍇","🍉"],x=document.getElementById("app");x.innerHTML=`
  <div class="slot-wrapper">
    <div class="slot-machine" id="slot-machine"></div>
    <div class="controls">
      <button id="lever" class="lever">Pull Lever</button>
    </div>
    <div id="message" class="message"></div>
  </div>
`;const E=document.getElementById("slot-machine"),d=document.getElementById("lever"),a=document.getElementById("message"),u=[],f=3;for(let o=0;o<f;o++){const e=document.createElement("div");e.className="reel",e.innerHTML=`
    <div class="slot top"></div>
    <div class="slot center"></div>
    <div class="slot bottom"></div>
  `,E.appendChild(e),u.push({el:e,top:e.querySelector(".top"),center:e.querySelector(".center"),bottom:e.querySelector(".bottom"),idx:Math.floor(Math.random()*i.length)})}function h(o){const e=i.length,s=o.idx;o.top.textContent=i[(s-1+e)%e],o.center.textContent=i[s%e],o.bottom.textContent=i[(s+1)%e]}u.forEach(o=>h(o));let m=!1;function g(){if(m)return;m=!0,d.disabled=!0,d.classList.add("active"),a.textContent="";const o=[1600,1800,2e3],e=40,s=220;let c=0;u.forEach((t,r)=>{const l=Date.now();function p(){t.idx=(t.idx+1)%i.length,h(t);const v=Date.now()-l;if(v>=o[r]){c+=1,c===f&&n();return}const y=v/o[r],L=Math.max(e,Math.round(e+(s-e)*(y*y)));setTimeout(p,L)}p()});function n(){m=!1,d.disabled=!1,d.classList.remove("active");const t=u.map(l=>l.center.textContent);t.every(l=>l===t[0])?(a.textContent=`大当たり！ ${t[0]} x${f}`,a.classList.add("win")):(a.textContent="残念...",a.classList.remove("win"))}}d.addEventListener("click",g);document.addEventListener("keydown",o=>{(o.key===" "||o.key==="Enter")&&g()});console.log("Slot machine (3 reels) ready");
