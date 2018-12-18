import * as THREE from 'three'
import dat from 'dat.gui'
import { MeshLineMaterial } from 'three.meshline'

import { initialize } from './initializer'
import { createAmbientLight, createDirectionalLight, convertPathToLine, createDebugObject, createGrid } from './object-creator'
import { createPath } from './path-creator'
import { mutateTranslate, mutateRandomizeAnchors, mutateRandomness, mutateRandomizeConnectors, mutateConnectEnds } from './path-mutators'
import { getLerpedPath } from './util'
import { exportAnimation } from './export-animation'

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
const renderer = output.renderer
scene.add(createAmbientLight())
scene.add(createDirectionalLight())

let addedObjects = []
let addedDebugObjects = []

function addPathToScene (path, color = '#FFFFFF') {
  const line = convertPathToLine(path)
  line.material = new MeshLineMaterial({
    color: new THREE.Color(color),
    lineWidth: 0.005
  })
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

function simpleExample () {
  const path = createPath(controls)
  addPathToScene(path, '#FF9D99')
  addDebugToScene(path)
}

function lerpExample () {
  let step = 0

  const randomness = 64

  let fromPath = mutateConnectEnds(createPath(controls))
  let fromPaths = []
  fromPaths.push(fromPath)
  fromPaths.push(mutateConnectEnds(mutateRandomness(fromPath, randomness)))
  fromPaths.push(mutateConnectEnds(mutateRandomness(fromPath, randomness)))
  fromPaths.push(mutateConnectEnds(mutateRandomness(fromPath, randomness)))
  fromPaths.push(mutateConnectEnds(mutateRandomness(fromPath, randomness)))
  fromPaths.push(mutateConnectEnds(mutateRandomness(fromPath, randomness)))

  let toPath = mutateConnectEnds(createPath(controls))
  let toPaths = []
  toPaths.push(toPath)
  toPaths.push(mutateConnectEnds(mutateRandomness(toPath, randomness)))
  toPaths.push(mutateConnectEnds(mutateRandomness(toPath, randomness)))
  toPaths.push(mutateConnectEnds(mutateRandomness(toPath, randomness)))
  toPaths.push(mutateConnectEnds(mutateRandomness(toPath, randomness)))
  toPaths.push(mutateConnectEnds(mutateRandomness(toPath, randomness)))

  renderLoop.push(() => {
    if (step < 1) {
      addedObjects.forEach(addedObject => {
        scene.remove(addedObject)
        addedObject.geometry.dispose()
      })
      addedObjects = []

      addPathToScene(getLerpedPath(fromPaths[0], toPaths[0], step), '#A8F6FF')
      addPathToScene(getLerpedPath(fromPaths[1], toPaths[1], step), '#A5D0FF')
      addPathToScene(getLerpedPath(fromPaths[2], toPaths[2], step), '#A3A8FF')
      addPathToScene(getLerpedPath(fromPaths[3], toPaths[3], step), '#C3A1FF')
      addPathToScene(getLerpedPath(fromPaths[4], toPaths[4], step), '#EA9FFF')
      addPathToScene(getLerpedPath(fromPaths[5], toPaths[5], step), '#FF9DEB')

      step = step + 0.025
    } else {
      fromPaths = []
      fromPath = toPath
      fromPaths.push(fromPath)
      fromPaths.push(toPaths[1])
      fromPaths.push(toPaths[2])
      fromPaths.push(toPaths[3])
      fromPaths.push(toPaths[4])
      fromPaths.push(toPaths[5])

      toPaths = []
      toPath = mutateConnectEnds(createPath(controls))
      toPaths.push(toPath)
      toPaths.push(mutateConnectEnds(mutateRandomness(toPath, randomness)))
      toPaths.push(mutateConnectEnds(mutateRandomness(toPath, randomness)))
      toPaths.push(mutateConnectEnds(mutateRandomness(toPath, randomness)))
      toPaths.push(mutateConnectEnds(mutateRandomness(toPath, randomness)))
      toPaths.push(mutateConnectEnds(mutateRandomness(toPath, randomness)))
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
  // simpleExample()
}

generate()

// exportAnimation(renderer, renderLoop, 1000)
