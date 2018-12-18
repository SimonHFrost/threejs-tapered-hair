import { mutateTranslate, mutateRandomizeAnchors, mutateRandomness, mutateRandomizeConnectors, mutateConnectEnds, mutateMatchStart, mutateMatchEnd, mutateShortern } from './path-mutators'
import { getLerpedPath } from './util'
import { createPath } from './path-creator'

// Warning, this file will likely stay messy. It's art baby!
export default function Examples (controls, addPathToScene, removePathsFromScene, addDebugToScene, renderLoop) {
  return {
    simpleExample: () => {
      const path = createPath(controls)
      addPathToScene(path, '#FF9D99')
      addDebugToScene(path)
    },
    colorExample: () => {
      const path = mutateConnectEnds(createPath(controls))

      addPathToScene(path, '#FF9D99')
      addDebugToScene(path)

      addPathToScene(mutateRandomness(path, 128), '#A8F6FF')
      addPathToScene(mutateRandomness(path, 128), '#A5D0FF')
      addPathToScene(mutateRandomness(path, 128), '#A3A8FF')
      addPathToScene(mutateRandomness(path, 128), '#C3A1FF')
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
    },
    threeConsistentLines: () => {
      const path1 = createPath(controls)
      addDebugToScene(path1)
      const path2 = mutateMatchEnd(mutateMatchStart(mutateRandomness(path1, 128), path1), path1)
      const path3 = mutateMatchEnd(mutateMatchStart(mutateRandomness(path1, 128), path1), path1)

      addPathToScene(path1, '#FF9D99')
      addPathToScene(path2, '#A8F6FF')
      addPathToScene(path3, '#A5D0FF')
    },
    linesTaperOff: () => {
      const path = createPath(controls)

      addPathToScene(path, '#FF9D99')
      addPathToScene(mutateShortern(mutateRandomness(path, 32), 1), '#A8F6FF')
      addPathToScene(mutateShortern(mutateRandomness(path, 32), 2), '#A5D0FF')
    }
  }
}
