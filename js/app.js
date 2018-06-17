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
function drawPoint(x1, y1, x2, y2, x, y) {
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

const anchor1X = Math.random() * 200
const anchor1Y = Math.random() * 200

let connectingX = 250 * Math.random()
let connectingY = 250 * Math.random()

let anchor2X = getRandomNearby(connectingX, 100)
let anchor2Y = getRandomNearby(connectingY, 100)

drawPoint(
  anchor1X,
  anchor1Y,
  anchor2X,
  anchor2Y,
  connectingX,
  connectingY
)

for (let i = 0; i < 5; i++) {
  let nextConnectingX = Math.random() * 250
  let nextConnectingY = Math.random() * 250

  let nextAnchor1X = getRandomNearby(nextConnectingX, 100)
  let nextAnchor1Y = getRandomNearby(nextConnectingY, 100)

  drawPoint(
    connectingX + (connectingX - anchor2X),
    connectingY + (connectingY - anchor2Y),
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

// Curve is continuous because the sequential anchor points form a line between the connecting point!
drawResult()
