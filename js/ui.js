import dat from 'dat.gui'

const Ui = (generate, toggleDebug) => {
  const gui = new dat.GUI()
  const controls = {
    totalRange: 500,
    anchorDistance: 500,
    numPoints: 5,
    toggleDebug: false,
    generate: () => { generate() }
  }

  gui.add(controls, 'totalRange', 0, 1000)
  gui.add(controls, 'anchorDistance', 0, 1000)
  gui.add(controls, 'numPoints', 0, 20)
  gui.add(controls, 'toggleDebug').onChange(toggleDebug)
  gui.add(controls, 'generate')

  return { controls }
}

export default Ui
