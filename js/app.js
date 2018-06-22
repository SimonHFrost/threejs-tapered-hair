const THREE = require('three')

const initialize = require('./initializer.js').initialize

const createAmbientLight = require('./object-creator.js').createAmbientLight
const createDirectionalLight = require('./object-creator.js').createDirectionalLight
const createCurve = require('./object-creator.js').createCurve
const createLine = require('./object-creator.js').createLine

const output = initialize()
const scene = output.scene
scene.add(createAmbientLight())
scene.add(createDirectionalLight())

function getRandomNearby(value, length) {
  return value - (length / 2) + Math.random() * length
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
    scene,
    path,
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
