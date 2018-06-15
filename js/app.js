const THREE = require('three')

const initialize = require('./initializer.js').initialize
const createAmbientLight = require('./object-creator.js').createAmbientLight
const createDirectionalLight = require('./object-creator.js').createDirectionalLight

const output = initialize()
const scene = output.scene

var path = new THREE.Path()
path.moveTo(-50, -50)

let previousAnchorX = Math.random() * 50
let previousAnchorY = Math.random() * 50

for (let i = 0; i < 2; i++) {
  let locationX = Math.random() * 50
  let locationY = Math.random() * 50

  let anchorX = Math.random() * 50
  let anchorY = Math.random() * 50

  path.bezierCurveTo( previousAnchorX, previousAnchorY, anchorX, anchorY, locationX, locationY )

  previousAnchorX = anchorX
  previousAnchorY = anchorY
}

var points = path.getPoints();

var geometry = new THREE.BufferGeometry().setFromPoints( points );
var material = new THREE.LineBasicMaterial( { color: 0xffffff } );

var line = new THREE.Line( geometry, material );
scene.add( line );

scene.add(createAmbientLight())
scene.add(createDirectionalLight())
