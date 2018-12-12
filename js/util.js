function getRandomNearby (value, length) {
  return value - (length / 2) + Math.random() * length
}

export { getRandomNearby }
