import * as THREE from 'three'

function getRandomNearby (value, length) {
  return value - (length / 2) + Math.random() * length
}

function createPath (points, anchorDistance) {
  const path = new THREE.Path()

  let connectingX = points[0].x
  let connectingY = points[0].y

  path.moveTo(connectingX, connectingY)

  let anchor2X = getRandomNearby(connectingX, anchorDistance)
  let anchor2Y = getRandomNearby(connectingY, anchorDistance)

  for (let i = 0; i < points.length - 1; i++) {
    const previousAnchorX = connectingX + (connectingX - anchor2X)
    const previousAnchorY = connectingY + (connectingY - anchor2Y)

    let nextConnectingX = points[i + 1].x
    let nextConnectingY = points[i + 1].y

    let nextAnchorX = getRandomNearby(nextConnectingX, anchorDistance)
    let nextAnchorY = getRandomNearby(nextConnectingY, anchorDistance)

    path.bezierCurveTo(
      previousAnchorX,
      previousAnchorY,
      nextAnchorX,
      nextAnchorY,
      nextConnectingX,
      nextConnectingY
    )

    connectingX = nextConnectingX
    connectingY = nextConnectingY
    anchor2X = nextAnchorX
    anchor2Y = nextAnchorY
  }

  return path
}

export {
  createPath
}
