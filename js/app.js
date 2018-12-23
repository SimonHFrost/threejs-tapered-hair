import * as THREE from 'three'
import { MeshLineMaterial } from 'three.meshline'

import { initialize } from './initializer'
import { convertPathToLine, createDebugObject, createGrid } from './object-creator'
import { exportAnimation } from './export-animation'

import Examples from './examples'
import Gui from './gui'

const output = initialize()
const scene = output.scene
const renderLoop = output.renderLoop
const renderer = output.renderer
const orbitControls = output.orbitControls

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
    addedObject.material.dispose()
  })
  addedObjects = []

  addedDebugObjects.forEach(debugObject => {
    scene.remove(debugObject)
    if (debugObject.children) {
      debugObject.children.forEach(child => {
        child.geometry.dispose()
      })
    } else {
      console.warn(`debug object wasn't a three object so didn't do anything`)
    }
  })
}

function addDebugToScene (path) {
  const debugObject = createDebugObject(path)
  addedDebugObjects.push(debugObject)
  if (gui.controls.toggleDebug) {
    scene.add(debugObject)
  }
}

const gridObject = createGrid()
const toggleDebug = (toggle) => {
  if (toggle) {
    addedDebugObjects.forEach(debugObject => {
      scene.add(debugObject)
    })
    scene.add(gridObject)
  } else {
    addedDebugObjects.forEach(debugObject => {
      // Don't dispose of debugObject geometries because we might add them to the scene again
      scene.remove(debugObject)
    })
    scene.remove(gridObject)
  }
}

function doExportAnimation () {
  exportAnimation(renderer, renderLoop, 5000)
}

function autoRotate (toggle) {
  orbitControls.autoRotate = toggle
}

function generate (example) {
  removePathsFromScene()

  addedDebugObjects.forEach(debugObject => {
    scene.remove(debugObject)
  })
  addedDebugObjects = []

  myExamples[gui.controls.example]()
}

const gui = Gui(generate, toggleDebug, doExportAnimation, autoRotate)
const myExamples = Examples(gui.controls, renderLoop, addPathToScene, removePathsFromScene, addDebugToScene)

generate()
