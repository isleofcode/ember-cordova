var fs = require('fs');
var Promise = require('rsvp').Promise;
var svg2png = require('svg2png');

module.exports = function rasterize(options) {
  return Promise.resolve(fs.readFileSync(options.src))
    .then(function(buffer) {
      return options.sizes.reduce(function(chain, size) {
        return chain
          .then(function() {
            return svg2png(buffer, { width: size.width, height: size.height });
          })
          .then(function(pngBuffer) {
            return fs.writeFileSync(size.dest, pngBuffer);
          });
      }, Promise.resolve());
    });
};
