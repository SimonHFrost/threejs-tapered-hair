import { mutateRandomizeAnchors } from './path-mutators'

export default function Examples (controls, createPath, addPathToScene, addDebugToScene) {
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
    }
  }
}
