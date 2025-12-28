"use client"
import { JobSwipeScreen } from "@/components/job-swipe-screen"
import { JobProvider } from "@/contexts/job-context"

export default function Home() {
  return (
    <JobProvider>
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
        <JobSwipeScreen />
      </main>
    </JobProvider>
  )
}
