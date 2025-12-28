"use client"

import { useState } from "react"
import { JobCard } from "./job-card"
import { JobDetailModal } from "./job-detail-modal"
import { useJobs, type Job } from "@/contexts/job-context"
import { Button } from "./ui/button"
import { Briefcase, X, Heart, User } from "lucide-react"
import { studentProfile } from "@/lib/student-profile"
import { Badge } from "./ui/badge"

export function JobSwipeScreen() {
  const { currentJob, interestedJobs, appliedJobs, handleSwipe } = useJobs()
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [showProfile, setShowProfile] = useState(false)

  const handleCardClick = (job: Job) => {
    setSelectedJob(job)
    setShowDetailModal(true)
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="p-4 border-b bg-gradient-to-r from-card via-card to-primary/5 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">JobSwipe</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4 text-primary" />
                  <span className="font-medium">{interestedJobs.length}</span>
                </div>
                <div className="text-muted-foreground">
                  Applied: <span className="font-medium text-foreground">{appliedJobs.length}</span>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-accent hover:opacity-90 transition-all shadow-sm"
                >
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-white hidden sm:inline">{studentProfile.name}</span>
                </button>

                {/* Profile Dropdown */}
                {showProfile && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-card border rounded-lg shadow-lg p-4 z-20">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-accent flex items-center justify-center flex-shrink-0">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg">{studentProfile.name}</h3>
                        <p className="text-sm text-muted-foreground">{studentProfile.email}</p>
                      </div>
                    </div>

                    <div className="space-y-3 border-t pt-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-muted rounded-lg p-2">
                          <p className="text-xs text-muted-foreground">CGPA</p>
                          <p className="font-bold text-lg">{studentProfile.cgpa.toFixed(2)}</p>
                        </div>
                        <div className="bg-muted rounded-lg p-2">
                          <p className="text-xs text-muted-foreground">Branch</p>
                          <p className="font-bold text-sm">{studentProfile.branch}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Skills</p>
                        <div className="flex flex-wrap gap-1">
                          {studentProfile.skills.slice(0, 6).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {studentProfile.skills.length > 6 && (
                            <Badge variant="secondary" className="text-xs">
                              +{studentProfile.skills.length - 6} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {showProfile && <div className="fixed inset-0 z-[5]" onClick={() => setShowProfile(false)} />}

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-4 pb-24">
          <JobCard job={currentJob} onCardClick={handleCardClick} onSwipe={handleSwipe} />
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/95 to-transparent">
          <div className="max-w-md mx-auto flex justify-center gap-6">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full h-16 w-16 border-2 hover:border-destructive hover:bg-gradient-to-br hover:from-red-50 hover:to-rose-100 bg-card shadow-lg transition-all"
              onClick={() => handleSwipe("left")}
            >
              <X className="h-6 w-6 text-destructive" />
            </Button>
            <Button
              size="lg"
              className="rounded-full h-16 w-16 bg-gradient-accent hover:opacity-90 shadow-lg transition-all"
              onClick={() => handleSwipe("right")}
            >
              <Heart className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* Modal - Removed onApply prop, JobDetailModal now handles entire apply flow internally */}
      {selectedJob && (
        <JobDetailModal job={selectedJob} open={showDetailModal} onClose={() => setShowDetailModal(false)} />
      )}
    </>
  )
}
