"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Job {
  id: string
  title: string
  company: string
  tags: string[]
  description: string
  eligibility: {
    minCGPA: number
    branches: string[]
  }
  atsScore: number
  missingKeywords: string[]
}

interface JobContextType {
  jobs: Job[]
  currentJobIndex: number
  interestedJobs: Job[]
  appliedJobs: Job[]
  handleSwipe: (direction: "left" | "right") => void
  applyToJob: (job: Job) => void
  currentJob: Job | null
}

const JobContext = createContext<JobContextType | undefined>(undefined)

// Mock job data
const mockJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    company: "TechCorp",
    tags: ["React", "TypeScript", "Remote"],
    description:
      "We are looking for a passionate frontend developer to join our team. You will work on building modern web applications using React and TypeScript. Experience with Next.js and Tailwind CSS is a plus.",
    eligibility: {
      minCGPA: 9.0,
      branches: ["CSE", "IT", "ECE"],
    },
    atsScore: 78,
    missingKeywords: ["Next.js", "Testing", "CI/CD"],
  },
  {
    id: "2",
    title: "Full Stack Developer",
    company: "StartupXYZ",
    tags: ["Node.js", "React", "MongoDB", "Remote"],
    description:
      "Join our fast-paced startup as a full stack developer. You will be responsible for building scalable web applications from scratch. Knowledge of cloud platforms and microservices architecture is preferred.",
    eligibility: {
      minCGPA: 8.5,
      branches: ["CSE", "IT"],
    },
    atsScore: 65,
    missingKeywords: ["AWS", "Docker", "Kubernetes", "GraphQL"],
  },
  {
    id: "3",
    title: "Backend Engineer",
    company: "DataFlow Inc",
    tags: ["Python", "Django", "PostgreSQL", "Hybrid"],
    description:
      "We need a backend engineer to build robust APIs and data processing pipelines. You will work with large datasets and implement efficient database schemas. Experience with Redis and message queues is valuable.",
    eligibility: {
      minCGPA: 7.2,
      branches: ["CSE", "IT", "ECE", "EEE"],
    },
    atsScore: 82,
    missingKeywords: ["Redis", "Message Queues"],
  },
  {
    id: "4",
    title: "Mobile App Developer",
    company: "AppMakers",
    tags: ["React Native", "Mobile", "Firebase", "Remote"],
    description:
      "Build cross-platform mobile applications using React Native. You will collaborate with designers to create intuitive user experiences and integrate with backend services. Knowledge of native iOS/Android development is a bonus.",
    eligibility: {
      minCGPA: 6.8,
      branches: ["CSE", "IT", "ECE"],
    },
    atsScore: 71,
    missingKeywords: ["Swift", "Kotlin", "Push Notifications"],
  },
  {
    id: "5",
    title: "DevOps Intern",
    company: "CloudTech",
    tags: ["AWS", "Docker", "Kubernetes", "Remote"],
    description:
      "Learn and implement modern DevOps practices. You will work on CI/CD pipelines, containerization, and cloud infrastructure. This is a great opportunity to gain hands-on experience with industry-standard tools.",
    eligibility: {
      minCGPA: 7.0,
      branches: ["CSE", "IT"],
    },
    atsScore: 88,
    missingKeywords: ["Terraform", "Ansible"],
  },
  {
    id: "6",
    title: "UI/UX Designer",
    company: "DesignHub",
    tags: ["Figma", "UI/UX", "Web Design", "Hybrid"],
    description:
      "Create beautiful and functional user interfaces. You will conduct user research, create wireframes and prototypes, and work closely with developers to implement designs. Portfolio required.",
    eligibility: {
      minCGPA: 6.5,
      branches: ["CSE", "IT", "Design"],
    },
    atsScore: 75,
    missingKeywords: ["Adobe XD", "User Research", "Prototyping"],
  },
]

export function JobProvider({ children }: { children: ReactNode }) {
  const [jobs] = useState<Job[]>(mockJobs)
  const [currentJobIndex, setCurrentJobIndex] = useState(0)
  const [interestedJobs, setInterestedJobs] = useState<Job[]>([])
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([])

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right" && currentJobIndex < jobs.length) {
      setInterestedJobs([...interestedJobs, jobs[currentJobIndex]])
    }
    setCurrentJobIndex(currentJobIndex + 1)
  }

  const applyToJob = (job: Job) => {
    setAppliedJobs([...appliedJobs, job])
  }

  const currentJob = currentJobIndex < jobs.length ? jobs[currentJobIndex] : null

  return (
    <JobContext.Provider
      value={{
        jobs,
        currentJobIndex,
        interestedJobs,
        appliedJobs,
        handleSwipe,
        applyToJob,
        currentJob,
      }}
    >
      {children}
    </JobContext.Provider>
  )
}

export function useJobs() {
  const context = useContext(JobContext)
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobProvider")
  }
  return context
}
