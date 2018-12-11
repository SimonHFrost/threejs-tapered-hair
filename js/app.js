import dat from 'dat.gui'

import { initialize } from './initializer'
import { createAmbientLight, createDirectionalLight, convertPathToLine, createDebugObject } from './object-creator'
import { createPath } from './path-creator'

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

const scene = initialize()
scene.add(createAmbientLight())
scene.add(createDirectionalLight())

let addedObjects = []
let debugObject = null

function createPoints (numPoints) {
  const points = []
  for (let i = 0; i < numPoints; i++) {
    points.push({
      x: Math.random() * controls.totalRange,
      y: Math.random() * controls.totalRange
    })
  }
  return points
}

function addPathToScene (path) {
  const line = convertPathToLine(path)
  scene.add(line)
  addedObjects.push(line)

  scene.remove(debugObject)
  debugObject = createDebugObject(path)
  if (controls.showDebug) {
    scene.add(debugObject)
  }
}

function generate () {
  addedObjects.forEach(addedObject => {
    scene.remove(addedObject)
  })
  addedObjects = []

  const path = createPath(createPoints(5), controls.anchorDistance)
  addPathToScene(path)

  const clonedPath = path.clone()
  clonedPath.curves.forEach((curve) => {
    curve.v0.y = curve.v0.y + 20
    curve.v1.y = curve.v1.y + 20
    curve.v2.y = curve.v2.y + 20
    curve.v3.y = curve.v3.y + 20
  })
  addPathToScene(clonedPath)
}

generate()
