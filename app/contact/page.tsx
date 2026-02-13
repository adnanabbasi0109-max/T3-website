import ContactForm from "./contact-form";
import Reveal from "../../components/ui/reveal";

export const metadata = {
  title: "Contact",
  description: "Start a conversation with T3 Technologies.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-20 lg:grid-cols-2">
            <Reveal>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
                  Get in Touch
                </p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                  Start a Conversation
                </h1>
                <p className="mt-5 text-[16px] leading-relaxed text-muted">
                  Tell us about your challenge. We&apos;ll respond with honesty
                  — whether we&apos;re the right fit or not.
                </p>

                <div className="mt-14 space-y-8">
                  <div>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
                      Email
                    </p>
                    <p className="mt-2 text-[15px] font-medium">
                      hello@t-3.in
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
                      Offices
                    </p>
                    <p className="mt-2 text-[15px] font-medium">
                      Delhi NCR &middot; Jaipur &middot; Bhopal
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
