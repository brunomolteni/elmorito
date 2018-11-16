import "../css/styles.scss";
import "../node_modules/@glidejs/glide/src/assets/sass/glide.core.scss";
import "../node_modules/@glidejs/glide/src/assets/sass/glide.theme.scss";
import "../node_modules/basiclightbox/src/styles/main.scss";

import Glide from '@glidejs/glide'; // https://glidejs.com/docs/setup
import initEmergence from 'emergence.js'; // https://github.com/xtianmiller/emergence.js ANIMACIONES
import debounce from 'lodash/debounce';
import * as basicLightbox from 'basiclightbox' // https://basiclightbox.electerious.com/

var emergence = initEmergence(this);

emergence.init();

function $(selector){
  return document.querySelector(selector);
}

function $$(selector){
  return document.querySelectorAll(selector);
}

const toggleArrows = debounce((index,lastIndex,selector)=>{
  if(index === lastIndex ){
    $(selector+' .glide__arrow--right').classList.add('--hidden');
    $(selector+' .glide__arrow--left').classList.remove('--hidden');
  }
  else if(index === 0){
    $(selector+' .glide__arrow--left').classList.add('--hidden');
    $(selector+' .glide__arrow--right').classList.remove('--hidden');
  }
  else {
    $(selector+' .glide__arrow--right').classList.remove('--hidden');
    $(selector+' .glide__arrow--left').classList.remove('--hidden');
  }
},50);

var home = new Glide('#Home .glide',{type:'carousel'}).mount();

var criterios = new Glide('#Criterios .glide',{perView: 5, bound: true, rewind: false, gap: 30}).mount();
criterios.on('move', () => {
  toggleArrows(criterios.index,2,"#Criterios")
})

var caballos = new Glide('#Caballos .glide',{perView: 5, bound: true, rewind: false, gap: 60}).mount();
caballos.on('move', () => {
  toggleArrows(caballos.index,4,"#Caballos")
})

var galeria;
window.show = selector => {
  $('.active').classList.remove('active');
  $(selector).classList.add('active');
  if(galeria) galeria.disable();
  if(selector !== '#Testimonios') galeria = new Glide(selector,{type: 'carousel', perView: 3, focusAt: 'center', peek: 200, gap: 20}).mount();
}
show('#Imagenes');

window.openImage = e => {
  const instance = basicLightbox.create(e.innerHTML);
  instance.show();
}

window.openVideo = id => {
  let frame = `<iframe width="1024" height="576" src="https://www.youtube.com/embed/${id}?autoplay=1"></iframe>`;
  const instance = basicLightbox.create(frame);
  instance.show();
}
