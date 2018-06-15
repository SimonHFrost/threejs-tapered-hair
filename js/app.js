const THREE = require('three')

const initialize = require('./initializer.js').initialize
const output = initialize()
const scene = output.scene

const createAmbientLight = require('./object-creator.js').createAmbientLight
const createDirectionalLight = require('./object-creator.js').createDirectionalLight
const createCube = require('./object-creator.js').createCube

function drawPoint(x1, y1, x2, y2, x, y) {
  path.bezierCurveTo(x1, y1, x2, y2, x, y)
  scene.add(createCube(x1, y1, 'green'))
  scene.add(createCube(x2, y2, 'red'))
  scene.add(createCube(x, y, 'blue'))
}

function drawResult() {
  var points = path.getPoints();

  var geometry = new THREE.BufferGeometry().setFromPoints( points );
  var material = new THREE.LineBasicMaterial( { color: 0xffffff } );

  var line = new THREE.Line( geometry, material );
  scene.add( line );

  scene.add(createAmbientLight())
  scene.add(createDirectionalLight())
}

var path = new THREE.Path()

drawPoint( Math.random() * 200, Math.random() * 200, 150, 150, 200, 200 )
drawPoint( 250, 250, Math.random() * 200, Math.random() * 200, 400, 400 )

// Curve is continuous because the relating anchor points form a line between connecting point!
drawResult()
