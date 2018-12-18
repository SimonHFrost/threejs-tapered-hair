import { mutateRandomizeAnchors, mutateConnectEnds, mutateRandomness } from './path-mutators'
import { getLerpedPath } from './util'
import { createPath } from './path-creator'

export default function Examples (controls, addPathToScene, removePathsFromScene, addDebugToScene, renderLoop) {
  return {
    simpleExample: () => {
      const path = createPath(controls)
      addPathToScene(path, '#FF9D99')
      addDebugToScene(path)
    },
    colorExample: () => {
      const path = createPath(controls)

      addPathToScene(path, '#FF9D99')
      addDebugToScene(path)

      addPathToScene(mutateRandomizeAnchors(path, 1), '#A8F6FF')
      addPathToScene(mutateRandomizeAnchors(path, 2), '#A5D0FF')
      addPathToScene(mutateRandomizeAnchors(path, 4), '#A3A8FF')
      addPathToScene(mutateRandomizeAnchors(path, 8), '#C3A1FF')
      addPathToScene(mutateRandomizeAnchors(path, 16), '#EA9FFF')
      addPathToScene(mutateRandomizeAnchors(path, 32), '#FF9DEB')
      addPathToScene(mutateRandomizeAnchors(path, 64), '#FF9BC1')
      addPathToScene(mutateRandomizeAnchors(path, 128), '#FF9D99')
    },
    lerpExample: () => {
      let step = 0

      const randomness = 64

      let fromPath = mutateConnectEnds(createPath(controls))
      let fromPaths = []
      fromPaths.push(fromPath)
      fromPaths.push(mutateConnectEnds(mutateRandomness(fromPath, randomness)))
      fromPaths.push(mutateConnectEnds(mutateRandomness(fromPath, randomness)))
      fromPaths.push(mutateConnectEnds(mutateRandomness(fromPath, randomness)))
      fromPaths.push(mutateConnectEnds(mutateRandomness(fromPath, randomness)))
      fromPaths.push(mutateConnectEnds(mutateRandomness(fromPath, randomness)))

      let toPath = mutateConnectEnds(createPath(controls))
      let toPaths = []
      toPaths.push(toPath)
      toPaths.push(mutateConnectEnds(mutateRandomness(toPath, randomness)))
      toPaths.push(mutateConnectEnds(mutateRandomness(toPath, randomness)))
      toPaths.push(mutateConnectEnds(mutateRandomness(toPath, randomness)))
      toPaths.push(mutateConnectEnds(mutateRandomness(toPath, randomness)))
      toPaths.push(mutateConnectEnds(mutateRandomness(toPath, randomness)))

      renderLoop.push(() => {
        if (step < 1) {
          removePathsFromScene()

          addPathToScene(getLerpedPath(fromPaths[0], toPaths[0], step), '#A8F6FF')
          addPathToScene(getLerpedPath(fromPaths[1], toPaths[1], step), '#A5D0FF')
          addPathToScene(getLerpedPath(fromPaths[2], toPaths[2], step), '#A3A8FF')
          addPathToScene(getLerpedPath(fromPaths[3], toPaths[3], step), '#C3A1FF')
          addPathToScene(getLerpedPath(fromPaths[4], toPaths[4], step), '#EA9FFF')
          addPathToScene(getLerpedPath(fromPaths[5], toPaths[5], step), '#FF9DEB')

          step = step + 0.025
        } else {
          fromPaths = []
          fromPath = toPath
          fromPaths.push(fromPath)
          fromPaths.push(toPaths[1])
          fromPaths.push(toPaths[2])
          fromPaths.push(toPaths[3])
          fromPaths.push(toPaths[4])
          fromPaths.push(toPaths[5])

          toPaths = []
          toPath = mutateConnectEnds(createPath(controls))
          toPaths.push(toPath)
          toPaths.push(mutateConnectEnds(mutateRandomness(toPath, randomness)))
          toPaths.push(mutateConnectEnds(mutateRandomness(toPath, randomness)))
          toPaths.push(mutateConnectEnds(mutateRandomness(toPath, randomness)))
          toPaths.push(mutateConnectEnds(mutateRandomness(toPath, randomness)))
          toPaths.push(mutateConnectEnds(mutateRandomness(toPath, randomness)))
          step = 0
        }
      })
    }
  }
}
