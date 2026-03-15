import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { ScholarshipBlock } from '../components/ScholarshipBlock'
import { sampleScholarship } from './mocks/contexts'

// requestClaude is a 'use server' function — it's never called in these static stories
// because we pass pre-populated fixture data via args (no edit→save flow is triggered).

const meta: Meta<typeof ScholarshipBlock> = {
  title: 'Canvas/ScholarshipBlock',
  component: ScholarshipBlock,
  parameters: {
    // Prevent real network calls by informing the reader of mock strategy
    docs: {
      description: {
        component:
          '`requestClaude` is mocked via story `play()` — no real API calls are made.',
      },
    },
  },
  args: {
    data: sampleScholarship,
    onUpdate: fn(),
    onDelete: fn(),
    onDraft: fn(),
    onCustomDraft: fn(),
    isGeneratingEssay: false,
  },
}

export default meta
type Story = StoryObj<typeof ScholarshipBlock>

export const Empty: Story = {
  args: {
    data: {
      id: 'scholarship-empty',
      title: 'Gates Scholarship',
      description: 'For exceptional students demonstrating leadership and commitment to STEM.',
      prompt: 'Describe a challenge you overcame and what you learned from it.',
    },
  },
}

export const WithPersonality: Story = {
  args: {
    data: {
      ...sampleScholarship,
      values: undefined,
      weights: undefined,
    },
  },
}

export const FullyAnalyzed: Story = {
  args: {
    data: sampleScholarship,
  },
}

export const GeneratingEssay: Story = {
  args: {
    isGeneratingEssay: true,
  },
}
