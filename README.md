# Job Discovery App

A modern job discovery application with Tinder-style swipe functionality, built with Next.js 16, React 19, and TypeScript.

## Features

- **Tinder-Style Swipe Interface**: Swipe left to skip jobs, swipe right to mark interest
- **Student Profile**: Simulated logged-in student with CGPA, branch, and skills
- **Multi-Step Apply Flow**:
  1. **Apply Confirmation Screen**: Review student profile and check eligibility
  2. **Eligibility Check**: Automatic validation of CGPA and branch requirements
  3. **ATS Processing**: Simulates ATS analysis using keyword matching
  4. **ATS Result Screen**: Displays compatibility score, matched keywords, and missing skills
- **Job Details Modal**: View complete job information before applying
- **Stats Tracking**: Track interested and applied jobs
- **Responsive Design**: Mobile-first with gradient accents and smooth animations

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS v4 with custom gradients
- **Language**: TypeScript
- **State Management**: React Context API
- **Icons**: Lucide React

## Apply Flow

### Step 1: Apply Confirmation
When clicking "Apply Now" on a job, students see:
- **Profile Summary**: Name, CGPA, branch, and skills
- **Job Details**: Position and company
- **Eligibility Check**:
  - CGPA validation with visual badges (Eligible/Not Eligible)
  - Branch validation with visual badges
  - Warning if criteria not met (can still apply)

### Step 2: ATS Processing
The system simulates ATS (Applicant Tracking System) analysis:
- Extracts keywords from job description and required technologies
- Compares with student's resume keywords and skills
- Calculates match percentage based on keyword overlap

### Step 3: ATS Result Screen
Shows comprehensive results:
- **ATS Score**: Percentage with color-coded indicator (green 80+, yellow 60+, red <60)
- **Matched Keywords**: Skills that align with job requirements
- **Missing Keywords**: Top 5 skills to improve profile
- **Next Steps**: Confirmation message and continue exploring

## Student Profile

Located in `lib/student-profile.ts`:

```typescript
export const mockStudentProfile: StudentProfile = {
  name: "Alex Johnson",
  cgpa: 7.8,
  branch: "CSE",
  skills: ["React", "TypeScript", "Node.js", "Python", "MongoDB", "Git"],
  resumeKeywords: [
    "React", "TypeScript", "Node.js", "Python", "MongoDB",
    "REST API", "Git", "Agile", "Problem Solving", "Team Collaboration"
  ]
}
```

## ATS Logic

Located in `lib/ats-logic.ts`:

### Eligibility Check
```typescript
checkEligibility(student, job) // Returns cgpaEligible, branchEligible, overallEligible
```

### ATS Score Calculation
```typescript
calculateATSScore(student, job) // Returns score, matchedKeywords, missingKeywords
```

The algorithm:
1. Extracts keywords from job tags and description
2. Normalizes and compares with student's skills/resume keywords
3. Calculates percentage match
4. Identifies top missing keywords for improvement

## Components

- `JobSwipeScreen`: Main swipe interface with stats
- `JobCard`: Draggable job card with company, title, and tags
- `JobDetailModal`: Full job details view
- `ApplyConfirmationModal`: Profile review and eligibility check
- `ApplyModal`: ATS result display

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## Customization

### Update Student Profile
Edit `lib/student-profile.ts` to change student information:
- Modify CGPA, branch, skills, and resume keywords
- Profile automatically used throughout apply flow

### Add More Jobs
Edit `contexts/job-context.tsx` to add jobs to `mockJobs` array:
- Include eligibility criteria (minCGPA, branches)
- Add relevant tags for ATS matching

### Adjust ATS Logic
Modify `lib/ats-logic.ts` to customize:
- Keyword extraction patterns
- Score calculation algorithm
- Number of missing keywords shown

## Design System

- **Colors**: Purple-to-blue gradients with semantic tokens
- **Typography**: Geist Sans for UI, optimized for readability
- **Components**: Consistent spacing with Tailwind's design scale
- **Animations**: Smooth transitions for swipe gestures

## Notes

- All data is static/mock (no backend required)
- Student is assumed to be logged in
- ATS scoring is simulated based on keyword matching
- No authentication or database integration

---

Built with modern web technologies for a startup-grade experience.
