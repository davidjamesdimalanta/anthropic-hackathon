import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { userEvent, within, expect, fn } from 'storybook/test'
import ZoomComponent from '../components/ZoomComponent'

const meta: Meta<typeof ZoomComponent> = {
  title: 'Canvas/ZoomComponent',
  component: ZoomComponent,
  args: {
    zoom: 1.0,
    onZoomIn: fn(),
    onZoomOut: fn(),
  },
}

export default meta
type Story = StoryObj<typeof ZoomComponent>

export const Default: Story = {}

export const MinZoom: Story = {
  args: { zoom: 0.15 },
}

export const MaxZoom: Story = {
  args: { zoom: 2.0 },
}

export const Interactions: Story = {
  args: {
    onZoomIn: fn(),
    onZoomOut: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    const zoomInBtn = await canvas.findByRole('button', { name: /zoom in/i })
    const zoomOutBtn = await canvas.findByRole('button', { name: /zoom out/i })

    await userEvent.click(zoomInBtn)
    await expect(args.onZoomIn).toHaveBeenCalledTimes(1)

    await userEvent.click(zoomOutBtn)
    await expect(args.onZoomOut).toHaveBeenCalledTimes(1)
  },
}
