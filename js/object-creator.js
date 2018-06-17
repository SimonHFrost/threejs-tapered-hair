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

function createLine (x1, y1, x2, y2, color) {
  var material = new THREE.LineBasicMaterial({
	   color: color
  });

  var geometry = new THREE.Geometry();
  geometry.vertices.push(
    new THREE.Vector3( x1, y1, 0 ),
    new THREE.Vector3( x2, y2, 0 )
  );

  return line = new THREE.Line( geometry, material );
}

module.exports = {
  createAmbientLight,
  createDirectionalLight,
  createCube,
  createLine
}
