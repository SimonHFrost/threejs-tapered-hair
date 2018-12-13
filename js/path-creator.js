import * as THREE from 'three'
import { getRandomNearby, getComplimentaryPosition, createPoints } from './util'

function createPath ({ numPoints, totalRange, anchorDistance }) {
  const curvePath = new THREE.CurvePath()

  const points = createPoints(numPoints, totalRange)

  let connectingX = points[0].x
  let connectingY = points[0].y

  let previousSecondAnchorX = getRandomNearby(connectingX, anchorDistance)
  let previousSecondAnchorY = getRandomNearby(connectingY, anchorDistance)

  for (let i = 0; i < points.length - 1; i++) {
    const firstAnchorX = getComplimentaryPosition(previousSecondAnchorX, connectingX)
    const firstAnchorY = getComplimentaryPosition(previousSecondAnchorY, connectingY)

    let nextConnectingX = points[i + 1].x
    let nextConnectingY = points[i + 1].y

    let secondAnchorX = getRandomNearby(nextConnectingX, anchorDistance)
    let secondAnchorY = getRandomNearby(nextConnectingY, anchorDistance)

    curvePath.add(new THREE.CubicBezierCurve3(
      new THREE.Vector3( connectingX, connectingY, Math.random() * 100),
      new THREE.Vector3( firstAnchorX, firstAnchorY, Math.random() * 100),
      new THREE.Vector3( secondAnchorX, secondAnchorY, Math.random() * 100),
      new THREE.Vector3( nextConnectingX, nextConnectingY, Math.random() * 100)
    ))

    connectingX = nextConnectingX
    connectingY = nextConnectingY
    previousSecondAnchorX = secondAnchorX
    previousSecondAnchorY = secondAnchorY
  }

  return curvePath
}

export {
  createPath, getRandomNearby
}
