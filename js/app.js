const THREE = require('three')

const initialize = require('./initializer.js').initialize
const createAmbientLight = require('./object-creator.js').createAmbientLight
const createDirectionalLight = require('./object-creator.js').createDirectionalLight
const FastSimplexNoise = require('fast-simplex-noise')

const output = initialize()
const scene = output.scene

var path = new THREE.Path();

// Randomly generate new point
// Get midpoint between new point and previous one
// Add a bit of randomness to midpoint

// path.lineTo( Math.random(), Math.random() );

for (let i = 0; i < 100; i++) {
  let locationX = Math.random() * 100
  let locationY = Math.random() * 100

  let anchorX = Math.random() * 100
  let anchorY = Math.random() * 100

  path.bezierCurveTo( anchorX, anchorY, anchorX, anchorY, locationX, locationY );
}

var points = path.getPoints();

var geometry = new THREE.BufferGeometry().setFromPoints( points );
var material = new THREE.LineBasicMaterial( { color: 0xffffff } );

var line = new THREE.Line( geometry, material );
scene.add( line );

scene.add(createAmbientLight())
scene.add(createDirectionalLight())
