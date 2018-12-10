import * as THREE from 'three'

function createAmbientLight () {
  return new THREE.AmbientLight(0xEEEEEE, 0.75)
}

function createDirectionalLight () {
  const directionalLight = new THREE.DirectionalLight(0x999999, 0.5)
  directionalLight.position.set(10, 1, 10)
  return directionalLight
}

function createCube (posX, posY, color) {
  const geometry = new THREE.BoxBufferGeometry(5, 5, 5)
  const material = new THREE.MeshLambertMaterial({ color: color, flatShading: true })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = posX
  mesh.position.y = posY
  return mesh
}

function createLineSegment (x1, y1, x2, y2, color) {
  var material = new THREE.LineBasicMaterial({
    color: color
  })

  var geometry = new THREE.Geometry()
  geometry.vertices.push(
    new THREE.Vector3(x1, y1, 0),
    new THREE.Vector3(x2, y2, 0)
  )

  return new THREE.Line(geometry, material)
}

function createLine (path) {
  var points = path.getPoints()

  var geometry = new THREE.BufferGeometry().setFromPoints(points)
  var material = new THREE.LineBasicMaterial({ color: 0xffffff })

  return new THREE.Line(geometry, material)
}

// NOTE We have to save a reference to previous point to draw the next anchor line properly
let oldX = null
let oldY = null

let curveObject = new THREE.Object3D()

function createCurve (scene, path, previousAnchorX, previousAnchorY, nextConnectingX, nextConnectingY, nextAnchorX, nextAnchorY) {
  // NOTE Draw curve. Different ordering of params here!
  path.bezierCurveTo(previousAnchorX, previousAnchorY, nextAnchorX, nextAnchorY, nextConnectingX, nextConnectingY)

  // NOTE First anchor
  curveObject.add(createCube(previousAnchorX, previousAnchorY, 'red'))
  curveObject.add(createLineSegment(oldX, oldY, previousAnchorX, previousAnchorY, 'red'))

  curveObject.add(createCube(nextConnectingX, nextConnectingY, 'blue'))

  // NOTE Second anchor
  curveObject.add(createCube(nextAnchorX, nextAnchorY, 'red'))
  curveObject.add(createLineSegment(nextConnectingX, nextConnectingY, nextAnchorX, nextAnchorY, 'red'))

  scene.add(curveObject)

  oldX = nextAnchorX
  oldY = nextAnchorY

  return path
}

export {
  createAmbientLight,
  createDirectionalLight,
  createCube,
  createLineSegment,
  createLine,
  createCurve
}
