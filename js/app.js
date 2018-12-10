import * as THREE from 'three'
import dat from 'dat.gui'

import { createAmbientLight, createDirectionalLight, createLine, createCube, createStraightLine } from './object-creator'
import { initialize } from './initializer'

var gui = new dat.GUI()
var controls = {
  totalRange: 500,
  anchorDistance: 500,
  showDebug: true,
  generate: () => { generate() }
}

gui.add(controls, 'totalRange', 0, 1000)
gui.add(controls, 'anchorDistance', 0, 1000)
gui.add(controls, 'showDebug').onChange(() => {
  if (controls.showDebug) {
    scene.add(debugObject)
  } else {
    scene.remove(debugObject)
  }
})

gui.add(controls, 'generate')

function getRandomNearby (value, length) {
  return value - (length / 2) + Math.random() * length
}

const scene = initialize()
scene.add(createAmbientLight())
scene.add(createDirectionalLight())

function createPath () {
  var path = new THREE.Path()

  let connectingX = Math.random() * controls.totalRange
  let connectingY = Math.random() * controls.totalRange
  path.moveTo(connectingX, connectingY)

  let anchor2X = getRandomNearby(connectingX, controls.anchorDistance)
  let anchor2Y = getRandomNearby(connectingY, controls.anchorDistance)

  for (let i = 0; i < 5; i++) {
    const previousAnchorX = connectingX + (connectingX - anchor2X)
    const previousAnchorY = connectingY + (connectingY - anchor2Y)

    let nextConnectingX = Math.random() * controls.totalRange
    let nextConnectingY = Math.random() * controls.totalRange

    let nextAnchorX = getRandomNearby(nextConnectingX, controls.anchorDistance)
    let nextAnchorY = getRandomNearby(nextConnectingY, controls.anchorDistance)

    path.bezierCurveTo(
      previousAnchorX,
      previousAnchorY,
      nextAnchorX,
      nextAnchorY,
      nextConnectingX,
      nextConnectingY
    )

    connectingX = nextConnectingX
    connectingY = nextConnectingY
    anchor2X = nextAnchorX
    anchor2Y = nextAnchorY
  }

  return path
}

function createDebugObject (path) {
  const debugObject = new THREE.Object3D()

  let prevV2 = path.curves[0].v0

  path.curves.forEach((curve, index) => {
    debugObject.add(createCube(curve.v0.x, curve.v0.y, 'red'))

    debugObject.add(createCube(curve.v1.x, curve.v1.y, 'red'))
    debugObject.add(createStraightLine(curve.v1.x, curve.v1.y, prevV2.x, prevV2.y, 'red'))
    debugObject.add(createCube(curve.v2.x, curve.v2.y, 'red'))

    if (index === path.curves.length - 1) {
      debugObject.add(createStraightLine(curve.v2.x, curve.v2.y, curve.v3.x, curve.v3.y, 'red'))
    }

    prevV2 = curve.v2
  })

  return debugObject
}

let line = null
let debugObject = null

function generate () {
  scene.remove(line)
  scene.remove(debugObject)

  const path = createPath()
  line = createLine(path)

  debugObject = createDebugObject(path)
  if (controls.showDebug) {
    scene.add(debugObject)
  }

  scene.add(line)
}

generate()
