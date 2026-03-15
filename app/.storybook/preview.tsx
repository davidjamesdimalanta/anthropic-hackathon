import type { Preview } from '@storybook/nextjs-vite'
import React from 'react'
import '../app/globals.css'
import { DarkModeProvider } from '../app/context/DarkModeContext'
import { EditingProvider } from '../app/context/EditingContext'

// Global decorator: wrap every story in the real DarkMode + Editing providers.
// WhiteboardContext is NOT included here — stories that need it provide their own mock.
const withProviders = (Story: React.ComponentType) => (
  <DarkModeProvider>
    <EditingProvider>
      <Story />
    </EditingProvider>
  </DarkModeProvider>
)

const preview: Preview = {
  decorators: [withProviders],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
