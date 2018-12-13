import * as THREE from 'three'
import { getRandomNearby, getComplimentaryPosition, createPoints } from './util'

function createPath ({ numPoints, totalRange, anchorDistance }) {
  const curvePath = new THREE.CurvePath()

  const points = createPoints(numPoints, totalRange)

  let connectingX = points[0].x
  let connectingY = points[0].y
  let connectingZ = points[0].z

  let previousSecondAnchorX = getRandomNearby(connectingX, anchorDistance)
  let previousSecondAnchorY = getRandomNearby(connectingY, anchorDistance)
  let previousSecondAnchorZ = getRandomNearby(connectingZ, anchorDistance)

  for (let i = 0; i < points.length - 1; i++) {
    const firstAnchorX = getComplimentaryPosition(previousSecondAnchorX, connectingX)
    const firstAnchorY = getComplimentaryPosition(previousSecondAnchorY, connectingY)
    const firstAnchorZ = getComplimentaryPosition(previousSecondAnchorZ, connectingZ)

    let nextConnectingX = points[i + 1].x
    let nextConnectingY = points[i + 1].y
    let nextConnectingZ = points[i + 1].z

    let secondAnchorX = getRandomNearby(nextConnectingX, anchorDistance)
    let secondAnchorY = getRandomNearby(nextConnectingY, anchorDistance)
    let secondAnchorZ = getRandomNearby(nextConnectingZ, anchorDistance)

    curvePath.add(new THREE.CubicBezierCurve3(
      new THREE.Vector3(connectingX, connectingY, connectingZ),
      new THREE.Vector3(firstAnchorX, firstAnchorY, firstAnchorZ),
      new THREE.Vector3(secondAnchorX, secondAnchorY, secondAnchorZ),
      new THREE.Vector3(nextConnectingX, nextConnectingY, nextConnectingZ)
    ))

    connectingX = nextConnectingX
    connectingY = nextConnectingY
    connectingZ = nextConnectingZ
    previousSecondAnchorX = secondAnchorX
    previousSecondAnchorY = secondAnchorY
    previousSecondAnchorZ = secondAnchorZ
  }

  return curvePath
}

export {
  createPath, getRandomNearby
}
