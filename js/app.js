import dat from 'dat.gui'

import { initialize } from './initializer'
import { createAmbientLight, createDirectionalLight, convertPathToLine, createDebugObject, createGrid } from './object-creator'
import { createPath } from './path-creator'
import { mutateTranslate, mutateRandomness } from './path-mutators'

var gui = new dat.GUI()
var controls = {
  totalRange: 500,
  anchorDistance: 500,
  numPoints: 5,
  showDebug: false,
  generate: () => { generate() }
}

gui.add(controls, 'totalRange', 0, 1000)
gui.add(controls, 'anchorDistance', 0, 1000)
gui.add(controls, 'numPoints', 0, 20)
gui.add(controls, 'showDebug').onChange(() => {
  if (controls.showDebug) {
    scene.add(debugObject)
    scene.add(gridObject)
  } else {
    scene.remove(debugObject)
    scene.remove(gridObject)
  }
})
gui.add(controls, 'generate')

const gridObject = createGrid()

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
}

function addDebugToScene (path) {
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

  const path = createPath(createPoints(controls.numPoints), controls.anchorDistance)
  addPathToScene(path)
  addDebugToScene(path)

  addPathToScene(mutateRandomness(path, 2))
  addPathToScene(mutateRandomness(path, 4))
  addPathToScene(mutateRandomness(path, 6))
  addPathToScene(mutateRandomness(path, 8))
  addPathToScene(mutateRandomness(path, 10))
  addPathToScene(mutateRandomness(path, 12))
  addPathToScene(mutateRandomness(path, 14))
  addPathToScene(mutateRandomness(path, 16))
  addPathToScene(mutateRandomness(path, 100))
}

generate()
