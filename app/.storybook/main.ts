import type { StorybookConfig } from '@storybook/nextjs-vite'
import path from 'path'
import { fileURLToPath } from 'url'
import type { Plugin } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Absolute path to the app root (where package.json lives)
const appRoot = path.resolve(__dirname, '..')

/**
 * Vite plugin that intercepts module resolution for server-only modules
 * and redirects them to browser-safe mocks.
 *
 * We use a plugin instead of resolve.alias because @storybook/nextjs-vite's
 * preset.js exports its own viteFinal that spreads resolve.alias — user aliases
 * added via mergeConfig get silently overwritten by the preset.
 * A plugin's resolveId hook runs before alias resolution and is never overwritten.
 */
function serverModuleMockPlugin(): Plugin {
  const mockDir = path.resolve(__dirname, 'mocks')

  // Map from resolved absolute path (without extension) → mock file path
  const mocks: Record<string, string> = {
    [path.join(appRoot, 'app/lib/request')]: path.join(mockDir, 'request.ts'),
    [path.join(appRoot, 'app/lib/socratic')]: path.join(mockDir, 'socratic.ts'),
    [path.join(appRoot, 'app/lib/feedback')]: path.join(mockDir, 'feedback.ts'),
    [path.join(appRoot, 'app/lib/dynamicFeedback')]: path.join(mockDir, 'dynamicFeedback.ts'),
    [path.join(appRoot, 'app/context/WhiteboardContext')]: path.join(mockDir, 'WhiteboardContext.tsx'),
  }

  return {
    name: 'storybook-server-module-mocks',
    enforce: 'pre', // run before other plugins (including alias resolution)
    resolveId(source, importer) {
      if (!importer) return null

      // Resolve the import to an absolute path (without extension)
      let resolved: string | null = null

      if (source.startsWith('.')) {
        // Relative import — resolve from importer's directory
        const importerDir = path.dirname(importer)
        resolved = path.resolve(importerDir, source)
        // Strip any extension Vite may have appended
        resolved = resolved.replace(/\.(ts|tsx|js|jsx)$/, '')
      } else if (source.startsWith('@/')) {
        // @/ alias — maps to appRoot
        const rel = source.slice(2) // strip '@/'
        resolved = path.join(appRoot, rel).replace(/\.(ts|tsx|js|jsx)$/, '')
      }

      if (resolved && mocks[resolved]) {
        return mocks[resolved]
      }

      return null
    },
  }
}

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../app/stories/**/*.mdx',
    '../app/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/nextjs-vite',
  staticDirs: ['../public'],
  async viteFinal(config) {
    const { mergeConfig } = await import('vite')
    return mergeConfig(config, {
      plugins: [serverModuleMockPlugin()],
    })
  },
}
export default config
