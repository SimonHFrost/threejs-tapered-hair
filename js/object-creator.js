const THREE = require('three')

function createAmbientLight () {
  return new THREE.AmbientLight(0xEEEEEE, 0.75)
}

function createDirectionalLight () {
  const directionalLight = new THREE.DirectionalLight(0x999999, 0.5)
  directionalLight.position.set(10, 1, 10)
  return directionalLight
}

function createCube (posX, posY, color) {
  const geometry = new THREE.BoxBufferGeometry( 5, 5, 5 )
  const material = new THREE.MeshLambertMaterial( { color: color, flatShading: true } )
  const mesh = new THREE.Mesh( geometry, material )
  mesh.position.x = posX
  mesh.position.y = posY
  return mesh
}

module.exports = {
  createAmbientLight,
  createDirectionalLight,
  createCube
}
