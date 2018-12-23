import * as THREE from 'three'
import { getRandomNearby3, getComplimentaryPosition3, createVectors } from './util'

function createPath ({ numPoints, totalRange, anchorDistance }) {
  const curvePath = new THREE.CurvePath()
  const vectors = createVectors(numPoints, totalRange)
  let connecting = vectors[0]
  let previousSecondAnchor = getRandomNearby3(connecting, anchorDistance)

  for (let i = 0; i < vectors.length - 1; i++) {
    const firstAnchor = getComplimentaryPosition3(previousSecondAnchor, connecting)
    let nextConnecting = vectors[i + 1]
    let secondAnchor = getRandomNearby3(nextConnecting, anchorDistance)

    curvePath.add(new THREE.CubicBezierCurve3(
      connecting,
      firstAnchor,
      secondAnchor,
      nextConnecting
    ))

    connecting = nextConnecting
    previousSecondAnchor = secondAnchor
  }

  return curvePath
}

export {
  createPath
}
