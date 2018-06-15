const THREE = require('three')

const initialize = require('./initializer.js').initialize
const output = initialize()
const scene = output.scene

const createAmbientLight = require('./object-creator.js').createAmbientLight
const createDirectionalLight = require('./object-creator.js').createDirectionalLight
const createCube = require('./object-creator.js').createCube

var path = new THREE.Path()
path.moveTo(-50, -50)

function drawPoint(x1, y1, x2, y2, x, y) {
  path.bezierCurveTo(x1, y1, x2, y2, x, y)
  scene.add(createCube(x1, y1, 'green'))
  scene.add(createCube(x2, y2, 'red'))
  scene.add(createCube(x, y, 'blue'))
}

function drawResult() {
  var points = path.getPoints();

  var geometry = new THREE.BufferGeometry().setFromPoints( points );
  var material = new THREE.LineBasicMaterial( { color: 0xffffff } );

  var line = new THREE.Line( geometry, material );
  scene.add( line );

  scene.add(createAmbientLight())
  scene.add(createDirectionalLight())
}

for (let i = 0; i < 2; i++) {
  let locationX = i * 50
  let locationY = i * 50

  let firstAnchorX = Math.random() * 50
  let firstAnchorY = Math.random() * 50

  let secondAnchorX = Math.random() * 50
  let secondAnchorY = Math.random() * 50

  drawPoint( firstAnchorX, firstAnchorY, secondAnchorX, secondAnchorY, locationX, locationY )
}

drawResult()
