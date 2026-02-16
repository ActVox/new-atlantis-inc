import type { Metadata } from "next"
import { Mail, MapPin } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact - New Atlantis",
  description:
    "Get in touch with New Atlantis for expert business consulting, planning, and strategic analysis.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Page header */}
        <section className="border-b border-border/60 bg-card/40">
          <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
            <p className="text-sm uppercase tracking-widest text-primary mb-4">
              Contact
            </p>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight text-foreground text-balance max-w-2xl">
              Start a conversation with us
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Whether you are starting a new venture or looking to strengthen an existing one, we are here to help.
            </p>
          </div>
        </section>

        {/* Form + sidebar */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-5">
            {/* Form */}
            <div className="md:col-span-3 bg-card border border-border/60 p-8">
              <h2 className="font-serif text-xl text-foreground mb-6">
                Send us a message
              </h2>
              <ContactForm />
            </div>

            {/* Sidebar info */}
            <aside className="md:col-span-2 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-9 h-9 bg-primary/10 text-primary rounded-sm">
                    <Mail className="h-4 w-4" />
                  </div>
                  <h3 className="font-serif text-base text-foreground">Email</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-12">
                  info@newatlantis.us
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-9 h-9 bg-primary/10 text-primary rounded-sm">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <h3 className="font-serif text-base text-foreground">Location</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-12">
                  Serving businesses nationwide
                </p>
              </div>

              <div className="border-t border-border/60 pt-8">
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  {'"Any business venture goes through bumpy roads. We help with a smoother ride."'}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {'— New Atlantis'}
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
