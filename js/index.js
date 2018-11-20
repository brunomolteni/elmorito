import "../css/styles.scss";
import "../css/ui.scss";
import "../node_modules/basiclightbox/src/styles/main.scss";
import "../node_modules/plyr/dist/plyr.css"
import "../node_modules/tiny-slider/src/tiny-slider.scss";

import initEmergence from 'emergence.js'; // https://github.com/xtianmiller/emergence.js ANIMACIONES
import * as basicLightbox from 'basiclightbox' // https://basiclightbox.electerious.com/
import Plyr from 'plyr';
import { tns } from 'tiny-slider';

const sliderOptions = {controlsText: ['❮','❯'],"mouseDrag": true,"swipeAngle": false, controlsPosition: "bottom"};

const players = Plyr.setup('.plyr',{controls: ['play', 'progress']});

const emergence = initEmergence(this);

emergence.init();

const subHome = tns({...sliderOptions, container: '#Home .sub-slider', items: 1, nav: false, mouseDrag: false, nested: 'inner'});
const home = tns({...sliderOptions, container: '#Home .slider', items: 1, controls: false, mouseDrag: false, autoplay: true, autoplayButtonOutput: false, nested: 'outer'});
const criterios = tns({...sliderOptions, container: '#Criterios .slider', items: 5, nav: false, loop: false, gutter:30});
const caballos = tns({...sliderOptions, container: '#Caballos .slider', items: 5, nav: false, loop: false, gutter:0});
const fotos = tns({...sliderOptions, container: '#Imagenes.slider', items: 5, nav: false, gutter: 20, mouseDrag: false});
const videos = tns({...sliderOptions, container: '#Videos.slider', items: 5, nav: false, gutter: 20, mouseDrag: false});


function $(selector){
  return document.querySelector(selector);
}

$('#Imagenes-ow').classList.add('active');;

window.show = selector => {
  $('.active').classList.remove('active');
  $(selector).classList.add('active');
}

window.openImage = e => {
  const instance = basicLightbox.create(e.innerHTML);
  instance.show();
}

window.openVideo = id => {
  let frame = `<iframe width="1024" height="576" src="https://www.youtube.com/embed/${id}?autoplay=1"></iframe>`;
  const instance = basicLightbox.create(frame);
  instance.show();
}
