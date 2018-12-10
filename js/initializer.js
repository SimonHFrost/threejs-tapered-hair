import * as THREE from 'three'
import ThreejsOrbitControls from 'three-orbit-controls'

const OrbitControls = ThreejsOrbitControls(THREE)

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
  // const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000)
  const camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000)
  camera.position.x = 250
  camera.position.y = 200
  camera.position.z = 50

  const controls = new OrbitControls(camera)
  controls.target = new THREE.Vector3(250, 200, 0)
  controls.update()

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  }, false)
  return camera
}

function createGrid (scene) {
  var horizontalGrid = new THREE.GridHelper(500, 10)
  horizontalGrid.position.x = 250
  scene.add(horizontalGrid)

  var verticalGrid = new THREE.GridHelper(500, 10)
  verticalGrid.position.x = 250
  verticalGrid.position.y = 250
  verticalGrid.rotation.x = Math.PI / 2
  scene.add(verticalGrid)
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
  createGrid(scene)

  renderLoop.push(() => {
    renderer.render(scene, camera)
  })

  return {
    scene,
    camera
  }
}

export { initialize }
