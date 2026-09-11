import { describe, it, expect } from "vitest"
import { contactSchema, isHoneypotTripped } from "@/lib/contact-schema"

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "I would like help evaluating a business plan for a new venture.",
  company: "",
}

describe("contactSchema", () => {
  it("accepts a well-formed submission", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })

  it.each([
    ["empty name", { name: "" }],
    ["empty message", { message: "" }],
    ["malformed email", { email: "not-an-email" }],
    ["missing email", { email: "" }],
  ])("rejects %s", (_label, override) => {
    const result = contactSchema.safeParse({ ...valid, ...override })
    expect(result.success).toBe(false)
  })

  it("rejects an oversized message", () => {
    const result = contactSchema.safeParse({
      ...valid,
      message: "x".repeat(5001),
    })
    expect(result.success).toBe(false)
  })

  it("rejects an oversized name", () => {
    const result = contactSchema.safeParse({ ...valid, name: "x".repeat(201) })
    expect(result.success).toBe(false)
  })

  it("treats a missing honeypot as empty", () => {
    const { company: _company, ...withoutHoneypot } = valid
    const result = contactSchema.safeParse(withoutHoneypot)
    expect(result.success && result.data.company).toBe("")
  })

  it("trims surrounding whitespace", () => {
    const result = contactSchema.safeParse({ ...valid, name: "  Ada  " })
    expect(result.success && result.data.name).toBe("Ada")
  })
})

/**
 * The honeypot is checked apart from field validation: a field error on an
 * invisible input would tell a person to "check the highlighted fields" with
 * nothing highlighted.
 */
describe("isHoneypotTripped", () => {
  it("is not tripped by an empty or whitespace-only value", () => {
    expect(isHoneypotTripped({ company: "" })).toBe(false)
    expect(isHoneypotTripped({ company: "   " })).toBe(false)
  })

  it("is tripped by any real content", () => {
    expect(isHoneypotTripped({ company: "http://spam.example" })).toBe(true)
  })

  it("does not make the submission fail schema validation", () => {
    const result = contactSchema.safeParse({ ...valid, company: "bot" })
    expect(result.success).toBe(true)
  })
})
