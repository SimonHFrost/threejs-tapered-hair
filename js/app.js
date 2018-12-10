import * as THREE from 'three'
import dat from 'dat.gui'

import { createAmbientLight, createDirectionalLight, convertPathToLine, createDebugObject } from './object-creator'
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

let line = null
let debugObject = null

function generate () {
  scene.remove(line)
  scene.remove(debugObject)

  const path = createPath()
  line = convertPathToLine(path)

  debugObject = createDebugObject(path)
  if (controls.showDebug) {
    scene.add(debugObject)
  }

  scene.add(line)
}

generate()
