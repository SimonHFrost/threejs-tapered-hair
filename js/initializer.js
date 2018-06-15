const THREE = require('three')
const OrbitControls = require('three-orbit-controls')(THREE)
const ORBIT_CONTROLS_ENABLED = true

function createRenderer () {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    transparent: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)

  const containerComponent = document.getElementById('webgl')
  if (containerComponent) {
    containerComponent.appendChild(renderer.domElement)
  } else {
    throw new Error('You need to have an element with id \'webgl\'')
  }

  return renderer
}

function createCamera (renderer) {
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000)
  camera.position.z = 150

  camera.lookAt(new THREE.Vector3(0, 0, 0))

  if (ORBIT_CONTROLS_ENABLED) {
    // eslint-disable-next-line no-unused-vars
    const controls = new OrbitControls(camera)
  }

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  }, false)
  return camera
}

function createRenderLoop () {
  const renderLoop = []
  let before = null
  window.requestAnimationFrame(function animate (now) {
    window.requestAnimationFrame(animate)
    before = before || now - 1000 / 60
    const deltaMsec = Math.min(200, now - before)
    before = now
    renderLoop.forEach(renderLoop => {
      renderLoop(deltaMsec / 1000, now / 1000)
    })
  })
  return renderLoop
}

function initialize () {
  const renderer = createRenderer()
  const renderLoop = createRenderLoop()
  const scene = new THREE.Scene()
  const camera = createCamera(renderer)

  var gridHelper = new THREE.GridHelper( 100, 10 );
  scene.add( gridHelper );

  renderLoop.push(() => {
    renderer.render(scene, camera)
  })

  return {
    scene,
    camera
  }
}

module.exports = {
  initialize
}
