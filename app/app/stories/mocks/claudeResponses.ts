// Realistic fixture responses for each AI call type — used in stories to avoid real network calls

export const mockPersonalityResponse = {
  personality_profile: {
    spirit: 'A resilient, community-driven leader who transforms personal adversity into collective progress.',
    toneStyle: 'Authentic and reflective with quiet confidence; balances humility with clear conviction.',
    valuesEmphasized: ['Resilience', 'Community Service', 'Educational Equity'],
    recommendedEssayFocus: 'Highlight the intersection of personal growth and community impact through leadership roles.',
  },
}

export const mockPrioritiesResponse = {
  primaryFocus: 'Academic excellence combined with demonstrated community leadership',
  priorityWeights: {
    academicMerit: 0.4,
    communityLeadership: 0.35,
    financialNeed: 0.15,
    essayQuality: 0.1,
  },
  selectionSignals: ['First-generation college student', 'STEM focus', 'Volunteer hours'],
  successProfile: 'Students who will return value to their communities after graduation.',
}

export const mockValuesResponse = {
  valuesEmphasized: ['Innovation', 'Integrity', 'Service'],
  valueDefinitions: {
    Innovation: 'Creative problem-solving that produces measurable societal benefit.',
    Integrity: 'Consistent ethical behavior even when unobserved.',
    Service: 'Sustained, selfless contribution to community wellbeing.',
  },
  evidencePhrases: [
    'demonstrated commitment to community service',
    'led initiatives that created lasting change',
    'maintained integrity under pressure',
  ],
}

export const mockWeightsResponse = {
  academicExcellence: {
    weight: 0.35,
    subweights: {
      GPA: 0.5,
      courseRigor: 0.3,
      testScores: 0.2,
    },
  },
  leadership: {
    weight: 0.3,
    subweights: {
      communityImpact: 0.6,
      longevity: 0.25,
      scope: 0.15,
    },
  },
  financialNeed: {
    weight: 0.2,
    subweights: {
      householdIncome: 0.7,
      dependents: 0.3,
    },
  },
  essayQuality: {
    weight: 0.15,
    subweights: {
      authenticity: 0.5,
      clarity: 0.3,
      alignment: 0.2,
    },
  },
}

export const mockEssayDraftResponse = {
  draft: `Growing up in a household where textbooks were shared between siblings, I learned early that education is both a privilege and a responsibility. When I founded the weekend tutoring program at Lincoln Community Center three years ago, I wasn't thinking about scholarships or college applications—I was thinking about the fourteen students who sat before me each Saturday morning, hungry to learn but lacking resources.

What started as two hours of help with algebra expanded into something I never anticipated. Parents began attending, asking questions about navigating high school requirements they themselves had never faced. Teachers stopped by, offering to donate supplies. The program grew to serve forty-three students across three grade levels.

This experience taught me that leadership isn't about having answers—it's about creating space for others to find theirs. The Meridian Scholarship's emphasis on community transformation resonates deeply with the work I've done and the work I hope to continue in biomedical engineering, where I aim to develop diagnostic tools accessible to underserved clinics worldwide.

I am not just a student who learned from adversity. I am someone who transformed that adversity into a curriculum for others.`,
}
