import * as THREE from 'three'
import { getRandomNearby, getComplimentaryPosition } from './util'

function createPath (points, anchorDistance) {
  const path = new THREE.Path()

  let connectingX = points[0].x
  let connectingY = points[0].y

  path.moveTo(connectingX, connectingY)

  let previousSecondAnchorX = getRandomNearby(connectingX, anchorDistance)
  let previousSecondAnchorY = getRandomNearby(connectingY, anchorDistance)

  for (let i = 0; i < points.length - 1; i++) {
    const firstAnchorX = getComplimentaryPosition(previousSecondAnchorX, connectingX)
    const firstAnchorY = getComplimentaryPosition(previousSecondAnchorY, connectingY)

    let nextConnectingX = points[i + 1].x
    let nextConnectingY = points[i + 1].y

    let secondAnchorX = getRandomNearby(nextConnectingX, anchorDistance)
    let secondAnchorY = getRandomNearby(nextConnectingY, anchorDistance)

    path.bezierCurveTo(
      firstAnchorX,
      firstAnchorY,
      secondAnchorX,
      secondAnchorY,
      nextConnectingX,
      nextConnectingY
    )

    connectingX = nextConnectingX
    connectingY = nextConnectingY
    previousSecondAnchorX = secondAnchorX
    previousSecondAnchorY = secondAnchorY
  }

  return path
}

export {
  createPath, getRandomNearby
}
