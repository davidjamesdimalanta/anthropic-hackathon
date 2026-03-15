import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ContextMenu } from '../components/ContextMenu'

const meta: Meta<typeof ContextMenu> = {
  title: 'Canvas/ContextMenu',
  component: ContextMenu,
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: 300, width: 400 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    x: 100,
    y: 80,
    onCopy: () => {},
    onPaste: () => {},
    onDelete: () => {},
    isPasteDisabled: false,
    onClose: () => {},
  },
}

export default meta
type Story = StoryObj<typeof ContextMenu>

export const Default: Story = {}

export const WithItems: Story = {
  args: {
    isPasteDisabled: false,
  },
}

export const PasteDisabled: Story = {
  args: {
    isPasteDisabled: true,
  },
}
