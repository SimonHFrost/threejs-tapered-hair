import dat from 'dat.gui'

const Ui = (generate, toggleDebug, exportAnimation, autoRotate) => {
  const gui = new dat.GUI()
  const controls = {
    totalRange: 500,
    anchorDistance: 500,
    numPoints: 10,
    toggleDebug: false,
    autoRotate: false,
    generate: generate,
    example: 'simpleExample',
    exportAnimation: exportAnimation
  }

  gui.add(controls, 'totalRange', 0, 1000)
  gui.add(controls, 'anchorDistance', 0, 1000)
  gui.add(controls, 'numPoints', 0, 20)
  gui.add(controls, 'toggleDebug').onChange(toggleDebug)
  gui.add(controls, 'autoRotate').onChange(autoRotate)
  gui.add(controls, 'example', ['simpleExample', 'colorExample', 'lerpExample', 'threeConsistentLines'])
  gui.add(controls, 'generate')
  gui.add(controls, 'exportAnimation')

  return { controls }
}

export default Ui
