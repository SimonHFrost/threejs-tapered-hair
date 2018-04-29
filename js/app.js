const THREE = require('three')

const initialize = require('./initializer.js').initialize
const createAmbientLight = require('./object-creator.js').createAmbientLight
const createDirectionalLight = require('./object-creator.js').createDirectionalLight
const FastSimplexNoise = require('fast-simplex-noise')

const output = initialize()
const scene = output.scene

var path = new THREE.Path();

path.lineTo( 0, 8 );
path.quadraticCurveTo( 0, 10, 2, 10 );
path.lineTo( 10, 10 );

var points = path.getPoints();

var geometry = new THREE.BufferGeometry().setFromPoints( points );
var material = new THREE.LineBasicMaterial( { color: 0xffffff } );

var line = new THREE.Line( geometry, material );
scene.add( line );

scene.add(createAmbientLight())
scene.add(createDirectionalLight())
