function getRandomNearby (value, length) {
  return value - (length / 2) + Math.random() * length
}

function getComplimentaryPosition (anchorPosition, connectingPosition) {
  return connectingPosition + (connectingPosition - anchorPosition)
}

export { getRandomNearby, getComplimentaryPosition }
