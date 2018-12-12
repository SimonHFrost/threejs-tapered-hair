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
  // const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 2000)
  const camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.01, 2000)
  camera.position.x = 250
  camera.position.y = 250
  camera.position.z = 1000

  const controls = new OrbitControls(camera)
  controls.target = new THREE.Vector3(250, 250, 0)
  controls.update()
  controls.autoRotate = true

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  }, false)
  return { camera, controls }
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
  const output = createCamera(renderer)
  const camera = output.camera
  const controls = output.controls

  renderLoop.push(() => {
    renderer.render(scene, camera)
  }, () => {
    controls.update()
  })

  return scene
}

export { initialize }
