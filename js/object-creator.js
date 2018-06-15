const THREE = require('three')

function createAmbientLight () {
  return new THREE.AmbientLight(0xEEEEEE, 0.75)
}

function createDirectionalLight () {
  const directionalLight = new THREE.DirectionalLight(0x999999, 0.5)
  directionalLight.position.set(10, 1, 10)
  return directionalLight
}

function createCube () {
  const geometry = new THREE.BoxBufferGeometry( 1, 1, 1 )
  const material = new THREE.MeshLambertMaterial( { color: 0xED8989, flatShading: true } )
  const mesh = new THREE.Mesh( geometry, material )
  return mesh
}

module.exports = {
  createAmbientLight,
  createDirectionalLight,
  createCube
}
