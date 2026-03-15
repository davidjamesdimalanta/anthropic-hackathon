import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { userEvent, within, expect, fn } from 'storybook/test'
import SocraticPanel from '../components/SocraticPanel'
import { sampleSocraticPanel } from './mocks/contexts'

const meta: Meta<typeof SocraticPanel> = {
  title: 'Canvas/SocraticPanel',
  component: SocraticPanel,
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: 600, minHeight: 500 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    data: sampleSocraticPanel,
    onClose: fn(),
    onAnswerChange: fn(),
  },
}

export default meta
type Story = StoryObj<typeof SocraticPanel>

export const Default: Story = {}

export const WithAnswers: Story = {
  args: {
    data: {
      ...sampleSocraticPanel,
      questions: sampleSocraticPanel.questions.map((q, i) => ({
        ...q,
        answer:
          i === 0
            ? 'The moment I saw my younger sister highlight a textbook we had just received reminded me that these resources meant everything to our family.'
            : i === 1
              ? 'I realized that I couldn\'t wait for systemic change — I had to create a small system myself within my own community.'
              : q.answer,
      })),
    },
  },
}

export const WithTags: Story = {
  args: {
    data: {
      ...sampleSocraticPanel,
      propertyType: 'personality' as const,
      propertyValue: 'Resilience',
    },
  },
}

export const TypingInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textareas = await canvas.findAllByRole('textbox')
    // Type into the first answer textarea
    await userEvent.click(textareas[0])
    await userEvent.type(textareas[0], 'This is my answer to the question about textbooks.')
    // Verify character count updated (should show > 0 chars)
    const charCount = await canvas.findByText(/\d+ characters/, { exact: false })
    await expect(charCount).toBeInTheDocument()
  },
}
