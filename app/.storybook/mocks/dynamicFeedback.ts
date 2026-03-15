// Browser-safe mock for app/lib/dynamicFeedback — completely self-contained.

export async function analyzeFeedback(..._args: unknown[]) {
  return {}
}

export async function submitFeedbackAnswers(..._args: unknown[]) {
  return ''
}

export function saveFeedbackDraft(_data: unknown) {}
export function loadFeedbackDraft(_essayId: string) {
  return null
}
export function clearFeedbackDraft(_essayId: string) {}
export function generateFeedbackId(): string {
  return `feedback-${Date.now()}`
}

export async function analyzeSocraticQuestions(..._args: unknown[]) {
  return { highlightedSections: [], socraticData: {} }
}

export async function submitSocraticAnswers(
  essayContent: string,
  _sectionId: string,
  _answers: Record<string, string>,
  _userId?: string,
): Promise<string> {
  return essayContent
}

export function createDummyFeedbackData(..._args: unknown[]) {
  return {}
}
