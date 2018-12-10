import * as THREE from 'three'
import dat from 'dat.gui'

import { createAmbientLight, createDirectionalLight, createCurve, createLine } from './object-creator';
import { initialize } from './initializer'

var gui = new dat.GUI()
var controls = {
  totalRange: 500,
  anchorDistance: 200,
  generate: () => { generate() }
}

gui.add(controls, 'totalRange', 0, 1000)
gui.add(controls, 'anchorDistance', 0, 1000)
gui.add(controls, 'generate')

function getRandomNearby (value, length) {
  return value - (length / 2) + Math.random() * length
}

const output = initialize()
const scene = output.scene
scene.add(createAmbientLight())
scene.add(createDirectionalLight())

function createPath () {
  var path = new THREE.Path()

  let previousAnchorX = Math.random() * controls.totalRange
  let previousAnchorY = Math.random() * controls.totalRange

  let connectingX = 0
  let connectingY = 0

  let anchor2X = getRandomNearby(connectingX, controls.anchorDistance)
  let anchor2Y = getRandomNearby(connectingY, controls.anchorDistance)

  for (let i = 0; i < 5; i++) {
    previousAnchorX = connectingX + (connectingX - anchor2X)
    previousAnchorY = connectingY + (connectingY - anchor2Y)

    let nextConnectingX = Math.random() * controls.totalRange
    let nextConnectingY = Math.random() * controls.totalRange

    let nextAnchor1X = getRandomNearby(nextConnectingX, controls.anchorDistance)
    let nextAnchor1Y = getRandomNearby(nextConnectingY, controls.anchorDistance)

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

  return path
}

let path = null
let line = null

function generate () {
  scene.remove(line)
  path = createPath()
  line = createLine(path)
  scene.add(line)
}

generate()
