var initVideotexture = require('./src/threex.videotexture');
var initWebcamtexture = require('./src/threex.webcamtexture');

module.exports = function(THREE, THREEx={}) {
  initVideotexture(THREE, THREEx);
  initWebcamtexture(THREE, THREEx);
  return THREEx;
}
