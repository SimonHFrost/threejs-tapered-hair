const THREE = require('three')

const initialize = require('./initializer.js').initialize
const createAmbientLight = require('./object-creator.js').createAmbientLight
const createDirectionalLight = require('./object-creator.js').createDirectionalLight
const FastSimplexNoise = require('fast-simplex-noise')

const output = initialize()
const scene = output.scene

var path = new THREE.Path();

// path.lineTo( Math.random(), Math.random() );

for (let i = 0; i < 10; i++) {
  let locationX = Math.random() * 100
  let locationY = Math.random() * 100

  let firstAnchorX = Math.random() * 100
  let firstAnchorY = Math.random() * 100

  // second anchor point should be equidistant and tangential to previous anchor
  let secondAnchorX = Math.random() * 100
  let secondAnchorY = Math.random() * 100

  path.bezierCurveTo( firstAnchorX, firstAnchorY, secondAnchorX, secondAnchorY, locationX, locationY )
}

var points = path.getPoints();

var geometry = new THREE.BufferGeometry().setFromPoints( points );
var material = new THREE.LineBasicMaterial( { color: 0xffffff } );

var line = new THREE.Line( geometry, material );
scene.add( line );

scene.add(createAmbientLight())
scene.add(createDirectionalLight())
