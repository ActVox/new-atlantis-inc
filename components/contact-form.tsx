"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Send, CheckCircle } from "lucide-react"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle className="h-10 w-10 text-primary mb-4" />
        <h3 className="font-serif text-xl text-foreground mb-2">Message Sent</h3>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
          Thank you for reaching out. We will get back to you as soon as possible.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm tracking-wide text-foreground">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter your name"
          required
          className="bg-background border-border focus-visible:ring-primary"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm tracking-wide text-foreground">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email address"
          required
          className="bg-background border-border focus-visible:ring-primary"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm tracking-wide text-foreground">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="How can we help you?"
          rows={5}
          required
          className="bg-background border-border focus-visible:ring-primary resize-none"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 tracking-wider uppercase text-sm"
      >
        <Send className="mr-2 h-4 w-4" />
        Send Message
      </Button>
    </form>
  )
}
