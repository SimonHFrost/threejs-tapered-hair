import * as THREE from 'three'
import BezierEasing from 'bezier-easing'
const easeInOut = new BezierEasing(0.5, 0, 0.5, 1)

function getRandomNearby (value, length) {
  return value - (length / 2) + Math.random() * length
}

function getRandomNearby3 (vector, length) {
  return new THREE.Vector3(
    vector.x - (length / 2) + Math.random() * length,
    vector.y - (length / 2) + Math.random() * length,
    vector.z - (length / 2) + Math.random() * length
  )
}

function getComplimentaryPosition (anchorPosition, connectingPosition) {
  return connectingPosition + (connectingPosition - anchorPosition)
}

function getComplimentaryPosition3 (anchorPosition, connectingPosition) {
  return new THREE.Vector3(
    connectingPosition.x + (connectingPosition.x - anchorPosition.x),
    connectingPosition.y + (connectingPosition.y - anchorPosition.y),
    connectingPosition.z + (connectingPosition.z - anchorPosition.z)
  )
}

function createVectors (numVectors, totalRange) {
  const vectors = []
  for (let i = 0; i < numVectors; i++) {
    vectors.push(
      new THREE.Vector3(
        Math.random() * totalRange,
        Math.random() * totalRange,
        Math.random() * totalRange
      )
    )
  }
  return vectors
}

function lerpVector3 (v1, v2, step) {
  return new THREE.Vector3(
    THREE.Math.lerp(v1.x, v2.x, step),
    THREE.Math.lerp(v1.y, v2.y, step),
    THREE.Math.lerp(v1.z, v2.z, step)
  )
}

function getLerpedPath (fromPath, toPath, step) {
  const clonedPath = fromPath.clone()

  step = easeInOut(step)

  clonedPath.curves.forEach((curve, index) => {
    curve.v0 = lerpVector3(fromPath.curves[index].v0, toPath.curves[index].v0, step)
    curve.v1 = lerpVector3(fromPath.curves[index].v1, toPath.curves[index].v1, step)
    curve.v2 = lerpVector3(fromPath.curves[index].v2, toPath.curves[index].v2, step)
    curve.v3 = lerpVector3(fromPath.curves[index].v3, toPath.curves[index].v3, step)
  })

  return clonedPath
}

export { getRandomNearby, getRandomNearby3, getComplimentaryPosition, getComplimentaryPosition3, createVectors, getLerpedPath }
