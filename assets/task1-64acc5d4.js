import"./main-a3e04fc6.js";const e=document.querySelector("[data-start]"),o=document.querySelector("[data-stop]");let r=null;e.addEventListener("click",t=>{t.target.disabled="true",o.disabled="",r=setInterval(()=>{const a=d(),n=document.body.style;n.backgroundColor=`${a}`},1e3)});o.addEventListener("click",t=>{t.target.disabled="true",e.disabled="",clearInterval(r)});function d(){return`#${Math.floor(Math.random()*16777215).toString(16).padStart(6,0)}`}
