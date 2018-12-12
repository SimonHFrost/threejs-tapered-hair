import dat from 'dat.gui'

import { initialize } from './initializer'
import { createAmbientLight, createDirectionalLight, convertPathToLine, createDebugObject, createGrid } from './object-creator'
import { createPath } from './path-creator'
import { mutateTranslate, mutateRandomizeAnchors, mutateRandomness, mutateRandomizeConnectors } from './path-mutators'

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
    addedDebugObjects.forEach(debugObject => {
      scene.add(debugObject)
    })
    scene.add(gridObject)
  } else {
    addedDebugObjects.forEach(debugObject => {
      scene.remove(debugObject)
    })
    scene.remove(gridObject)
  }
})
gui.add(controls, 'generate')

const gridObject = createGrid()

const scene = initialize()
scene.add(createAmbientLight())
scene.add(createDirectionalLight())

let addedObjects = []
let addedDebugObjects = []

function addPathToScene (path) {
  const line = convertPathToLine(path)
  scene.add(line)
  addedObjects.push(line)
}

function addDebugToScene (path) {
  const debugObject = createDebugObject(path)
  addedDebugObjects.push(debugObject)
  if (controls.showDebug) {
    scene.add(debugObject)
  }
}

function generate () {
  addedObjects.forEach(addedObject => {
    scene.remove(addedObject)
  })
  addedObjects = []

  addedDebugObjects.forEach(debugObject => {
    scene.remove(debugObject)
  })
  addedDebugObjects = []

  const path = createPath(controls)
  addPathToScene(path)
  addDebugToScene(path)

  addPathToScene(mutateRandomizeConnectors(path, 2))
  addPathToScene(mutateRandomizeConnectors(path, 4))
  addPathToScene(mutateRandomizeConnectors(path, 6))
  addPathToScene(mutateRandomizeConnectors(path, 8))
  addPathToScene(mutateRandomizeConnectors(path, 10))
  addPathToScene(mutateRandomizeConnectors(path, 12))
  addPathToScene(mutateRandomizeConnectors(path, 14))
  addPathToScene(mutateRandomizeConnectors(path, 16))
  addPathToScene(mutateRandomizeConnectors(path, 50))
  addPathToScene(mutateRandomizeConnectors(path, 100))

  const translatedPath = mutateTranslate(path, 500)
  addPathToScene(translatedPath)
  addDebugToScene(translatedPath)

  addPathToScene(mutateRandomizeAnchors(translatedPath, 2))
  addPathToScene(mutateRandomizeAnchors(translatedPath, 4))
  addPathToScene(mutateRandomizeAnchors(translatedPath, 6))
  addPathToScene(mutateRandomizeAnchors(translatedPath, 8))
  addPathToScene(mutateRandomizeAnchors(translatedPath, 10))
  addPathToScene(mutateRandomizeAnchors(translatedPath, 12))
  addPathToScene(mutateRandomizeAnchors(translatedPath, 14))
  addPathToScene(mutateRandomizeAnchors(translatedPath, 16))
  addPathToScene(mutateRandomizeAnchors(translatedPath, 50))
  addPathToScene(mutateRandomizeAnchors(translatedPath, 100))

  const anotherPath = mutateTranslate(path, 1000)
  addPathToScene(anotherPath)
  addDebugToScene(anotherPath)

  addPathToScene(mutateRandomness(anotherPath, 2))
  addPathToScene(mutateRandomness(anotherPath, 4))
  addPathToScene(mutateRandomness(anotherPath, 6))
  addPathToScene(mutateRandomness(anotherPath, 8))
  addPathToScene(mutateRandomness(anotherPath, 10))
  addPathToScene(mutateRandomness(anotherPath, 12))
  addPathToScene(mutateRandomness(anotherPath, 14))
  addPathToScene(mutateRandomness(anotherPath, 16))
  addPathToScene(mutateRandomness(anotherPath, 50))
  addPathToScene(mutateRandomness(anotherPath, 100))
}

generate()
