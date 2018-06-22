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

function createLineSegment (x1, y1, x2, y2, color) {
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

function createLine (path) {
  var points = path.getPoints();

  var geometry = new THREE.BufferGeometry().setFromPoints( points );
  var material = new THREE.LineBasicMaterial( { color: 0xffffff } );

  return new THREE.Line( geometry, material );
}

// NOTE We have to save a reference to previous point to draw the next anchor line properly
let oldX = null;
let oldY = null;

function createCurve(scene, path, x1, y1, x, y, x2, y2) {
  // NOTE Draw curve. Different ordering of params here!
  path.bezierCurveTo(x1, y1, x2, y2, x, y)

  // NOTE First anchor
  scene.add(createCube(x1, y1, 'red'))
  scene.add(createLineSegment(oldX, oldY, x1, y1, 'red'))

  scene.add(createCube(x, y, 'blue'))

  // NOTE Second anchor
  scene.add(createCube(x2, y2, 'red'))
  scene.add(createLineSegment(x, y, x2, y2, 'red'))

  oldX = x2
  oldY = y2
}

module.exports = {
  createAmbientLight,
  createDirectionalLight,
  createCube,
  createLineSegment,
  createLine,
  createCurve
}
