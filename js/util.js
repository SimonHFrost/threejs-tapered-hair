import * as THREE from 'three'
import BezierEasing from 'bezier-easing'
var easing = new BezierEasing(0.4, 0, 0.6, 1)

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

function getLerpedPath (fromPath, toPath, step) {
  const clonedPath = fromPath.clone()

  // Attempt 'ease-in, ease-out' transitioning
  // step = -Math.sin(step * Math.PI * 2) * 0.1 + step
  step = easing(step)

  clonedPath.curves.forEach((curve, index) => {
    curve.v0.x = THREE.Math.lerp(fromPath.curves[index].v0.x, toPath.curves[index].v0.x, step)
    curve.v0.y = THREE.Math.lerp(fromPath.curves[index].v0.y, toPath.curves[index].v0.y, step)
    curve.v0.z = THREE.Math.lerp(fromPath.curves[index].v0.z, toPath.curves[index].v0.z, step)
    curve.v1.x = THREE.Math.lerp(fromPath.curves[index].v1.x, toPath.curves[index].v1.x, step)
    curve.v1.y = THREE.Math.lerp(fromPath.curves[index].v1.y, toPath.curves[index].v1.y, step)
    curve.v1.z = THREE.Math.lerp(fromPath.curves[index].v1.z, toPath.curves[index].v1.z, step)
    curve.v2.x = THREE.Math.lerp(fromPath.curves[index].v2.x, toPath.curves[index].v2.x, step)
    curve.v2.y = THREE.Math.lerp(fromPath.curves[index].v2.y, toPath.curves[index].v2.y, step)
    curve.v2.z = THREE.Math.lerp(fromPath.curves[index].v2.z, toPath.curves[index].v2.z, step)
    curve.v3.x = THREE.Math.lerp(fromPath.curves[index].v3.x, toPath.curves[index].v3.x, step)
    curve.v3.y = THREE.Math.lerp(fromPath.curves[index].v3.y, toPath.curves[index].v3.y, step)
    curve.v3.z = THREE.Math.lerp(fromPath.curves[index].v3.z, toPath.curves[index].v3.z, step)
  })

  return clonedPath
}

export { getRandomNearby, getComplimentaryPosition, createPoints, getLerpedPath }
