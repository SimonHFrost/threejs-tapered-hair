const SAVE = true

const renderToFile = (renderer, renderLoop) => {
  if (SAVE) {
    var capturer = new window.CCapture({
      format: 'webm',
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
      // For some reason it won't save if you stop rendering
      // renderLoop.splice(renderLoop.indexOf(capture))
    }, 1000)
  }
}

export { renderToFile }
