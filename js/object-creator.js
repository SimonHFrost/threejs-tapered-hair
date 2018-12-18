import * as THREE from 'three'
import { MeshLine, MeshLineMaterial } from 'three.meshline'

function createAmbientLight () {
  return new THREE.AmbientLight(0xEEEEEE, 0.75)
}

function createDirectionalLight () {
  const directionalLight = new THREE.DirectionalLight(0x999999, 0.5)
  directionalLight.position.set(10, 1, 10)
  return directionalLight
}

function createCube (pos, color) {
  const geometry = new THREE.BoxBufferGeometry(5, 5, 5)
  const material = new THREE.MeshLambertMaterial({ color: color, flatShading: true })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(pos.x, pos.y, pos.z)
  return mesh
}

function createStraightLine (v1, v2, color) {
  const material = new THREE.LineBasicMaterial({
    color: color
  })

  const geometry = new THREE.Geometry()
  geometry.vertices.push(
    v1,
    v2
  )

  return new THREE.Line(geometry, material)
}

function convertPathToLine (path) {
  const points = path.getPoints(1000)

  const geometry = new THREE.Geometry()
  points.forEach(point => {
    const v = new THREE.Vector3(point.x, point.y, point.z)
    geometry.vertices.push(v)
  })

  // const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const line = new MeshLine()
  line.setGeometry(geometry)

  const material = new MeshLineMaterial({ color: new THREE.Color(0x000000), lineWidth: 0.01 })

  return new THREE.Mesh(line.geometry, material)
}

function createDebugObject (path) {
  const debugObject = new THREE.Object3D()

  let prevV2 = path.curves[0].v0

  path.curves.forEach((curve, index) => {
    debugObject.add(createCube(curve.v0, 'red'))

    debugObject.add(createCube(curve.v1, 'red'))
    debugObject.add(createStraightLine(curve.v1, prevV2, 'red'))
    debugObject.add(createCube(curve.v2, 'red'))

    if (index === path.curves.length - 1) {
      debugObject.add(createStraightLine(curve.v2, curve.v3, 'red'))
    }

    prevV2 = curve.v2
  })

  return debugObject
}

function createGrid () {
  const gridObject = new THREE.Object3D()

  const horizontalGrid = new THREE.GridHelper(500, 10)
  horizontalGrid.position.x = 250
  horizontalGrid.position.y = 0
  horizontalGrid.position.z = 250
  gridObject.add(horizontalGrid)

  const verticalGrid = new THREE.GridHelper(500, 10)
  verticalGrid.position.x = 250
  verticalGrid.position.y = 250
  verticalGrid.position.z = 0
  verticalGrid.rotation.x = Math.PI / 2
  gridObject.add(verticalGrid)

  const verticalGrid2 = new THREE.GridHelper(500, 10)
  verticalGrid2.position.x = 0
  verticalGrid2.position.y = 250
  verticalGrid2.position.z = 250
  verticalGrid2.rotation.z = Math.PI / 2
  gridObject.add(verticalGrid2)

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
