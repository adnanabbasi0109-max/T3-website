import ContactForm from "./contact-form";
import Reveal from "../../components/motion/Reveal";

export const metadata = {
  title: "Contact",
  description: "Start a conversation with T3 Technologies.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen lg:grid lg:grid-cols-2">
      {/* ── Dark left panel ── */}
      <div className="dark-section relative flex flex-col justify-center overflow-hidden px-8 py-24 sm:px-14 lg:min-h-screen lg:px-20">
        {/* Decorative watermark */}
        <div className="absolute bottom-0 left-0 select-none">
          <span className="font-display text-[15vw] leading-none text-paper/[0.04]">
            T3
          </span>
        </div>

        <div className="relative">
          <Reveal>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-[-0.02em] text-paper">
              Let&apos;s talk.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-sm text-[15px] leading-[1.75] text-paper/50">
              Tell us about your challenge. We&apos;ll respond with honesty
              — whether we&apos;re the right fit or not.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-20 space-y-12">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-paper/30">
                  Email
                </p>
                <a
                  href="mailto:hello@t-3.in"
                  className="mt-2 block text-[clamp(1rem,2vw,1.5rem)] font-light text-paper/70 transition-colors duration-300 hover:text-gold"
                >
                  hello@t-3.in
                </a>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-paper/30">
                  Offices
                </p>
                <p className="mt-2 text-[15px] font-semibold text-paper/70">
                  Delhi NCR &middot; Jaipur &middot; Bhopal
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Light right panel — form ── */}
      <div className="flex items-center justify-center bg-paper px-8 py-24 sm:px-14 lg:px-20">
        <div className="w-full max-w-md">
          <Reveal delay={0.2}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </main>
  );
}
