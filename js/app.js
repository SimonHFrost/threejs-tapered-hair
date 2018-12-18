import * as THREE from 'three'
import dat from 'dat.gui'
import { MeshLineMaterial } from 'three.meshline'

import { initialize } from './initializer'
import { createAmbientLight, createDirectionalLight, convertPathToLine, createDebugObject, createGrid } from './object-creator'
import { createPath } from './path-creator'
import { mutateTranslate, mutateRandomizeAnchors, mutateRandomness, mutateRandomizeConnectors, mutateConnectEnds } from './path-mutators'
import { exportAnimation } from './export-animation'
import Examples from './examples'


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

function removePathsFromScene () {
  addedObjects.forEach(addedObject => {
    scene.remove(addedObject)
    addedObject.geometry.dispose()
  })
  addedObjects = []
}

function addDebugToScene (path) {
  const debugObject = createDebugObject(path)
  addedDebugObjects.push(debugObject)
  if (controls.showDebug) {
    scene.add(debugObject)
  }
}

const myExamples = Examples(controls, createPath, addPathToScene, removePathsFromScene, addDebugToScene, renderLoop)

function generate () {
  removePathsFromScene()

  addedDebugObjects.forEach(debugObject => {
    scene.remove(debugObject)
  })
  addedDebugObjects = []

  // myExamples.colorExample()
  myExamples.lerpExample()
  // myExamples.simpleExample()
}

generate()

// exportAnimation(renderer, renderLoop, 1000)
