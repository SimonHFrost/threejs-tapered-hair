import * as THREE from 'three'
import dat from 'dat.gui'

import { createAmbientLight, createDirectionalLight, createCurve, createLine, createCube, createLineSegment } from './object-creator';
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

    let nextAnchorX = getRandomNearby(nextConnectingX, controls.anchorDistance)
    let nextAnchorY = getRandomNearby(nextConnectingY, controls.anchorDistance)

    path = createCurve(
      path,
      previousAnchorX,
      previousAnchorY,
      nextConnectingX,
      nextConnectingY,
      nextAnchorX,
      nextAnchorY
    )

    connectingX = nextConnectingX
    connectingY = nextConnectingY
    anchor2X = nextAnchorX
    anchor2Y = nextAnchorY
  }

  return path
}

function showBezierDebug (path) {
  let prevV2 = {
    x: 0,
    y: 0
  }

  path.curves.forEach(curve => {
    scene.add(createCube(curve.v0.x, curve.v0.y, 'red'))

    scene.add(createCube(curve.v1.x, curve.v1.y, 'blue'))
    scene.add(createLineSegment(curve.v1.x, curve.v1.y, prevV2.x, prevV2.y, 'blue'))
    scene.add(createCube(curve.v2.x, curve.v2.y, 'blue'))

    prevV2 = curve.v2
  })
}

let path = null
let line = null

function generate () {
  scene.remove(line)
  path = createPath()

  showBezierDebug(path)

  line = createLine(path)
  scene.add(line)
}

generate()
