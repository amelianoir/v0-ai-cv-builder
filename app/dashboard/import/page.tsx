'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, FileUp, Plus } from 'lucide-react'
import { CVImporter } from '@/components/cv-importer'

export default function ImportResumePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-white/10 glass-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </Button>
          <h1 className="text-xl font-bold">Import Existing CV</h1>
          <div className="w-24" />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Options */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Import Option */}
            <div className="glass-card p-8">
              <FileUp className="w-8 h-8 text-primary mb-4" />
              <h2 className="text-xl font-bold mb-2">Upload Your CV</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Import your existing resume. Our AI will parse and reformat it for you.
              </p>
              <CVImporter />
            </div>

            {/* Create New Option */}
            <div className="glass-card p-8 flex flex-col justify-between">
              <div>
                <Plus className="w-8 h-8 text-accent mb-4" />
                <h2 className="text-xl font-bold mb-2">Create from Scratch</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Start with a blank resume and let AI help you build it step by step.
                </p>
              </div>
              <Button asChild className="w-full">
                <Link href="/dashboard/resume">Start Creating</Link>
              </Button>
            </div>
          </div>

          {/* Info Box */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">How it works</h3>
            <ol className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="font-bold text-primary flex-shrink-0">1.</span>
                <span>Upload your CV in PDF, DOCX, or TXT format</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary flex-shrink-0">2.</span>
                <span>Our AI parser extracts your information automatically</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary flex-shrink-0">3.</span>
                <span>Review and edit the extracted content</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary flex-shrink-0">4.</span>
                <span>Choose a template and export as PDF</span>
              </li>
            </ol>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="glass-card p-4">
              <p className="font-semibold text-sm mb-2">Save Time</p>
              <p className="text-xs text-muted-foreground">
                No need to manually re-enter all your information
              </p>
            </div>
            <div className="glass-card p-4">
              <p className="font-semibold text-sm mb-2">AI Enhancement</p>
              <p className="text-xs text-muted-foreground">
                Get suggestions to improve your resume content
              </p>
            </div>
            <div className="glass-card p-4">
              <p className="font-semibold text-sm mb-2">Professional Format</p>
              <p className="text-xs text-muted-foreground">
                Instantly convert to beautifully formatted templates
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
