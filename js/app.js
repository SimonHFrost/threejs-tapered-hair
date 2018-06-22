const THREE = require('three')

const initialize = require('./initializer.js').initialize
const output = initialize()
const scene = output.scene

const createAmbientLight = require('./object-creator.js').createAmbientLight
const createDirectionalLight = require('./object-creator.js').createDirectionalLight
const createCube = require('./object-creator.js').createCube
const createLine = require('./object-creator.js').createLine

function getRandomNearby(value, length) {
  return value - (length / 2) + Math.random() * length
}

let oldX = null;
let oldY = null;

// FIXME tidy up super confusing code!
function createCurve(x1, y1, x2, y2, x, y) {
  path.bezierCurveTo(x1, y1, x2, y2, x, y)
  scene.add(createCube(x1, y1, 'red'))
  scene.add(createCube(x2, y2, 'red'))
  scene.add(createCube(x, y, 'blue'))

  scene.add(createLine(oldX, oldY, x1, y1, 'red'))
  oldX = x2
  oldY = y2
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

let previousAnchorX = Math.random() * 200
let previousAnchorY = Math.random() * 200

let connectingX = 0
let connectingY = 0

let anchor2X = getRandomNearby(connectingX, 100)
let anchor2Y = getRandomNearby(connectingY, 100)

for (let i = 0; i < 5; i++) {
  previousAnchorX = connectingX + (connectingX - anchor2X)
  previousAnchorY = connectingY + (connectingY - anchor2Y)

  let nextConnectingX = Math.random() * 200
  let nextConnectingY = Math.random() * 200

  let nextAnchor1X = getRandomNearby(nextConnectingX, 100)
  let nextAnchor1Y = getRandomNearby(nextConnectingY, 100)

  createCurve(
    previousAnchorX,
    previousAnchorY,
    nextAnchor1X,
    nextAnchor1Y,
    nextConnectingX,
    nextConnectingY
  )

  connectingX = nextConnectingX
  connectingY = nextConnectingY
  anchor2X = nextAnchor1X
  anchor2Y = nextAnchor1Y
}

drawResult()
