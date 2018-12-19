import { mutateTranslate, mutateRandomizeAnchors, mutateRandomness, mutateRandomizeConnectors, mutateConnectEnds, mutateMatchStart, mutateMatchEnd, mutateShortern, mutateMoveEnd } from './path-mutators'
import { getLerpedPath } from './util'
import { createPath } from './path-creator'

// Warning, this file will likely stay messy. It's art baby!
export default function Examples (controls, renderLoop, addPathToScene, removePathsFromScene, addDebugToScene) {
  return {
    simple: () => {
      const path = createPath(controls)
      addPathToScene(path, '#FF9D99')
      addDebugToScene(path)
    },
    color: () => {
      const path = mutateConnectEnds(createPath(controls))

      addPathToScene(path, '#FF9D99')
      addDebugToScene(path)

      addPathToScene(mutateRandomness(path, 128), '#A8F6FF')
      addPathToScene(mutateRandomness(path, 128), '#A5D0FF')
      addPathToScene(mutateRandomness(path, 128), '#A3A8FF')
      addPathToScene(mutateRandomness(path, 128), '#C3A1FF')
    },
    lerp: () => {
      let step = 0
      const randomness = 64

      function preparePaths () {
        const basePath = mutateConnectEnds(createPath(controls))
        const paths = []

        paths.push(mutateConnectEnds(mutateRandomness(basePath, randomness)))
        paths.push(mutateConnectEnds(mutateRandomness(basePath, randomness)))
        paths.push(mutateConnectEnds(mutateRandomness(basePath, randomness)))
        paths.push(mutateConnectEnds(mutateRandomness(basePath, randomness)))

        return paths
      }

      let fromPaths = preparePaths()
      let toPaths = preparePaths()

      renderLoop.push(() => {
        if (step < 1) {
          removePathsFromScene()

          addPathToScene(getLerpedPath(fromPaths[0], toPaths[0], step), '#A8F6FF')
          addPathToScene(getLerpedPath(fromPaths[1], toPaths[1], step), '#A5D0FF')
          addPathToScene(getLerpedPath(fromPaths[2], toPaths[2], step), '#A3A8FF')
          addPathToScene(getLerpedPath(fromPaths[3], toPaths[3], step), '#C3A1FF')

          step = step + 0.025
        } else {
          fromPaths = toPaths
          toPaths = preparePaths()
          step = 0
        }
      })
    },
    threeConsistentLines: () => {
      const path1 = createPath(controls)
      addDebugToScene(path1)
      const path2 = mutateMatchEnd(mutateMatchStart(mutateRandomness(path1, 64), path1), path1)
      const path3 = mutateMatchEnd(mutateMatchStart(mutateRandomness(path1, 64), path1), path1)

      addPathToScene(path1, '#FF9D99')
      addPathToScene(path2, '#A8F6FF')
      addPathToScene(path3, '#A5D0FF')
    },
    linesTaperOff: () => {
      const path = createPath(controls)

      addPathToScene(path, '#FF9D99')
      addPathToScene(mutateMoveEnd(mutateShortern(mutateRandomness(path, 32), 1)), '#A8F6FF')
      addPathToScene(mutateMoveEnd(mutateShortern(mutateRandomness(path, 32), 2)), '#A5D0FF')
      addPathToScene(mutateMoveEnd(mutateShortern(mutateRandomness(path, 32), 3)), '#A3A8FF')
      addPathToScene(mutateMoveEnd(mutateShortern(mutateRandomness(path, 32), 4)), '#C3A1FF')
      addPathToScene(mutateMoveEnd(mutateShortern(mutateRandomness(path, 32), 5)), '#EA9FFF')
      addPathToScene(mutateMoveEnd(mutateShortern(mutateRandomness(path, 32), 6)), '#FF9DEB')
    }
  }
}
