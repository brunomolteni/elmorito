const fs = require('fs');
const from = "./index.template.html";
const to = "./index.html";

const fotos = require('./galeria/fotos.json').fotos;
const fotosSearch = "<fotos/>";
var fotosReplacement = '';
if(fotos && fotos.length)fotos.forEach( foto => {
  fotosReplacement += `
            <li class="glide__slide">
              <a onclick="openImage(this);return false" href="#"><img src=".${foto.src}" alt="${foto.alt}"></a>
            </li>`;
});

const videos = require('./galeria/videos.json').videos;
const videosSearch = "<videos/>";
var videosReplacement = '';
if(videos && videos.length)videos.forEach( video => {
  let videoId = video.url.indexOf('tu.be/') > -1 ? video.url.split('/').pop() : video.url.split('&').shift().split('?v=').pop();
  videosReplacement += `
            <li class="glide__slide">
              <a onclick="openVideo('${videoId}');return false" href="#"><img src="https://img.youtube.com/vi/${videoId}/mqdefault.jpg" alt="${video.title}"></a>
            </li>`;
});


fs.readFile(from, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }

    var result = data.replace(fotosSearch,fotosReplacement).replace(videosSearch,videosReplacement);
    fs.writeFile(to, result, 'utf8', function(err) {
        if (err) {
           return console.log(err);
        };
    });
});
