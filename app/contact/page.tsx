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
    <Section spacing="lg">
      <Container>
        <div className="grid gap-24 lg:grid-cols-[1fr_1.2fr] lg:gap-32">
          {/* Left — info */}
          <div>
            <Reveal>
              <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                Get in Touch
              </p>
              <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-[-0.04em]">
                Let&apos;s talk.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-sm text-[15px] leading-[1.85] text-muted sm:text-[16px]">
                Tell us about your challenge. We&apos;ll respond with honesty
                — whether we&apos;re the right fit or not.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-20 space-y-14">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-light">
                    Email
                  </p>
                  <a
                    href="mailto:hello@t-3.in"
                    className="link-underline mt-3 block text-[18px] font-medium transition-colors duration-500 hover:text-accent sm:text-[20px]"
                  >
                    hello@t-3.in
                  </a>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-light">
                    Location
                  </p>
                  <p className="mt-3 text-[15px] text-muted">
                    Bhopal, India
                  </p>
                  <p className="mt-1 text-[13px] text-muted-light">
                    With offices in Delhi NCR & Jaipur
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
  );
}
