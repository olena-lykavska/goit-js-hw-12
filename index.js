import{a as _,S as w}from"./assets/vendor-DBMDmZZa.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const y of o.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&a(y)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const S="https://pixabay.com/api/",q="47732907-b8d033787a8c1460109d1a6df";async function m(r,t=1,n=15){const a={key:q,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:n};try{return(await _.get(S,{params:a})).data}catch(e){throw console.error("Помилка запиту до Pixabay API:",e),e}}let u;function h(r){return r.map(({webformatURL:t,largeImageURL:n,tags:a})=>`
    <a class="gallery__item" href="${n}">
      <img class="gallery__image" src="${t}" alt="${a}" loading="lazy" />
    </a>
  `).join("")}function g(r,t){r.insertAdjacentHTML("beforeend",t),u?u.refresh():u=new w(".gallery__item",{captionsData:"alt",captionDelay:250})}function P(r){r.innerHTML=""}const v=document.querySelector(".search-form"),c=document.querySelector(".gallery"),l=document.querySelector(".load-more"),f=document.querySelector(".end-message"),p=document.querySelector(".loader");let i="",s=1;const d=15;l.style.display="none";f.style.display="none";p.style.display="none";function b(){p.style.display="block"}function L(){p.style.display="none"}v.addEventListener("submit",async r=>{if(r.preventDefault(),i=r.target.elements.searchQuery.value.trim(),!!i){s=1,P(c),l.style.display="none",f.style.display="none";try{b();const t=await m(i,s,d);if(t.hits.length===0){alert("За вашим запитом нічого не знайдено. Спробуйте ще раз.");return}const n=h(t.hits);g(c,n),t.totalHits>d&&(l.style.display="block")}catch(t){console.error(t),alert("Щось пішло не так. Спробуйте пізніше.")}finally{L()}}});l.addEventListener("click",async()=>{s+=1;try{b();const r=await m(i,s,d),t=h(r.hits);g(c,t),s*d>=r.totalHits&&(l.style.display="none",f.style.display="block");const{height:n}=c.firstElementChild.getBoundingClientRect();window.scrollBy({top:n*2,behavior:"smooth"})}catch(r){console.error(r),alert("Щось пішло не так. Спробуйте пізніше.")}finally{L()}});
//# sourceMappingURL=index.js.map
