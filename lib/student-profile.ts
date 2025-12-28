export interface StudentProfile {
  name: string
  email: string
  cgpa: number
  branch: string
  skills: string[]
  resumeKeywords: string[]
}

// Mock student profile - simulates a logged-in student
export const mockStudentProfile: StudentProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@university.edu",
  cgpa: 8.5,
  branch: "CSE",
  skills: ["React", "TypeScript", "Node.js", "Python", "MongoDB", "Git"],
  resumeKeywords: [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "MongoDB",
    "REST API",
    "Git",
    "Agile",
    "Problem Solving",
    "Team Collaboration",
  ],
}

export const studentProfile = mockStudentProfile
