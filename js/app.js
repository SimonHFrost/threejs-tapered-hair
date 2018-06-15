const THREE = require('three')

const initialize = require('./initializer.js').initialize
const output = initialize()
const scene = output.scene

const createAmbientLight = require('./object-creator.js').createAmbientLight
const createDirectionalLight = require('./object-creator.js').createDirectionalLight
const createCube = require('./object-creator.js').createCube

var path = new THREE.Path()
path.moveTo(-50, -50)

for (let i = 0; i < 2; i++) {
  let locationX = Math.random() * 50
  let locationY = Math.random() * 50

  let firstAnchorX = Math.random() * 50
  let firstAnchorY = Math.random() * 50

  let secondAnchorX = Math.random() * 50
  let secondAnchorY = Math.random() * 50

  path.bezierCurveTo( firstAnchorX, firstAnchorY, secondAnchorX, secondAnchorY, locationX, locationY )

  // DIAGNOSTICS
  scene.add(createCube(firstAnchorX, firstAnchorY, 'green'))
  scene.add(createCube(secondAnchorX, secondAnchorY, 'red'))
  scene.add(createCube(locationX, locationY, 'blue'))
}

var points = path.getPoints();

var geometry = new THREE.BufferGeometry().setFromPoints( points );
var material = new THREE.LineBasicMaterial( { color: 0xffffff } );

var line = new THREE.Line( geometry, material );
scene.add( line );

scene.add(createAmbientLight())
scene.add(createDirectionalLight())
