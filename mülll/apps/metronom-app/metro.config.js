const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, '../..')

const config = getDefaultConfig(projectRoot)

// Watch all files in the monorepo
config.watchFolders = [workspaceRoot]

// Let Metro know where to resolve packages
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
]

// CRITICAL: Force React to resolve from the app's node_modules to avoid version conflicts
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Force React and React-DOM to resolve from the app's local node_modules
  if (moduleName === 'react' || moduleName === 'react-dom' || moduleName === 'react/jsx-runtime' || moduleName === 'react/jsx-dev-runtime') {
    const reactPath = path.join(projectRoot, 'node_modules', moduleName)
    return {
      filePath: require.resolve(moduleName, {
        paths: [path.join(projectRoot, 'node_modules')]
      }),
      type: 'sourceFile',
    }
  }

  // Default resolution for everything else
  return context.resolveRequest(context, moduleName, platform)
}

module.exports = config
