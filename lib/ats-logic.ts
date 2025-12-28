import type { Job } from "@/contexts/job-context"
import type { StudentProfile } from "./student-profile"

export interface ATSResult {
  score: number
  missingKeywords: string[]
  matchedKeywords: string[]
}

export interface EligibilityCheck {
  cgpaEligible: boolean
  branchEligible: boolean
  overallEligible: boolean
}

/**
 * Check if student meets eligibility criteria for a job
 */
export function checkEligibility(student: StudentProfile, job: Job): EligibilityCheck {
  const cgpaEligible = student.cgpa >= job.eligibility.minCGPA
  const branchEligible = job.eligibility.branches.includes(student.branch)
  const overallEligible = cgpaEligible && branchEligible

  return {
    cgpaEligible,
    branchEligible,
    overallEligible,
  }
}

/**
 * Calculate ATS score based on keyword matching
 * Extracts keywords from job description and compares with student's resume keywords
 */
export function calculateATSScore(student: StudentProfile, job: Job): ATSResult {
  // Extract keywords from job (tags + description words)
  const jobKeywords = new Set<string>()

  // Add job tags
  job.tags.forEach((tag) => jobKeywords.add(tag.toLowerCase()))

  // Extract important keywords from job description
  const descriptionWords = job.description
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 3) // Filter out short words

  // Common important tech/skill keywords patterns
  const importantPatterns = [
    "react",
    "node",
    "python",
    "java",
    "typescript",
    "javascript",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "mongodb",
    "sql",
    "api",
    "rest",
    "graphql",
    "ci/cd",
    "agile",
    "testing",
    "git",
  ]

  descriptionWords.forEach((word) => {
    if (importantPatterns.some((pattern) => word.includes(pattern))) {
      jobKeywords.add(word)
    }
  })

  // Normalize student keywords
  const studentKeywords = new Set([...student.skills, ...student.resumeKeywords].map((k) => k.toLowerCase()))

  // Find matches and missing keywords
  const matchedKeywords: string[] = []
  const missingKeywords: string[] = []

  jobKeywords.forEach((keyword) => {
    const isMatch = Array.from(studentKeywords).some((sk) => sk.includes(keyword) || keyword.includes(sk))

    if (isMatch) {
      matchedKeywords.push(keyword)
    } else {
      missingKeywords.push(keyword)
    }
  })

  // Calculate score (percentage of matched keywords)
  const totalKeywords = jobKeywords.size
  const score = totalKeywords > 0 ? Math.round((matchedKeywords.length / totalKeywords) * 100) : 0

  // Limit missing keywords to top 5 most important
  const topMissingKeywords = missingKeywords.slice(0, 5)

  return {
    score,
    matchedKeywords,
    missingKeywords: topMissingKeywords,
  }
}
