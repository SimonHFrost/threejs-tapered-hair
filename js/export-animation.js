const format = 'gif'

const exportAnimation = (renderer, renderLoop, duration) => {
  const capturer = new window.CCapture({
    format: format,
    workersPath: './node_modules/ccapture.js/src/',
    framerate: 60,
    verbose: true
  })
  capturer.start()

  const capture = () => {
    capturer.capture(renderer.domElement)
  }
  renderLoop.push(capture)

  setTimeout(() => {
    capturer.save()
    // For some reason it won't save if you stop rendering, so cancel it a bit after fishing
    // setTimeout(() => {
      // renderLoop.splice(renderLoop.indexOf(capture))
    // }, 500)
  }, duration)
}

export { exportAnimation }
