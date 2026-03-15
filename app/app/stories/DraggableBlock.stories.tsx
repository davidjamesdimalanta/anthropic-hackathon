import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import DraggableBlock from '../components/DraggableBlock'

const meta: Meta<typeof DraggableBlock> = {
  title: 'Canvas/DraggableBlock',
  component: DraggableBlock,
  decorators: [
    (Story) => (
      <div className="relative" style={{ width: 600, height: 400 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    id: 'block-1',
    x: 50,
    y: 50,
    isDragging: false,
    isSelected: false,
    zoom: 1,
    zIndex: 1,
    onMouseDown: () => {},
  },
}

export default meta
type Story = StoryObj<typeof DraggableBlock>

export const Default: Story = {
  args: {
    children: (
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md w-48">
        <p className="text-sm text-gray-700">Card content inside DraggableBlock</p>
      </div>
    ),
  },
}

export const Selected: Story = {
  args: {
    isSelected: true,
    zoom: 0.5,
    children: (
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md w-48">
        <p className="text-sm text-gray-700">Selected block — blue outline at zoom 0.5×</p>
      </div>
    ),
  },
}
