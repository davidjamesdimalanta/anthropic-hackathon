import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { userEvent, within, expect } from 'storybook/test'
import Cell from '../components/Cell'
import { sampleCell } from './mocks/contexts'

const meta: Meta<typeof Cell> = {
  title: 'Canvas/Cell',
  component: Cell,
  decorators: [
    (Story) => (
      <div className="relative" style={{ width: 300, height: 300 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    cell: sampleCell,
    isDragging: false,
    isSelected: false,
    zoom: 1,
    zIndex: 1,
    onMouseDown: () => {},
    onTextChange: () => {},
    onDelete: () => {},
  },
}

export default meta
type Story = StoryObj<typeof Cell>

export const Default: Story = {}

export const Empty: Story = {
  args: {
    cell: { ...sampleCell, text: '' },
  },
}

export const AllColors: Story = {
  decorators: [
    () => (
      <div className="relative flex gap-4 flex-wrap p-4" style={{ width: 800 }}>
        {(['yellow', 'blue', 'pink', 'green', 'purple', 'orange'] as const).map((color) => (
          <div key={color} className="relative" style={{ width: 192, height: 192 }}>
            <Cell
              cell={{ ...sampleCell, id: `cell-${color}`, color, text: color }}
              isDragging={false}
              isSelected={false}
              zoom={1}
              onMouseDown={() => {}}
              onTextChange={() => {}}
              onDelete={() => {}}
            />
          </div>
        ))}
      </div>
    ),
  ],
}

export const Selected: Story = {
  args: { isSelected: true },
}

export const Dragging: Story = {
  args: { isDragging: true },
}

export const Editing: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // The cell renders a <p> when not editing — double click to enter edit mode
    const cellText = await canvas.findByText(sampleCell.text)
    await userEvent.dblClick(cellText)
    // After double-click a textarea should appear
    const textarea = await canvas.findByRole('textbox')
    await expect(textarea).toBeInTheDocument()
  },
}
