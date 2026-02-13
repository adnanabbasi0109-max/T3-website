import ContactForm from "./contact-form";

export const metadata = {
  title: "Contact",
  description: "Start a conversation with T3 Technologies.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Get in Touch
              </p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                Start a Conversation
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
                Tell us about your challenge. We&apos;ll respond with honesty —
                whether we&apos;re the right fit or not.
              </p>

              <div className="mt-12 space-y-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                    Email
                  </p>
                  <p className="mt-1 font-medium">hello@t-3.in</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                    Offices
                  </p>
                  <p className="mt-1 font-medium">
                    Delhi NCR &middot; Jaipur &middot; Bhopal
                  </p>
                </div>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
