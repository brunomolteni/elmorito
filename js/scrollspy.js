import throttle from 'lodash.throttle';


const spy = function (){
  var section = document.querySelectorAll("section");
  var sections = {};

  window.onscroll = throttle(function() {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    if(scrollPosition > 5){
      document.body.classList.remove('onTop')
    }else{
      document.body.classList.add('onTop')
    }

    section.forEach( el => sections[el.id] = el.offsetTop - 5 );

    Object.keys(sections).forEach((key,i,arr) => {
      if(sections[key] < scrollPosition && (!arr[i+1] || sections[arr[i+1]] > scrollPosition )){
        document.querySelector('nav a.active').classList.remove('active');
        document.querySelector('nav a[href*=' + key + ']').classList.add('active');
      }
    });
  },200);
}

export default spy;
