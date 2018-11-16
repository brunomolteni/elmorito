const fs = require('fs');
const fotos = require('./galeria/fotos.json').fotos;
const from = "./index.template.html";
const to = "./index.html";
const search = "<galeria/>";


var replacement = '';
fotos.forEach( foto => {
  replacement += `
            <li class="glide__slide">
              <a onclick="lightbox(this);return false" href="#"><img class="galeria__foto" src=".${foto.src}" alt="${foto.alt}"></a>
            </li>`;
});


fs.readFile(from, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }

    var result = data.replace(search,replacement);
    fs.writeFile(to, result, 'utf8', function(err) {
        if (err) {
           return console.log(err);
        };
    });
});
