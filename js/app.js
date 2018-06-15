const THREE = require('three')

const initialize = require('./initializer.js').initialize
const output = initialize()
const scene = output.scene

const createAmbientLight = require('./object-creator.js').createAmbientLight
const createDirectionalLight = require('./object-creator.js').createDirectionalLight
const createCube = require('./object-creator.js').createCube

var path = new THREE.Path()
path.moveTo(-50, -50)

let previousAnchorX = Math.random() * 50
let previousAnchorY = Math.random() * 50

for (let i = 0; i < 2; i++) {
  let locationX = Math.random() * 50
  let locationY = Math.random() * 50

  let anchorX = Math.random() * 50
  let anchorY = Math.random() * 50

  path.bezierCurveTo( previousAnchorX, previousAnchorY, anchorX, anchorY, locationX, locationY )

  // DIAGNOSTICS
  scene.add(createCube(previousAnchorX, previousAnchorY, 'red'))
  scene.add(createCube(anchorX, anchorY, 'red'))
  scene.add(createCube(locationX, locationY, 'blue'))

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
