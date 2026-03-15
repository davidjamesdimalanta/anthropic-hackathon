// Browser-safe mock for app/lib/feedback.ts

export async function analyzeFeedback(..._args: unknown[]) {
  return {}
}

export async function submitFeedback(essayContent: string, ..._args: unknown[]) {
  return essayContent
}
