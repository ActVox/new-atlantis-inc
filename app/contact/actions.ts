"use server"

import { Resend } from "resend"
import {
  contactSchema,
  isHoneypotTripped,
  type ContactFieldErrors,
  type ContactState,
} from "@/lib/contact-schema"

/**
 * Delivery target. Kept server-side only so the address never reaches the
 * client bundle or the rendered HTML.
 */
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "info@newatlantis.us"
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "New Atlantis Inc <onboarding@resend.dev>"

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    message: formData.get("message") ?? "",
    company: formData.get("company") ?? "",
  })

  if (!parsed.success) {
    const flattened = parsed.error.flatten().fieldErrors
    const fieldErrors: ContactFieldErrors = {}
    for (const [field, messages] of Object.entries(flattened)) {
      if (messages?.[0]) {
        fieldErrors[field as keyof ContactFieldErrors] = messages[0]
      }
    }

    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors,
    }
  }

  // Drop bot submissions silently: reporting a problem would only teach a bot
  // which field gave it away, and there is no visible field to highlight.
  if (isHoneypotTripped(parsed.data)) {
    console.warn("[contact] Honeypot tripped — submission discarded.")
    return { status: "success" }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set — message not sent.")
    return {
      status: "error",
      message:
        "The contact form is not fully configured yet. Please try again later.",
    }
  }

  const { name, email, message } = parsed.data

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Website enquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        message,
      ].join("\n"),
    })

    if (error) {
      console.error("[contact] Resend rejected the message:", error)
      return {
        status: "error",
        message:
          "We could not send your message just now. Please try again in a moment.",
      }
    }

    return { status: "success" }
  } catch (cause) {
    console.error("[contact] Unexpected failure sending message:", cause)
    return {
      status: "error",
      message:
        "We could not send your message just now. Please try again in a moment.",
    }
  }
}
