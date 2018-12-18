import * as THREE from 'three'
import BezierEasing from 'bezier-easing'
var easeInOut = new BezierEasing(0.5, 0, 0.5, 1)

function getRandomNearby (value, length) {
  return value - (length / 2) + Math.random() * length
}

function getComplimentaryPosition (anchorPosition, connectingPosition) {
  return connectingPosition + (connectingPosition - anchorPosition)
}

function createPoints (numPoints, totalRange) {
  const points = []
  for (let i = 0; i < numPoints; i++) {
    points.push({
      x: Math.random() * totalRange,
      y: Math.random() * totalRange,
      z: Math.random() * totalRange
    })
  }
  return points
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

export { getRandomNearby, getComplimentaryPosition, createPoints, getLerpedPath }
