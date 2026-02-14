import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const FIGMA_ASSET_VIRTUAL_PREFIX = '\0figma-asset:'

function figmaAssetPlugin() {
  return {
    name: 'vite-plugin-figma-asset',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        return FIGMA_ASSET_VIRTUAL_PREFIX + id
      }
    },
    load(id: string) {
      if (id.startsWith(FIGMA_ASSET_VIRTUAL_PREFIX)) {
        // Resolve to local placeholder when running outside Figma (e.g. local dev).
        // In Figma Make, the runtime provides real figma:asset URLs.
        return `export default "/logo.png"`
      }
    },
  }
}

export default defineConfig({
  plugins: [
    // Resolve figma:asset imports to local placeholder for local dev
    figmaAssetPlugin(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
