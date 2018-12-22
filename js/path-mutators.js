import * as THREE from 'three'
import { getRandomNearby, getComplimentaryPosition, getComplimentaryPosition3 } from './util'

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
  return mutateRandomizeAnchors(mutateRandomizeConnectors(path, randomAmount), randomAmount)
}

function mutateRandomizeAnchors (path, randomAmount) {
  const clonedPath = path.clone()

  let prev = null
  clonedPath.curves.forEach(curve => {
    if (prev) {
      curve.v1.x = getComplimentaryPosition(prev.v2.x, prev.v3.x)
      curve.v1.y = getComplimentaryPosition(prev.v2.y, prev.v3.y)
      curve.v1.z = getComplimentaryPosition(prev.v2.z, prev.v3.z)
    } else {
      curve.v1.x = getRandomNearby(curve.v1.x, randomAmount)
      curve.v1.y = getRandomNearby(curve.v1.y, randomAmount)
      curve.v1.z = getRandomNearby(curve.v1.z, randomAmount)
    }

    curve.v2.x = getRandomNearby(curve.v2.x, randomAmount)
    curve.v2.y = getRandomNearby(curve.v2.y, randomAmount)
    curve.v2.z = getRandomNearby(curve.v2.z, randomAmount)

    prev = curve
  })
  return clonedPath
}

function mutateRandomizeConnectors (path, randomAmount) {
  const clonedPath = path.clone()

  let prev = null
  clonedPath.curves.forEach(curve => {
    if (prev) {
      curve.v0.x = prev.v3.x
      curve.v0.y = prev.v3.y
      curve.v0.z = prev.v3.z
      curve.v1.x = getComplimentaryPosition(prev.v2.x, prev.v3.x)
      curve.v1.y = getComplimentaryPosition(prev.v2.y, prev.v3.y)
      curve.v1.z = getComplimentaryPosition(prev.v2.z, prev.v3.z)
    } else {
      curve.v0.x = getRandomNearby(curve.v0.x, randomAmount)
      curve.v0.y = getRandomNearby(curve.v0.y, randomAmount)
      curve.v0.z = getRandomNearby(curve.v0.z, randomAmount)
    }

    curve.v3.x = getRandomNearby(curve.v3.x, randomAmount)
    curve.v3.y = getRandomNearby(curve.v3.y, randomAmount)
    curve.v3.z = getRandomNearby(curve.v3.z, randomAmount)

    prev = curve
  })
  return clonedPath
}

function mutateConnectEnds (path) {
  const clonedPath = path.clone()

  const firstCurve = clonedPath.curves[0]
  const lastCurve = clonedPath.curves[clonedPath.curves.length - 1]

  lastCurve.v3.x = clonedPath.curves[0].v0.x
  lastCurve.v3.y = clonedPath.curves[0].v0.y
  lastCurve.v3.z = clonedPath.curves[0].v0.z

  lastCurve.v2.x = getComplimentaryPosition(firstCurve.v1.x, lastCurve.v3.x)
  lastCurve.v2.y = getComplimentaryPosition(firstCurve.v1.y, lastCurve.v3.y)
  lastCurve.v2.z = getComplimentaryPosition(firstCurve.v1.z, lastCurve.v3.z)

  return clonedPath
}

function mutateMatchStart (path, matchPath) {
  const clonedPath = path.clone()
  clonedPath.curves[0].v0 = matchPath.curves[0].v0
  return clonedPath
}

function mutateMatchEnd (path, matchPath) {
  const clonedPath = path.clone()
  clonedPath.curves[clonedPath.curves.length - 1].v3 = matchPath.curves[matchPath.curves.length - 1].v3
  return clonedPath
}

function mutateShortern (path, num) {
  const clonedPath = path.clone()
  const length = path.curves.length
  clonedPath.curves.splice(length - num, num)
  return clonedPath
}

function mutateMoveEnd (path) {
  const clonedPath = path.clone()

  clonedPath.curves[clonedPath.curves.length - 1].v3 = new THREE.Vector3(
    Math.random() * 500,
    Math.random() * 500,
    Math.random() * 500
  )

  return clonedPath
}

function mutateTaperOff (path) {
  const clonedPath = path.clone()

  const lastPath = clonedPath.curves[clonedPath.curves.length - 1]

  clonedPath.curves[clonedPath.curves.length - 1].v1 = getComplimentaryPosition3(lastPath.v1, lastPath.v0)
  clonedPath.curves[clonedPath.curves.length - 1].v2 = getComplimentaryPosition3(lastPath.v2, lastPath.v0)
  clonedPath.curves[clonedPath.curves.length - 1].v3 = getComplimentaryPosition3(lastPath.v3, lastPath.v0)

  // Fix anchor on previous curve so line is continuous
  clonedPath.curves[clonedPath.curves.length - 2].v2 = getComplimentaryPosition3(lastPath.v1, lastPath.v0)

  return clonedPath
}

export {
  mutateTranslate,
  mutateRandomness,
  mutateRandomizeAnchors,
  mutateRandomizeConnectors,
  mutateConnectEnds,
  mutateMatchStart,
  mutateMatchEnd,
  mutateShortern,
  mutateMoveEnd,
  mutateTaperOff
}
