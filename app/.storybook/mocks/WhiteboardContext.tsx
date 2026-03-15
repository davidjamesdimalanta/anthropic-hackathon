// Browser-safe mock for app/context/WhiteboardContext.tsx
// The real module pulls in syncManager → dbUtils → prisma + request (Anthropic SDK).
// This mock exports identical types and a no-op context/hook so components compile.

import React, { createContext, useContext, ReactNode } from 'react'

// ── Re-export all types (no runtime deps) ────────────────────────────────────

export interface AdaptiveWeightCategory {
  weight: number
  subweights: Record<string, number>
}

export interface CellData {
  id: string
  x: number
  y: number
  color: string
  text: string
  rotation: number
}

export interface ScholarshipData {
  id: string
  title: string
  description: string
  prompt: string
  personality?: Record<string, unknown>
  priorities?: Record<string, unknown>
  values?: Record<string, unknown>
  weights?: Record<string, unknown>
}

export interface HighlightedSection {
  id: string
  startIndex: number
  endIndex: number
  color: string
  title: string
  explanation?: string
  colorName: 'amber' | 'cyan' | 'pink' | 'lime' | 'purple'
  areasOfImprovement?: string[]
  propertyType?: 'personality' | 'value' | 'weight' | 'priority'
  propertyValue?: string
}

export interface SocraticQuestion {
  id: string
  text: string
  answer: string
}

export interface CustomDraftAnalysis {
  overall_alignment_score: number
  personality_alignment: { score: number; matches: string[]; gaps: string[]; suggestions: string[] }
  priorities_alignment: { score: number; well_addressed: string[]; needs_attention: string[]; suggestions: string[] }
  values_alignment: { score: number; demonstrated_values: string[]; missing_values: string[]; suggestions: string[] }
  weights_alignment: { score: number; strong_categories: string[]; weak_categories: string[]; suggestions: string[] }
  key_strengths: string[]
  critical_improvements: string[]
  summary: string
}

export interface EssayData {
  id: string
  scholarshipId: string
  content: string
  maxWordCount?: number
  highlightedSections?: HighlightedSection[]
  socraticData?: Record<string, SocraticQuestion[]>
  customDraftAnalysis?: CustomDraftAnalysis
  lastEditedAt?: number
  isCustomDraft?: boolean
}

export interface BlockPosition {
  id: string
  x: number
  y: number
}

export interface JsonOutputData {
  id: string
  scholarshipId: string
  data: {
    ScholarshipName: string
    ScholarshipDescription: string
    EssayPrompt: string
    Personality?: Record<string, unknown>
    Priorities?: Record<string, unknown>
    Values?: Record<string, unknown>
  }
}

// ── No-op context ─────────────────────────────────────────────────────────────

const noop = () => {}
const noopAsync = async () => {}

const mockContextValue = {
  cells: [] as CellData[],
  scholarships: [] as ScholarshipData[],
  essays: [] as EssayData[],
  jsonOutputs: [] as JsonOutputData[],
  feedbackPanels: [] as unknown[],
  blockPositions: [] as BlockPosition[],
  syncStatus: 'idle' as const,
  userProfile: null,
  isFirstTimeUser: false,
  hasCheckedFirstTimeUser: true,
  addCell: () => 'mock-id',
  updateCell: noop,
  deleteCell: noop,
  addScholarship: () => 'mock-id',
  updateScholarship: noop,
  deleteScholarship: noop,
  addEssay: () => 'mock-id',
  updateEssay: noop,
  deleteEssay: noop,
  addJsonOutput: () => 'mock-id',
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

const WhiteboardContext = createContext(mockContextValue)

export function WhiteboardProvider({ children }: { children: ReactNode }) {
  return (
    <WhiteboardContext.Provider value={mockContextValue}>
      {children}
    </WhiteboardContext.Provider>
  )
}

export function useWhiteboard() {
  return useContext(WhiteboardContext)
}
