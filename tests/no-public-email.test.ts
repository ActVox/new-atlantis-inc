import { describe, it, expect } from "vitest"
import { readdirSync, readFileSync, statSync } from "node:fs"
import path from "node:path"

/**
 * The contact address must never reach the browser — not in rendered markup,
 * not in a client bundle, not in a static asset. It is a delivery target for
 * the contact Server Action and nothing else.
 *
 * Modules carrying the "use server" directive are exempt: Next.js never ships
 * their source to the client, so referencing the address there is exactly where
 * it belongs. Everything else under app/, components/ and public/ is fair game
 * for the crawler and is therefore checked.
 */

const ROOT = path.resolve(__dirname, "..")
const SCANNED_DIRS = ["app", "components", "public"]
const EMAIL = "info@newatlantis.us"

function isServerOnly(contents: string): boolean {
  return /^\s*["']use server["']/.test(contents)
}

function walk(dir: string): string[] {
  const entries = readdirSync(dir)
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry)
    if (statSync(full).isDirectory()) return walk(full)
    return [full]
  })
}

describe("public source does not expose the contact email", () => {
  const files = SCANNED_DIRS.flatMap((dir) => walk(path.join(ROOT, dir))).filter(
    (file) => /\.(tsx?|jsx?|css|txt|json|md)$/.test(file),
  )

  it("scans a meaningful number of files", () => {
    expect(files.length).toBeGreaterThan(10)
  })

  it.each(SCANNED_DIRS)("has no client-reachable address under %s/", (dir) => {
    const offenders = files
      .filter((file) => file.startsWith(path.join(ROOT, dir)))
      .filter((file) => {
        const contents = readFileSync(file, "utf8")
        return contents.includes(EMAIL) && !isServerOnly(contents)
      })
      .map((file) => path.relative(ROOT, file))

    expect(offenders).toEqual([])
  })

  it("keeps the address reachable to the server action that delivers to it", () => {
    const action = readFileSync(
      path.join(ROOT, "app/contact/actions.ts"),
      "utf8",
    )

    expect(isServerOnly(action)).toBe(true)
    expect(action).toContain(EMAIL)
  })
})
