import ContactForm from "./contact-form";
import Reveal from "../../components/motion/Reveal";
import Container from "../../components/layout/Container";
import Section from "../../components/layout/Section";

export const metadata = {
  title: "Contact",
  description: "Start a conversation with T3 Technologies.",
};

export default function ContactPage() {
  return (
    <>
      <Section spacing="lg">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            {/* Left — info */}
            <div>
              <Reveal>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                  Contact
                </p>
                <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.08] tracking-[-0.025em]">
                  Let&apos;s talk.
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-sm text-[15px] leading-[1.75] text-muted sm:text-base">
                  Tell us about your challenge. We&apos;ll respond with honesty
                  — whether we&apos;re the right fit or not.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-12 space-y-8">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-light">
                      Email
                    </p>
                    <a
                      href="mailto:hello@t-3.in"
                      className="mt-1.5 block text-[16px] font-medium transition-colors duration-300 hover:text-gold sm:text-[18px]"
                    >
                      hello@t-3.in
                    </a>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-light">
                      Offices
                    </p>
                    <p className="mt-1.5 text-[14px] text-muted sm:text-[15px]">
                      Delhi NCR · Jaipur · Bhopal
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right — form */}
            <div>
              <Reveal delay={0.15}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
