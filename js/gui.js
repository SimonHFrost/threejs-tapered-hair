import dat from 'dat.gui'

const Gui = (generate, toggleDebug, exportAnimation, autoRotate) => {
  const gui = new dat.GUI()
  const sessionStorage = window.sessionStorage

  const controls = {
    totalRange: 500,
    anchorDistance: 500,
    numPoints: parseInt(sessionStorage.getItem('numPoints')) || 5,
    toggleDebug: false,
    autoRotate: false,
    generate: generate,
    example: sessionStorage.getItem('selectedExample') || 'simple',
    exportAnimation: exportAnimation
  }

  gui.add(controls, 'totalRange', 0, 1000)
  gui.add(controls, 'anchorDistance', 0, 1000)
  gui.add(controls, 'numPoints', 0, 20).onChange(value => {
    sessionStorage.setItem('numPoints', value)
  })
  gui.add(controls, 'toggleDebug').onChange(toggleDebug)
  gui.add(controls, 'autoRotate').onChange(autoRotate)
  gui.add(controls, 'example', [
    'simple',
    'color',
    'lerp',
    'threeConsistentLines',
    'linesTaperOff'
  ]).onChange(value => {
    sessionStorage.setItem('selectedExample', value)
  })
  gui.add(controls, 'generate')
  gui.add(controls, 'exportAnimation')

  return { controls }
}

export default Gui
