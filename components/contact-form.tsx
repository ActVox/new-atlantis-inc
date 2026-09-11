"use client"

import { useActionState, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { sendContactMessage } from "@/app/contact/actions"
import type { ContactState } from "@/lib/contact-schema"

const initialState: ContactState = { status: "idle" }

function FieldError({ message }: { message?: string }) {
  if (!message) return null

  return (
    <p className="text-sm text-destructive" role="alert">
      {message}
    </p>
  )
}

/**
 * useActionState has no reset of its own, so "send another message" bumps a
 * counter used as a key — remounting the inner form gives it fresh state.
 */
export function ContactForm() {
  const [mountId, setMountId] = useState(0)

  return (
    <ContactFormFields
      key={mountId}
      onStartOver={() => setMountId((n) => n + 1)}
    />
  )
}

function ContactFormFields({ onStartOver }: { onStartOver: () => void }) {
  const [state, formAction, isPending] = useActionState(
    sendContactMessage,
    initialState,
  )

  // Only a genuine delivery confirmation from the server reaches this branch.
  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle className="h-10 w-10 text-primary mb-4" />
        <h3 className="font-serif text-xl text-foreground mb-2">Message Sent</h3>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
          Thank you for reaching out. We will get back to you as soon as possible.
        </p>
        <button
          type="button"
          onClick={onStartOver}
          className="mt-6 text-sm text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
        >
          Send another message
        </button>
      </div>
    )
  }

  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {state.status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 border border-destructive/40 bg-destructive/10 p-4"
        >
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0 text-destructive" />
          <p className="text-sm text-destructive leading-relaxed">
            {state.message}
          </p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm tracking-wide text-foreground">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter your name"
          required
          maxLength={200}
          aria-invalid={Boolean(fieldErrors?.name)}
          className="bg-background border-border focus-visible:ring-primary"
        />
        <FieldError message={fieldErrors?.name} />
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
          maxLength={320}
          aria-invalid={Boolean(fieldErrors?.email)}
          className="bg-background border-border focus-visible:ring-primary"
        />
        <FieldError message={fieldErrors?.email} />
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
          maxLength={5000}
          aria-invalid={Boolean(fieldErrors?.message)}
          className="bg-background border-border focus-visible:ring-primary resize-none"
        />
        <FieldError message={fieldErrors?.message} />
      </div>

      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="hidden">
        <Label htmlFor="company">Company</Label>
        <Input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 tracking-wider uppercase text-sm"
      >
        {isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Send className="mr-2 h-4 w-4" />
        )}
        {isPending ? "Sending…" : "Send Message"}
      </Button>
    </form>
  )
}
