import ContactForm from "./contact-form";
import Reveal from "../../components/motion/Reveal";
import Container from "../../components/layout/Container";

export const metadata = {
  title: "Contact",
  description: "Start a conversation with T3 Technologies.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="pb-28 pt-20 sm:pb-36 sm:pt-28 lg:pt-36">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <Reveal>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
                  Get in Touch
                </p>
                <h1 className="mt-5 text-[clamp(2rem,5vw,4rem)] font-extrabold tracking-[-0.03em]">
                  Start a Conversation
                </h1>
                <p className="mt-6 text-[15px] leading-[1.75] text-muted">
                  Tell us about your challenge. We&apos;ll respond with honesty
                  — whether we&apos;re the right fit or not.
                </p>

                <div className="mt-16 space-y-10">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted/60">
                      Email
                    </p>
                    <p className="mt-2 text-[15px] font-semibold">
                      hello@t-3.in
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted/60">
                      Offices
                    </p>
                    <p className="mt-2 text-[15px] font-semibold">
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
        </Container>
      </section>
    </main>
  );
}
