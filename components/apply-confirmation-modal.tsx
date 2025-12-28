"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import type { Job } from "@/contexts/job-context"
import type { StudentProfile } from "@/lib/student-profile"
import type { EligibilityCheck } from "@/lib/ats-logic"
import { User, GraduationCap, Users, CheckCircle2, XCircle, Briefcase } from "lucide-react"

interface ApplyConfirmationModalProps {
  job: Job
  student: StudentProfile
  eligibility: EligibilityCheck
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function ApplyConfirmationModal({
  job,
  student,
  eligibility,
  open,
  onClose,
  onConfirm,
}: ApplyConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-balance">Confirm Application</DialogTitle>
          <DialogDescription>Review your profile and eligibility before applying</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Student Profile Summary */}
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-xl p-5 border border-primary/10">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-primary/10 rounded">
                <User className="h-4 w-4 text-primary" />
              </div>
              <h3 className="text-sm font-semibold">Your Profile</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">Name</p>
                  <p className="text-base font-semibold">{student.name}</p>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">CGPA</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-primary">{student.cgpa}</span>
                    <span className="text-xs text-muted-foreground">/ 10.0</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">Branch</p>
                  <p className="text-base font-semibold">{student.branch}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-2">Your Skills</p>
                <div className="flex flex-wrap gap-2">
                  {student.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="bg-accent/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-primary/10 rounded">
                <Briefcase className="h-4 w-4 text-primary" />
              </div>
              <h3 className="text-sm font-semibold">Applying For</h3>
            </div>
            <p className="text-base font-semibold mb-1">{job.title}</p>
            <p className="text-sm text-muted-foreground">{job.company}</p>
          </div>

          {/* Eligibility Check */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded">
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>
              Eligibility Check
            </h3>

            <div className="space-y-2">
              {/* CGPA Check */}
              <div
                className={`rounded-lg p-4 border ${
                  eligibility.cgpaEligible
                    ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        eligibility.cgpaEligible ? "bg-green-100 dark:bg-green-900/50" : "bg-red-100 dark:bg-red-900/50"
                      }`}
                    >
                      <GraduationCap
                        className={`h-5 w-5 ${
                          eligibility.cgpaEligible
                            ? "text-green-600 dark:text-green-500"
                            : "text-red-600 dark:text-red-500"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">CGPA Requirement</p>
                      <p className="text-xs text-muted-foreground">
                        Your CGPA: {student.cgpa} | Required: {job.eligibility.minCGPA}
                      </p>
                    </div>
                  </div>
                  {eligibility.cgpaEligible ? (
                    <Badge className="bg-green-600 text-white hover:bg-green-700">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Eligible
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <XCircle className="h-3 w-3 mr-1" />
                      Not Eligible
                    </Badge>
                  )}
                </div>
              </div>

              {/* Branch Check */}
              <div
                className={`rounded-lg p-4 border ${
                  eligibility.branchEligible
                    ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        eligibility.branchEligible
                          ? "bg-green-100 dark:bg-green-900/50"
                          : "bg-red-100 dark:bg-red-900/50"
                      }`}
                    >
                      <Users
                        className={`h-5 w-5 ${
                          eligibility.branchEligible
                            ? "text-green-600 dark:text-green-500"
                            : "text-red-600 dark:text-red-500"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Branch Requirement</p>
                      <p className="text-xs text-muted-foreground">
                        Your Branch: {student.branch} | Eligible: {job.eligibility.branches.join(", ")}
                      </p>
                    </div>
                  </div>
                  {eligibility.branchEligible ? (
                    <Badge className="bg-green-600 text-white hover:bg-green-700">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Eligible
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <XCircle className="h-3 w-3 mr-1" />
                      Not Eligible
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Warning if not eligible */}
          {!eligibility.overallEligible && (
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <p className="text-sm text-amber-900 dark:text-amber-100">
                <strong>Note:</strong> You do not meet all eligibility criteria. You can still apply, but your
                application may not be considered.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent" size="lg">
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              size="lg"
            >
              Confirm & Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
