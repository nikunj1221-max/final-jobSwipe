"use client"

import { useState, useRef } from "react"
import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import type { Job } from "@/contexts/job-context"
import { Building2, GraduationCap, Users, CheckCircle2 } from "lucide-react"

interface JobCardProps {
  job: Job
  onCardClick: (job: Job) => void
  onSwipe: (direction: "left" | "right") => void
}

export function JobCard({ job, onCardClick, onSwipe }: JobCardProps) {
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true)
    setDragStart({ x: clientX, y: clientY })
  }

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return
    const deltaX = clientX - dragStart.x
    const deltaY = clientY - dragStart.y
    setDragOffset({ x: deltaX, y: deltaY })
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    const threshold = 100

    if (Math.abs(dragOffset.x) > threshold) {
      const direction = dragOffset.x > 0 ? "right" : "left"
      // Animate out
      if (cardRef.current) {
        cardRef.current.style.transition = "transform 0.3s ease-out"
        cardRef.current.style.transform = `translateX(${direction === "right" ? "500px" : "-500px"}) rotate(${direction === "right" ? "20deg" : "-20deg"})`
      }
      setTimeout(() => {
        onSwipe(direction)
        setDragOffset({ x: 0, y: 0 })
        if (cardRef.current) {
          cardRef.current.style.transition = ""
          cardRef.current.style.transform = ""
        }
      }, 300)
    } else {
      setDragOffset({ x: 0, y: 0 })
    }
  }

  const rotation = dragOffset.x * 0.05
  const opacity = Math.abs(dragOffset.x) / 100

  return (
    <div className="relative w-full max-w-md h-[500px]">
      {/* Swipe indicators */}
      {isDragging && (
        <>
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
            style={{ opacity: dragOffset.x > 0 ? opacity : 0 }}
          >
            <div className="bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 text-white px-6 py-3 rounded-full font-bold text-xl border-4 border-white shadow-2xl rotate-12">
              INTERESTED
            </div>
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
            style={{ opacity: dragOffset.x < 0 ? opacity : 0 }}
          >
            <div className="bg-gradient-to-br from-red-400 via-red-500 to-rose-600 text-white px-6 py-3 rounded-full font-bold text-xl border-4 border-white shadow-2xl -rotate-12">
              SKIP
            </div>
          </div>
        </>
      )}

      <Card
        ref={cardRef}
        className="h-full cursor-grab active:cursor-grabbing shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden relative before:absolute before:inset-0 before:rounded-xl before:p-[3px] before:bg-gradient-to-br before:from-primary/40 before:via-primary/20 before:to-primary/5 before:-z-10"
        style={{
          transform: isDragging
            ? `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotation}deg)`
            : "",
          transition: isDragging ? "none" : "transform 0.3s ease-out",
        }}
        onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
        onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchEnd={handleDragEnd}
        onClick={() => !isDragging && Math.abs(dragOffset.x) < 5 && onCardClick(job)}
      >
        <div className="h-full flex flex-col p-6 bg-gradient-card">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-gradient-to-br from-primary/30 via-primary/15 to-primary/5 rounded-lg shadow-sm">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <span className="font-semibold text-muted-foreground">{job.company}</span>
          </div>

          <h2 className="text-3xl font-bold mb-4 text-balance leading-tight text-gradient">{job.title}</h2>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {job.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="px-3 py-1 bg-gradient-to-br from-secondary to-secondary/80"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-4">{job.description}</p>

          <div className="mt-auto pt-4">
            <div className="bg-gradient-accent rounded-lg p-4 space-y-3 border-2 border-primary/20 shadow-md">
              <h3 className="text-xs font-bold text-white uppercase tracking-wide mb-3">Eligibility Criteria</h3>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-sm bg-white/95 rounded-md p-2.5 shadow-sm">
                  <div className="p-1.5 bg-gradient-to-br from-primary/20 to-primary/5 rounded">
                    <GraduationCap className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-muted-foreground text-xs font-medium">Min CGPA</span>
                  <Badge
                    variant="secondary"
                    className="ml-auto font-bold bg-gradient-to-r from-primary to-primary/80 text-white"
                  >
                    {job.eligibility.minCGPA}
                  </Badge>
                </div>

                <div className="bg-white/95 rounded-md p-2.5 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="p-1.5 bg-gradient-to-br from-primary/20 to-primary/5 rounded">
                      <Users className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-muted-foreground text-xs font-medium">Eligible Branches</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 ml-8">
                    {job.eligibility.branches.map((branch) => (
                      <Badge
                        key={branch}
                        variant="outline"
                        className="text-[10px] px-2 py-0.5 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30"
                      >
                        <CheckCircle2 className="h-2.5 w-2.5 mr-1 text-primary" />
                        {branch}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tap to view details hint */}
          <p className="text-xs text-center text-muted-foreground mt-4">Tap card for details</p>
        </div>
      </Card>
    </div>
  )
}
