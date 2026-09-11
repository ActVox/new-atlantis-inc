import { z } from "zod"

/**
 * Contact form validation, shared by the client form and the Server Action.
 *
 * Kept out of `app/contact/actions.ts` because a "use server" module may only
 * export async functions.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(200, "That name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(320, "That email address is too long.")
    .email("Please enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(1, "Please enter a message.")
    .max(5000, "That message is too long."),
  /**
   * Honeypot. Hidden from real users, so anything here means a bot filled it in.
   *
   * Validated separately from the visible fields — see `isHoneypotTripped` —
   * because a field error on an invisible input would tell a person to "check
   * the highlighted fields" with nothing highlighted.
   */
  company: z.string().optional().default(""),
})

export type ContactInput = z.infer<typeof contactSchema>

/** A bot (or an over-eager autofill) put something in the hidden field. */
export function isHoneypotTripped(input: Pick<ContactInput, "company">): boolean {
  return input.company.trim().length > 0
}

/** Per-field messages, keyed by the schema's own field names. */
export type ContactFieldErrors = Partial<Record<keyof ContactInput, string>>

/** Result returned across the Server Action boundary. Never throws. */
export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: ContactFieldErrors }
