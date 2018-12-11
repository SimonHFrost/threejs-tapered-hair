import dat from 'dat.gui'

import { initialize } from './initializer'
import { createAmbientLight, createDirectionalLight, convertPathToLine, createDebugObject } from './object-creator'
import { createPath } from './path-creator'
import { movePath } from './path-mutators'

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
  addPathToScene(movePath(path, 5))
  addPathToScene(movePath(path, 10))
  addPathToScene(movePath(path, 20))
  addPathToScene(movePath(path, 50))
  addPathToScene(movePath(path, 100))
}

generate()
