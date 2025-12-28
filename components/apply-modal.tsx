"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { Badge } from "./ui/badge"
import type { ATSResult } from "@/lib/ats-logic"
import { CheckCircle2, AlertCircle } from "lucide-react"

interface ApplyModalProps {
  atsResult: ATSResult
  companyName: string
  open: boolean
  onClose: () => void
}

export function ApplyModal({ atsResult, companyName, open, onClose }: ApplyModalProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent Match!"
    if (score >= 60) return "Good Match"
    return "Needs Improvement"
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-500" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">Application Submitted!</DialogTitle>
          <DialogDescription className="text-center">Here's your ATS compatibility score</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* ATS Score */}
          <div className="text-center space-y-3">
            <div className={`text-5xl font-bold ${getScoreColor(atsResult.score)}`}>{atsResult.score}%</div>
            <p className="text-sm font-medium text-muted-foreground">{getScoreLabel(atsResult.score)}</p>
            <Progress value={atsResult.score} className="h-3" />
          </div>

          {/* Matched Keywords */}
          {atsResult.matchedKeywords.length > 0 && (
            <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">
                    Matched Keywords ({atsResult.matchedKeywords.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {atsResult.matchedKeywords.slice(0, 10).map((keyword) => (
                      <Badge
                        key={keyword}
                        variant="outline"
                        className="bg-white dark:bg-green-900/50 border-green-300 dark:border-green-700 text-green-900 dark:text-green-100 capitalize"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Missing Keywords */}
          {atsResult.missingKeywords.length > 0 && (
            <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    Keywords to Improve Your Profile
                  </h3>
                  <p className="text-xs text-amber-700 dark:text-amber-300 mb-3">
                    Adding these skills to your resume could improve your match score:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {atsResult.missingKeywords.map((keyword) => (
                      <Badge
                        key={keyword}
                        variant="outline"
                        className="bg-white dark:bg-amber-900/50 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-100 capitalize"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Info Message */}
          <div className="bg-accent/30 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Your application has been submitted to{" "}
              <span className="font-semibold text-foreground">{companyName}</span>. They will review your profile and
              get back to you soon.
            </p>
          </div>

          {/* Action Button */}
          <Button onClick={onClose} className="w-full" size="lg">
            Continue Exploring Jobs
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
