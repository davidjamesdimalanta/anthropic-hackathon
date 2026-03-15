import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { userEvent, within, expect, fn } from 'storybook/test'
import EssayBlock from '../components/EssayBlock'
import { sampleEssay } from './mocks/contexts'

const meta: Meta<typeof EssayBlock> = {
  title: 'Canvas/EssayBlock',
  component: EssayBlock,
  decorators: [
    (Story) => (
      <div style={{ padding: 24, minWidth: 700, position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    data: sampleEssay,
    scholarshipTitle: 'Meridian Excellence Award',
    onUpdate: fn(),
    onDelete: fn(),
    isGenerating: false,
    onGenerateSocraticQuestions: fn(),
  },
}

export default meta
type Story = StoryObj<typeof EssayBlock>

export const Default: Story = {
  args: {
    data: {
      ...sampleEssay,
      highlightedSections: undefined,
      socraticData: undefined,
    },
  },
}

export const WithHighlights: Story = {
  args: {
    data: sampleEssay,
  },
}

export const Generating: Story = {
  args: {
    isGenerating: true,
  },
}

export const ExportButtons: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // The export button (Download icon) should be present
    const exportBtn = await canvas.findByTitle(/export/i)
    await expect(exportBtn).toBeInTheDocument()
  },
}

export const AIFeedbackInteraction: Story = {
  args: {
    data: sampleEssay,
  },
  play: async ({ canvasElement }) => {
    // The essay shows highlights when not in edit mode — wait for the highlighted text
    const canvas = within(canvasElement)
    // Click a highlighted <mark> element to open SocraticPanel
    const marks = canvasElement.querySelectorAll('mark')
    if (marks.length > 0) {
      await userEvent.click(marks[0])
      // After clicking a highlight, the SocraticPanel should appear with a title
      const panelTitle = await canvas.findByText('Opening hook strength')
      await expect(panelTitle).toBeInTheDocument()
    }
  },
}
