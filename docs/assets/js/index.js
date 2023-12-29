(()=>{"use strict";const e=document.getElementById("burger-btn"),t=document.querySelector(".burger-menu"),c=document.querySelector(".burger-wrraper"),s=document.querySelectorAll(".burger-menu__link"),l=document.querySelector(".burger-menu__icon"),o=()=>{document.body.style.overflow="",c.classList.remove("flex"),t.classList.remove("show"),e.classList.remove("active")},n=()=>{t.classList.contains("show")?o():(document.body.style.overflow="hidden",c.classList.add("flex"),t.classList.add("show"),e.classList.add("active"))};e.addEventListener("click",n),s.forEach((e=>{e.addEventListener("click",n)})),l.addEventListener("click",o);class i{constructor(e,t){this.$el=document.querySelector(e),this.options=t,this.selectedId=t.selectedId,this.render(),this.setup()}render(){const{placeholder:e,data:t}=this.options;this.$el.classList.add("select"),this.$el.innerHTML=((e=[],t,c)=>{let s=t??"placeholder не указан";const l=e.map((e=>{let t="";return e.id===c&&(s=e.value,t="selected"),`<li class="select__item ${t}" data-type="item" data-id="${e.id}"><a href='${e.link}'>${e.value}</a></li>`}));return`\n    <input type="hidden" class="hidden__input">\n    <div class="select__backdrop" data-type="backdrop"></div>\n    <div class="select__input" data-type="input">\n        <span data-type="value">${s}</span>\n        <svg class="select__icon" width="16" height="10" viewBox="0 0 16 10" data-type="arrow">\n              <use xlink:href="#selectArrow"></use>\n        </svg>\n    </div>\n    <div class="select__dropdown">\n        <ul class="select__list">\n            ${l.join("")}\n        </ul>\n    </div>\n`})(t,e,this.selectedId)}setup(){this.clickHandler=this.clickHandler.bind(this),this.$el.addEventListener("click",this.clickHandler),this.$arrow=this.$el.querySelector('[data-type="arrow"]'),this.$value=this.$el.querySelector('[data-type="value"]')}clickHandler(e){const{type:t}=e.target.dataset;if("input"===t)this.toggle();else if("item"===t){const t=e.target.dataset.id;this.select(t)}else"backdrop"===t&&this.close()}get isOpen(){return this.$el.classList.contains("open")}get current(){return this.options.data.find((e=>e.id===this.selectedId))}select(e){this.selectedId=e,this.$value.textContent=this.current.value,this.$el.querySelectorAll('[data-type="item"]').forEach((e=>e.classList.remove("selected"))),this.$el.querySelector(`[data-id="${e}"]`).classList.add("selected"),this.options.onSelect&&this.options.onSelect(this.current),this.close()}toggle(){this.isOpen?this.close():this.open()}open(){this.$el.classList.add("open"),this.$arrow.classList.add("open")}close(){this.$el.classList.remove("open"),this.$arrow.classList.remove("open")}destroy(){this.$el.removeEventListener("click",this.clickHandler),this.$el.innerHTML=""}}try{new i(".header__select",{placeholder:"Меню",selectedId:"1",data:[{id:"journal",value:"Журналы",link:"./journal.html"},{id:"author",value:"Авторам",link:"./author.html"},{id:"contact",value:"Контакты",link:"./contact.html"}],onSelect(e){document.querySelector(".hidden__input").value=e.value}})}catch(e){console.log("Элемент не найден на странице")}try{new i(".header__insurance-select",{placeholder:"Меню",selectedId:"1",data:[{id:"journal",value:"Архив",link:"#"},{id:"author",value:"Авторам",link:"./author.html"},{id:"contact",value:"Контакты",link:"./contact.html"}],onSelect(e){document.querySelector(".hidden__input").value=e.value}})}catch(e){console.log("Элемент не найден на странице"),console.log(e)}function a(e){const t=[];for(const c of e)t.push(c);return t}function r(e,t){let c=0;const s=[];for(let l in e)c++,c<t||(e[l].classList.add("none"),s.push(e[l]));return s}function d(e){let t=0;for(let c in e)t++,t<3||e[c].classList.add("opacity-07")}function u(e,t,c){for(let e of t)e.classList.contains("none")&&e.classList.remove("none"),e.classList.contains("opacity-07")&&e.classList.remove("opacity-07");e.classList.add("none"),c.classList.add("tags__block--active")}new Swiper(".book-slider",{slidesPerView:"auto",slidesPerGroup:1,spaceBetween:24,simulateTouch:!0}),new Swiper(".market-slider",{navigation:{nextEl:".slider-arrow-next",prevEl:".slider-arrow-prev"},pagination:{el:".swiper-pagination"},slidesPerView:"auto",slidesPerGroup:1,spaceBetween:0,simulateTouch:!0,loop:!0,speed:800});try{const e=document.querySelector(".tags__btn--up"),t=document.querySelector(".tags__btn--down"),c=document.querySelectorAll(".tag-block--up"),s=document.querySelectorAll(".tag-block--down"),l=document.querySelector(".tags__block--up"),o=document.querySelector(".tags__block--down"),n=a(c),i=a(s);r(n,6),d(n),r(i,6),d(i),e.addEventListener("click",(()=>{u(e,n,l)})),t.addEventListener("click",(()=>{u(t,i,o)}))}catch{console.log("Элемент не найден на этой странице")}try{document.querySelectorAll(".documents__btn").forEach((e=>{const t=e.parentElement.parentElement,c=t.querySelectorAll(".documents__item"),s=t.querySelector(".gradient"),l=r(a(c),4);e.addEventListener("click",(()=>{for(let e of l)e.style.display="block";s.classList.add("gradient--none"),e.style.display="none"}))}))}catch{console.log("Элемент не найден на этой странице")}try{document.querySelectorAll(".contact__copy").forEach((e=>{const t=e.parentElement,c=t.parentElement.querySelector(".contact__dscr");e.addEventListener("click",(()=>{const e=document.createElement("p");e.classList.add("succsess-copy"),e.textContent="Скопировано",t.append(e),setTimeout((()=>e.remove()),2e3),navigator.clipboard.writeText(c.textContent)}))}))}catch{console.log("Текст не скопирован")}try{const e=document.querySelector(".i-about__more"),t=document.querySelector(".i-about__hidden-block"),c=document.querySelector(".i-about__hidden");e.addEventListener("click",(()=>{t.style.display="block",e.style.display="none"})),c.addEventListener("click",(()=>{t.style.display="none",e.style.display="block"}))}catch{console.log("Элемент не найден на странице")}try{const e=document.querySelectorAll(".accordion-item__header"),t=document.querySelectorAll(".accordion-item__body");let c=0;for(let t of e)if(c++,4===c){t.parentNode.querySelector(".accordion-item__body");const e=t.nextElementSibling;t.querySelector(".accordion-item__icon").classList.add("accordion-item__icon--active"),t.classList.add("accordion-item__header--active"),e.style.maxHeight=e.scrollHeight+"px"}e.forEach((e=>{e.addEventListener("click",(()=>{let c=e.nextElementSibling,s=e.querySelector(".accordion-item__icon");c.style.maxHeight?(t.forEach((e=>{e.style.maxHeight=null})),s.classList.remove("accordion-item__icon--active"),e.classList.remove("accordion-item__header--active")):(t.forEach((e=>{e.style.maxHeight=null})),c.style.maxHeight=c.scrollHeight+"px",s.classList.add("accordion-item__icon--active"),e.classList.add("accordion-item__header--active"))}))}))}catch{console.log("Элемент не найден на странице")}})();