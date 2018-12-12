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
      y: Math.random() * totalRange
    })
  }
  return points
}

export { getRandomNearby, getComplimentaryPosition, createPoints }
