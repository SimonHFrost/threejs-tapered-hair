const THREE = require('three')

const initialize = require('./initializer.js').initialize
const createAmbientLight = require('./object-creator.js').createAmbientLight
const createDirectionalLight = require('./object-creator.js').createDirectionalLight
const FastSimplexNoise = require('fast-simplex-noise')

const output = initialize()
const scene = output.scene

var path = new THREE.Path();

// path.lineTo( Math.random(), Math.random() );

let previousAnchorX = Math.random() * 100
let previousAnchorY = Math.random() * 100

for (let i = 0; i < 10; i++) {
  let locationX = Math.random() * 100
  let locationY = Math.random() * 100

  let anchorX = locationX + (previousAnchorX - locationX)
  let anchorY = locationY + (previousAnchorY - locationY)

  path.bezierCurveTo( previousAnchorX, previousAnchorY, anchorX, anchorY, locationX, locationY )

  previousAnchorX = anchorX
  previousAnchorY = anchorY
}

var points = path.getPoints();

var geometry = new THREE.BufferGeometry().setFromPoints( points );
var material = new THREE.LineBasicMaterial( { color: 0xffffff } );

var line = new THREE.Line( geometry, material );
scene.add( line );

scene.add(createAmbientLight())
scene.add(createDirectionalLight())
