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

function createStraightLine (x1, y1, x2, y2, color) {
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

function convertPathToLine (path) {
  var points = path.getPoints(1000)

  var geometry = new THREE.BufferGeometry().setFromPoints(points)
  var material = new THREE.LineBasicMaterial({ color: 0xffffff })

  return new THREE.Line(geometry, material)
}

function createDebugObject (path) {
  const debugObject = new THREE.Object3D()

  let prevV2 = path.curves[0].v0

  path.curves.forEach((curve, index) => {
    debugObject.add(createCube(curve.v0.x, curve.v0.y, 'red'))

    debugObject.add(createCube(curve.v1.x, curve.v1.y, 'red'))
    debugObject.add(createStraightLine(curve.v1.x, curve.v1.y, prevV2.x, prevV2.y, 'red'))
    debugObject.add(createCube(curve.v2.x, curve.v2.y, 'red'))

    if (index === path.curves.length - 1) {
      debugObject.add(createStraightLine(curve.v2.x, curve.v2.y, curve.v3.x, curve.v3.y, 'red'))
    }

    prevV2 = curve.v2
  })

  return debugObject
}

function createGrid () {
  const gridObject = new THREE.Object3D()

  var horizontalGrid = new THREE.GridHelper(500, 10)
  horizontalGrid.position.x = 250
  horizontalGrid.position.y = 250
  gridObject.add(horizontalGrid)

  var verticalGrid = new THREE.GridHelper(500, 10)
  verticalGrid.position.x = 250
  verticalGrid.position.y = 250
  verticalGrid.rotation.x = Math.PI / 2
  gridObject.add(verticalGrid)

  return gridObject
}

export {
  createAmbientLight,
  createDirectionalLight,
  createCube,
  createStraightLine,
  convertPathToLine,
  createDebugObject,
  createGrid
}
