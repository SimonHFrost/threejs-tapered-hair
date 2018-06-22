const THREE = require('three')

const initialize = require('./initializer.js').initialize

const createAmbientLight = require('./object-creator.js').createAmbientLight
const createDirectionalLight = require('./object-creator.js').createDirectionalLight
const createCurve = require('./object-creator.js').createCurve
const createLine = require('./object-creator.js').createLine

const dat = require('dat.gui')

var gui = new dat.GUI()
var controls = {
  range: 500,
  anchorRange: 200,
  generate: () => { console.log('generate') }
}

gui.add(controls, 'range', 0, 1000)
gui.add(controls, 'anchorRange', 0, 1000)
gui.add(controls, 'generate')

function getRandomNearby(value, length) {
  return value - (length / 2) + Math.random() * length
}

const output = initialize()
const scene = output.scene
scene.add(createAmbientLight())
scene.add(createDirectionalLight())

var path = new THREE.Path()

let previousAnchorX = Math.random() * controls.range
let previousAnchorY = Math.random() * controls.range

let connectingX = 0
let connectingY = 0

let anchor2X = getRandomNearby(connectingX, controls.anchorRange)
let anchor2Y = getRandomNearby(connectingY, controls.anchorRange)

for (let i = 0; i < 5; i++) {
  previousAnchorX = connectingX + (connectingX - anchor2X)
  previousAnchorY = connectingY + (connectingY - anchor2Y)

  let nextConnectingX = Math.random() * controls.range
  let nextConnectingY = Math.random() * controls.range

  let nextAnchor1X = getRandomNearby(nextConnectingX, controls.anchorRange)
  let nextAnchor1Y = getRandomNearby(nextConnectingY, controls.anchorRange)

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
