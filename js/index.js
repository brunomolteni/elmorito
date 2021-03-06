import "../css/ui.scss";
import "../css/styles.scss";


import * as basicLightbox from 'basiclightbox' // https://basiclightbox.electerious.com/
import "../node_modules/basiclightbox/src/styles/main.scss";

import Plyr from 'plyr'; // https://github.com/sampotts/plyr
import "../node_modules/plyr/dist/plyr.css"

import { tns } from 'tiny-slider'; // https://github.com/ganlanyuan/tiny-slider
import "../node_modules/tiny-slider/src/tiny-slider.scss";

import initEmergence from 'emergence.js'; // https://github.com/xtianmiller/emergence.js
import serialize from './serialize'; // https://vanillajstoolkit.com/helpers/serialize/
import smoothscroll from 'smoothscroll-polyfill'; // https://github.com/iamdustan/smoothscroll
import 'unfetch/polyfill'; // https://github.com/developit/unfetch
import isMobile from 'ismobilejs'; // https://github.com/kaimallea/isMobile
import spy from './scrollspy';

// SETUP
smoothscroll.polyfill();
initEmergence(this).init();
Plyr.setup('.plyr',{controls: ['play', 'progress']});


// SLIDERS
const sliderOptions = {controlsText: ['❮','❯'],"mouseDrag": true,"swipeAngle": false, controlsPosition: "bottom"};


const startHomeSlider = (index,autoplay) => {
  const subSlider = tns({...sliderOptions, container: '#Home .sub-slider', items: 1, nav: false, mouseDrag: false, nested: 'inner'});
  const slider = tns({...sliderOptions, container: '#Home .slider', items: 1, controls: false, mouseDrag: false, autoplay: autoplay, autoplayButtonOutput: false, nested: 'outer',startIndex: index});
  return slider;
}

if(isMobile.phone){
  document.body.classList.add('mobile');
  let sliderItems = document.querySelectorAll('#Home li');

  sliderItems.forEach((el,i) => {
    const index = i;
    el.addEventListener('click', function homeListener(e) {
      console.log(index);
      sliderItems.forEach(el => {
        el !== e.currentTarget && el.classList.add('inactive');
        el.removeEventListener('click',homeListener)
      });
      e.currentTarget.classList.add('active');

      setTimeout(startHomeSlider.bind(null,index,false),500);
    });
  });
}else{
  startHomeSlider(0,true);
}


const criterios = tns({...sliderOptions,
  container: '#Criterios .slider',
  items: 2,
  nav: true,
  controls: false,
  loop: false,
  gutter:30,
  responsive: {
    "500": {
      items: 3
    },
    "700": {
      items: 4,
      nav: false,
      controls: true,
    },
    "1000": {
      items: 5
    }
  },
});
const caballos = tns({...sliderOptions,
  container: '#Caballos .slider',
  items: 2,
  nav: true,
  loop: false,
  gutter:0,
  responsive: {
    "500": {
      items: 3
    },
    "700": {
      items: 4,
      nav: false,
      controls: true,
    },
    "1000": {
      items: 5
    }
  },
});

const fotos = tns({...sliderOptions,
  container: '#Imagenes.slider',
  items: 1,
  nav: false,
  gutter: 20,
  mouseDrag: false,
  edgePadding: 50,
  responsive: {
    "500": {
      items: 2
    },
    "700": {
      edgePadding: 0,
      items: 4,
    },
    "1000": {
      items: 5
    }
  },
});

const videos = tns({...sliderOptions,
  container: '#Videos.slider',
  items: 1,
  nav: false,
  gutter: 20,
  mouseDrag: false,
  edgePadding: 50,
  responsive: {
    "500": {
      items: 2
    },
    "700": {
      edgePadding: 0,
      items: 4,
    },
    "1000": {
      items: 5
    }
  },
});

// Utils
function $(selector){
  return document.querySelector(selector);
}

function $$(selector){
  return document.querySelectorAll(selector);
}

// Galleries
$('#Imagenes-ow').classList.add('active');;
window.show = selector => {
  $('.active').classList.remove('active');
  $(selector).classList.add('active');
}

// Lightbox
window.openImage = e => {
  const instance = basicLightbox.create(e.innerHTML);
  instance.show();
}
window.openVideo = id => {
  let frame = `<iframe width="1024" height="576" src="https://www.youtube.com/embed/${id}?autoplay=1"></iframe>`;
  const instance = basicLightbox.create(frame);
  instance.show();
}

// Responsive Menu
const openMenu = () => {
  $('header').classList.add('open');
}
const closeMenu = () => {
  $('header').classList.remove('open');
}

$$('header nav a, header .close').forEach( el=> el.addEventListener('click',closeMenu));
$('header .menu').addEventListener('click',openMenu);

// AJAX Form
const form = $('form');
const submit = $('input[type=submit]');
const formSubmit = e => {
  form.classList.add('loading');
  submit.value = '...';
  submit.disabled = true;

  fetch('/', {
    method: 'POST',
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: serialize(form)
  }).then(() => {
    form.classList.remove('loading');
    submit.value = 'Enviado!';
   })
    .catch(error => alert('Hubo un error, por favor pruebe de nuevo dentro de unos minutos.'));

  e.preventDefault();
}
form.addEventListener('submit',formSubmit)

// scrollSpy
spy();
