import * as THREE from 'three'
import dat from 'dat.gui'

import { initialize } from './initializer'
import { createAmbientLight, createDirectionalLight, convertPathToLine, createDebugObject, createGrid } from './object-creator'
import { createPath } from './path-creator'
import { mutateTranslate, mutateRandomizeAnchors, mutateRandomness, mutateRandomizeConnectors } from './path-mutators'
import { getLerpedPath } from './util'

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

const output = initialize()
const scene = output.scene
const renderLoop = output.renderLoop
scene.add(createAmbientLight())
scene.add(createDirectionalLight())

let addedObjects = []
let addedDebugObjects = []

function addPathToScene (path, color = '#FFFFFF') {
  const line = convertPathToLine(path)
  line.material.color = new THREE.Color(color)
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

function lerpExample () {
  let step = 0

  let fromPath = createPath(controls)
  let fromPaths = []
  fromPaths.push(fromPath)
  fromPaths.push(mutateRandomizeAnchors(fromPath, 64))
  fromPaths.push(mutateRandomizeAnchors(fromPath, 128))

  let toPath = createPath(controls)
  let toPaths = []
  toPaths.push(toPath)
  toPaths.push(mutateRandomizeAnchors(toPath, 64))
  toPaths.push(mutateRandomizeAnchors(toPath, 128))

  renderLoop.push(() => {
    if (step < 1) {
      addedObjects.forEach(addedObject => {
        scene.remove(addedObject)
      })
      addedObjects = []

      fromPaths.forEach((fromPath, index) => {
        const lerpedPath = getLerpedPath(fromPath, toPaths[index], step)
        addPathToScene(lerpedPath, '#FF9DEB')
      })

      step = step + 0.005
    } else {
      fromPaths = []
      fromPath = toPath
      fromPaths.push(fromPath)
      fromPaths.push(toPaths[1])
      fromPaths.push(toPaths[2])

      toPaths = []
      toPath = createPath(controls)
      toPaths.push(toPath)
      toPaths.push(mutateRandomizeAnchors(toPath, 64))
      toPaths.push(mutateRandomizeAnchors(toPath, 128))
      step = 0
    }
  })
}

function colorExample () {
  const path = createPath(controls)

  addPathToScene(path, '#FF9D99')
  addDebugToScene(path)

  addPathToScene(mutateRandomizeAnchors(path, 1), '#A8F6FF')
  addPathToScene(mutateRandomizeAnchors(path, 2), '#A5D0FF')
  addPathToScene(mutateRandomizeAnchors(path, 4), '#A3A8FF')
  addPathToScene(mutateRandomizeAnchors(path, 8), '#C3A1FF')
  addPathToScene(mutateRandomizeAnchors(path, 16), '#EA9FFF')
  addPathToScene(mutateRandomizeAnchors(path, 32), '#FF9DEB')
  addPathToScene(mutateRandomizeAnchors(path, 64), '#FF9BC1')
  addPathToScene(mutateRandomizeAnchors(path, 128), '#FF9D99')
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

  // colorExample()
  lerpExample()
}

generate()
