import * as THREE from 'three'

function getRandomNearby (value, length) {
  return value - (length / 2) + Math.random() * length
}

function createPath ({ totalRange, anchorDistance }) {
  var path = new THREE.Path()

  let connectingX = Math.random() * totalRange
  let connectingY = Math.random() * totalRange
  path.moveTo(connectingX, connectingY)

  let anchor2X = getRandomNearby(connectingX, anchorDistance)
  let anchor2Y = getRandomNearby(connectingY, anchorDistance)

  for (let i = 0; i < 5; i++) {
    const previousAnchorX = connectingX + (connectingX - anchor2X)
    const previousAnchorY = connectingY + (connectingY - anchor2Y)

    let nextConnectingX = Math.random() * totalRange
    let nextConnectingY = Math.random() * totalRange

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
