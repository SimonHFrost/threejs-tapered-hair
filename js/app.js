const THREE = require('three')

const initialize = require('./initializer.js').initialize

const createAmbientLight = require('./object-creator.js').createAmbientLight
const createDirectionalLight = require('./object-creator.js').createDirectionalLight
const createCube = require('./object-creator.js').createCube
const createLineSegment = require('./object-creator.js').createLineSegment
const createLine = require('./object-creator.js').createLine

const output = initialize()
const scene = output.scene
scene.add(createAmbientLight())
scene.add(createDirectionalLight())

function getRandomNearby(value, length) {
  return value - (length / 2) + Math.random() * length
}

// NOTE We have to save a reference to previous point do draw the next anchor line properly
let oldX = null;
let oldY = null;

function createCurve(x1, y1, x, y, x2, y2) {
  // NOTE Draw curve. Different ordering of params here!
  path.bezierCurveTo(x1, y1, x2, y2, x, y)

  // NOTE First anchor
  scene.add(createCube(x1, y1, 'red'))
  scene.add(createLineSegment(oldX, oldY, x1, y1, 'red'))

  scene.add(createCube(x, y, 'blue'))

  // NOTE Second anchor
  scene.add(createCube(x2, y2, 'red'))
  scene.add(createLineSegment(x, y, x2, y2, 'red'))

  oldX = x2
  oldY = y2
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
    nextConnectingX,
    nextConnectingY,
    nextAnchor1X,
    nextAnchor1Y
  )

  connectingX = nextConnectingX
  connectingY = nextConnectingY
  anchor2X = nextAnchor1X
  anchor2Y = nextAnchor1Y
}

scene.add(createLine(path))
