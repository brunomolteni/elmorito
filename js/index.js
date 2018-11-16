import "../css/styles.scss";
import "../node_modules/@glidejs/glide/src/assets/sass/glide.core.scss";
import "../node_modules/@glidejs/glide/src/assets/sass/glide.theme.scss";
import Glide from '@glidejs/glide';
import initEmergence from 'emergence.js';
import debounce from 'lodash/debounce';

var emergence = initEmergence(this);

emergence.init();

function $(selector){
  return document.querySelector(selector);
}

const toggleArrows = debounce((index,lastIndex,selector)=>{
  console.log(index);
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
// https://github.com/xtianmiller/emergence.js ANIMACIONES
// https://glidejs.com/docs/setup SLIDER
// https://typeitjs.com/ typewriter
// https://medium.com/@filipvitas/tree-shake-lodash-with-parcel-js-48543941f53a tree shaking
