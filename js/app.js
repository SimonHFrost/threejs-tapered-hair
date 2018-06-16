const THREE = require('three')

const initialize = require('./initializer.js').initialize
const output = initialize()
const scene = output.scene

const createAmbientLight = require('./object-creator.js').createAmbientLight
const createDirectionalLight = require('./object-creator.js').createDirectionalLight
const createCube = require('./object-creator.js').createCube

function getRandomNearby(x, y, length) {
  return {
    x: x - (length / 2) + Math.random() * length,
    y: y - (length / 2) + Math.random() * length
  }
}

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

var path = new THREE.Path()

const anchor1X = Math.random() * 200
const anchor1Y = Math.random() * 200

const connectingX = 250 * Math.random()
const connectingY = 250 * Math.random()

const anchor2X = connectingX - 50
const anchor2Y = connectingY - 50 // TODO Make this randomised

drawPoint(
  anchor1X,
  anchor1Y,
  anchor2X,
  anchor2Y,
  connectingX,
  connectingY
)

drawPoint(
  connectingX + 50, // TODO Make this calculated from previous anchor points and connecting points
  connectingY + 50, //
  Math.random() * 200,
  Math.random() * 200,
  Math.random() * 400,
  Math.random() * 400)

// Curve is continuous because the sequential anchor points form a line between the connecting point!
drawResult()
