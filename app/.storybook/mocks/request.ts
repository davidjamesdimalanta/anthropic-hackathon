// Browser-safe mock for app/lib/request.ts
// Completely self-contained — does NOT import from the real module.

export type ClaudeRequestType =
  | 'promptPersonality'
  | 'promptPriority'
  | 'promptValue'
  | 'promptWeights'
  | 'generateDraft'
  | 'processUserProfile'
  | 'analyzeCustomDraft'

export type ClaudeResponse = Record<string, unknown>

export interface IDraftAnalysisData {
  personality?: Record<string, unknown>
  priorities?: Record<string, unknown>
  values?: Record<string, unknown>
  weights?: Record<string, unknown>
  userProfile?: Record<string, unknown>
}

export async function requestClaude<T>(_type: ClaudeRequestType, ..._args: unknown[]): Promise<T> {
  return {} as T
}

export async function generateAllPromptAnalysis(..._args: unknown[]) {
  return {}
}

export async function generateDraftWithAnalysis(..._args: unknown[]) {
  return { draft: '' }
}

export async function processUserProfileWithAI(..._args: unknown[]) {
  return {}
}

export async function analyzeCustomDraftWithAnalysis(..._args: unknown[]) {
  return {}
}

export async function analyzeCustomDraftHighlights(..._args: unknown[]) {
  return {}
}
