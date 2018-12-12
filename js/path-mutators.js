import { getRandomNearby, getComplimentaryPosition } from './util'

function mutateTranslate (path, units) {
  const clonedPath = path.clone()
  clonedPath.curves.forEach((curve) => {
    curve.v0.y = curve.v0.y + units
    curve.v1.y = curve.v1.y + units
    curve.v2.y = curve.v2.y + units
    curve.v3.y = curve.v3.y + units
  })
  return clonedPath
}

// Shift all anchors and connecting positions by a random amount
function mutateRandomness (path, randomAmount) {
  const clonedPath = path.clone()

  let prev = null
  clonedPath.curves.forEach(curve => {
    if (prev) {
      // Previous curve must connect to current one
      curve.v0.x = prev.v3.x
      curve.v0.y = prev.v3.y
      curve.v1.x = getComplimentaryPosition(prev.v2.x, prev.v3.x)
      curve.v1.y = getComplimentaryPosition(prev.v2.y, prev.v3.y)
    } else {
      curve.v0.x = getRandomNearby(curve.v0.x, randomAmount)
      curve.v0.y = getRandomNearby(curve.v0.y, randomAmount)
      curve.v1.x = getRandomNearby(curve.v1.x, randomAmount)
      curve.v1.y = getRandomNearby(curve.v1.y, randomAmount)
    }

    curve.v2.x = getRandomNearby(curve.v2.x, randomAmount)
    curve.v2.y = getRandomNearby(curve.v2.y, randomAmount)
    curve.v3.x = getRandomNearby(curve.v3.x, randomAmount)
    curve.v3.y = getRandomNearby(curve.v3.y, randomAmount)

    prev = curve
  })
  return clonedPath
}

function mutateRandomizeAnchors (path, randomAmount) {
  const clonedPath = path.clone()

  let prev = null
  clonedPath.curves.forEach(curve => {
    if (prev) {
      curve.v1.x = getComplimentaryPosition(prev.v2.x, prev.v3.x)
      curve.v1.y = getComplimentaryPosition(prev.v2.y, prev.v3.y)
    } else {
      curve.v1.x = getRandomNearby(curve.v1.x, randomAmount)
      curve.v1.y = getRandomNearby(curve.v1.y, randomAmount)
    }

    curve.v2.x = getRandomNearby(curve.v2.x, randomAmount)
    curve.v2.y = getRandomNearby(curve.v2.y, randomAmount)

    prev = curve
  })
  return clonedPath
}

export { mutateTranslate, mutateRandomness, mutateRandomizeAnchors }
