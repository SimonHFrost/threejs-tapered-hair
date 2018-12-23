import tinycolor from 'tinycolor2'

import { mutateTranslate, mutateRandomizeAnchors, mutateRandomness, mutateRandomizeConnectors, mutateConnectEnds, mutateMatchStart, mutateMatchEnd, mutateShortern, mutateMoveEnd, mutateTaperOff } from './path-mutators'
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

      const first = mutateRandomness(path, 32)
      const second = mutateTaperOff(mutateMoveEnd(mutateShortern(mutateRandomness(path, 32), 0)))
      const third = mutateTaperOff(mutateMoveEnd(mutateShortern(mutateRandomness(path, 32), 1)))

      addPathToScene(first, '#FF9D99')
      addPathToScene(second, '#A8F6FF')
      addPathToScene(third, '#A5D0FF')
    },
    lerpAdd: () => {
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
      let baseColor = tinycolor('#A8F6FF').spin(Math.random() * 360)

      renderLoop.push(() => {
        if (step < 1) {
          addPathToScene(getLerpedPath(fromPaths[0], toPaths[0], step), baseColor.toString())
          addPathToScene(getLerpedPath(fromPaths[1], toPaths[1], step), tinycolor(baseColor.toString()).spin(20 + step * 90).toString())
          addPathToScene(getLerpedPath(fromPaths[2], toPaths[2], step), tinycolor(baseColor.toString()).spin(40 + step * 90).toString())
          addPathToScene(getLerpedPath(fromPaths[3], toPaths[3], step), tinycolor(baseColor.toString()).spin(60 + step * 90).toString())

          step = step + 0.01
        } else {
          removePathsFromScene()
          baseColor = tinycolor('#A8F6FF').spin(Math.random() * 360)
          fromPaths = null
          toPaths = null
          step = 0
        }
      })
    }
  }
}
