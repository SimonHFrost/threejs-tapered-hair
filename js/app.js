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

let line = null
let debugObject = null

function generate () {
  const path = createPath(controls)

  scene.remove(line)
  line = convertPathToLine(path)
  scene.add(line)

  scene.remove(debugObject)
  debugObject = createDebugObject(path)
  if (controls.showDebug) {
    scene.add(debugObject)
  }
}

generate()
