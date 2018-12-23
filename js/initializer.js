import * as THREE from 'three'
import ThreejsOrbitControls from 'three-orbit-controls'
import Stats from 'stats.js'

import { createAmbientLight, createDirectionalLight } from './object-creator'

const stats = new Stats()
stats.showPanel(2) // 0: fps, 1: ms, 2: mb
document.body.appendChild(stats.dom)

const OrbitControls = ThreejsOrbitControls(THREE)

function createRenderer () {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  })
  // renderer.setClearColor(0xffffff, 0)
  renderer.setClearColor(0xfff7b0, 1)
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

  const orbitControls = new OrbitControls(camera, renderer.domElement)
  orbitControls.target = new THREE.Vector3(250, 250, 250)
  orbitControls.update()
  orbitControls.autoRotateSpeed = 4

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  }, false)
  return { camera, orbitControls }
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
      stats.begin()
      renderLoop(deltaMsec / 1000, now / 1000)
      stats.end()
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
  const orbitControls = output.orbitControls

  scene.add(createAmbientLight())
  scene.add(createDirectionalLight())

  renderLoop.push(() => {
    renderer.render(scene, camera)
    orbitControls.update()
  })

  return { scene, renderLoop, renderer, orbitControls }
}

export { initialize }
