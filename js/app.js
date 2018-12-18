import * as THREE from 'three'
import dat from 'dat.gui'
import { MeshLineMaterial } from 'three.meshline'

import { initialize } from './initializer'
import { createAmbientLight, createDirectionalLight, convertPathToLine, createDebugObject, createGrid } from './object-creator'
import { exportAnimation } from './export-animation'
import Examples from './examples'
import Ui from './ui'

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
  if (ui.controls.showDebug) {
    scene.add(debugObject)
  }
}

const gridObject = createGrid()
const toggleDebug = (toggle) => {
  console.log(toggle)
  if (toggle) {
    addedDebugObjects.forEach(debugObject => {
      scene.add(debugObject)
    })
    scene.add(gridObject)
  } else {
    // Should I dispose geometrys here to avoid memory leaks?
    addedDebugObjects.forEach(debugObject => {
      scene.remove(debugObject)
    })
    scene.remove(gridObject)
  }
}

const ui = Ui(generate, toggleDebug)
const myExamples = Examples(ui.controls, addPathToScene, removePathsFromScene, addDebugToScene, renderLoop)

function generate () {
  removePathsFromScene()

  addedDebugObjects.forEach(debugObject => {
    scene.remove(debugObject)
  })
  addedDebugObjects = []

  myExamples.simpleExample()
  // myExamples.colorExample()
  // myExamples.lerpExample()
}

generate()
// exportAnimation(renderer, renderLoop, 1000)
