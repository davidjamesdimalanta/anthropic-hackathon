'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { mockPersonalityResponse, mockValuesResponse, mockWeightsResponse } from './claudeResponses'

// ────────────────────────────────────────────────────────────
// Fixture data
// ────────────────────────────────────────────────────────────

export const sampleCell = {
  id: 'cell-story-1',
  x: 50,
  y: 50,
  color: 'yellow',
  text: 'My leadership experience at Lincoln Community Center shaped my view of education as a collective right.',
  rotation: -1.5,
}

export const sampleScholarship = {
  id: 'scholarship-story-1',
  title: 'Meridian Excellence Award',
  description:
    'Awarded annually to first-generation college students who demonstrate exceptional academic merit and a sustained commitment to community service.',
  prompt:
    'Describe a challenge you have overcome and explain how it shaped your commitment to your community.',
  personality: mockPersonalityResponse,
  values: mockValuesResponse,
  weights: mockWeightsResponse,
}

export const sampleEssay = {
  id: 'essay-story-1',
  scholarshipId: 'scholarship-story-1',
  content:
    'Growing up in a household where textbooks were shared between siblings, I learned early that education is both a privilege and a responsibility. When I founded the weekend tutoring program at Lincoln Community Center three years ago, I wasn\'t thinking about scholarships—I was thinking about the fourteen students who sat before me each Saturday morning, hungry to learn but lacking resources.',
  maxWordCount: 650,
  highlightedSections: [
    {
      id: 'hl-1',
      startIndex: 0,
      endIndex: 97,
      color: 'amber',
      colorName: 'amber' as const,
      title: 'Opening hook strength',
      explanation: 'Strong personal context — expand this narrative.',
      propertyType: 'personality' as const,
      propertyValue: 'Resilience',
    },
    {
      id: 'hl-2',
      startIndex: 202,
      endIndex: 326,
      color: 'cyan',
      colorName: 'cyan' as const,
      title: 'Community impact evidence',
      explanation: 'Quantify impact further with specific outcomes.',
      propertyType: 'value' as const,
      propertyValue: 'Service',
    },
  ],
  socraticData: {
    'hl-1': [
      {
        id: 'q1',
        text: 'What specific moment made you realize that sharing textbooks was shaping your view of education?',
        answer: '',
      },
    ],
    'hl-2': [
      {
        id: 'q2',
        text: 'Can you name one student whose trajectory changed because of your tutoring program?',
        answer: '',
      },
    ],
  },
}

export const sampleSocraticPanel = {
  id: 'socratic-story-1',
  sectionId: 'hl-1',
  title: 'Opening hook strength',
  explanation: 'Your opening establishes strong personal context. The shared-textbook detail is vivid and specific.',
  questions: [
    {
      id: 'q1',
      text: 'What specific moment made you realize that sharing textbooks was shaping your view of education?',
      answer: '',
      tags: ['personality', 'resilience'],
    },
    {
      id: 'q2',
      text: 'How did that experience influence the way you approached founding the tutoring program?',
      answer: '',
    },
    {
      id: 'q3',
      text: 'If you could distill your leadership philosophy into one sentence, what would it be?',
      answer: 'Leadership is creating space for others to find their own answers.',
      tags: ['value'],
    },
  ],
}

// ────────────────────────────────────────────────────────────
// Mock DarkMode context
// ────────────────────────────────────────────────────────────

interface DarkModeContextType {
  isDarkMode: boolean
  toggleDarkMode: () => void
  isMounted: boolean
}

const MockDarkModeCtx = createContext<DarkModeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
  isMounted: true,
})

export function MockDarkModeProvider({
  children,
  isDarkMode = false,
}: {
  children: ReactNode
  isDarkMode?: boolean
}) {
  const [dark, setDark] = useState(isDarkMode)
  return (
    <MockDarkModeCtx.Provider
      value={{ isDarkMode: dark, toggleDarkMode: () => setDark((d) => !d), isMounted: true }}
    >
      {children}
    </MockDarkModeCtx.Provider>
  )
}

// ────────────────────────────────────────────────────────────
// Mock Editing context
// ────────────────────────────────────────────────────────────

interface EditingContextType {
  isEditing: boolean
  setEditing: (editing: boolean) => void
}

const MockEditingCtx = createContext<EditingContextType>({
  isEditing: false,
  setEditing: () => {},
})

export function MockEditingProvider({ children }: { children: ReactNode }) {
  const [isEditing, setIsEditing] = useState(false)
  const setEditing = useCallback((v: boolean) => setIsEditing(v), [])
  return (
    <MockEditingCtx.Provider value={{ isEditing, setEditing }}>
      {children}
    </MockEditingCtx.Provider>
  )
}

// ────────────────────────────────────────────────────────────
// Mock Whiteboard context
// ────────────────────────────────────────────────────────────

// We need to match the shape exported by WhiteboardContext without importing it
// (which would drag in Supabase/auth dependencies)
const noop = () => {}
const noopAsync = async () => {}

const mockWhiteboardValue = {
  cells: [sampleCell],
  scholarships: [sampleScholarship],
  essays: [sampleEssay],
  jsonOutputs: [],
  feedbackPanels: [],
  blockPositions: [],
  syncStatus: 'idle' as const,
  userProfile: null,
  isFirstTimeUser: false,
  hasCheckedFirstTimeUser: true,
  addCell: () => 'new-cell-id',
  updateCell: noop,
  deleteCell: noop,
  addScholarship: () => 'new-scholarship-id',
  updateScholarship: noop,
  deleteScholarship: noop,
  addEssay: () => 'new-essay-id',
  updateEssay: noop,
  deleteEssay: noop,
  addJsonOutput: () => 'new-json-id',
  deleteJsonOutput: noop,
  addFeedbackPanel: noop,
  updateFeedbackPanel: noop,
  deleteFeedbackPanel: noop,
  updateBlockPosition: noop,
  getBlockPosition: (id: string) => ({ id, x: 100, y: 100 }),
  setUserProfile: noopAsync,
  completeOnboarding: noop,
  clearAll: noop,
}

// We re-export the mock values so stories can override them
export { mockWhiteboardValue }

// ────────────────────────────────────────────────────────────
// AllProviders — global Storybook decorator
// ────────────────────────────────────────────────────────────

export function AllProviders({
  children,
  isDarkMode = false,
}: {
  children: ReactNode
  isDarkMode?: boolean
}) {
  return (
    <MockDarkModeProvider isDarkMode={isDarkMode}>
      <MockEditingProvider>{children}</MockEditingProvider>
    </MockDarkModeProvider>
  )
}
