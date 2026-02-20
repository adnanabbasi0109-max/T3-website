import { useState } from 'react';
import { motion } from 'motion/react';
import { SectionHeader } from '../components/SectionHeader';
import { Button } from '../components/Button';
import { TiltCard } from '../components/TiltCard';
import { SectionDivider } from '../components/SectionDivider';

const fadeInLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
};

const fadeInRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    building: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission would be handled here
    console.log('Form submitted:', formData);
    alert('Thank you for your message. We\'ll be in touch soon!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-t3-off-white">
      {/* Header */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 pt-16 md:pt-24 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeader
            overline="Get in Touch"
            title="Start a conversation"
            description="Tell us about the inflection point you're facing. We'll help you find the catalyst for transformation."
          />
        </motion.div>
      </section>

      <SectionDivider variant="gradient" />

      {/* Form Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 pb-24 md:pb-32">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Form */}
          <motion.div 
            {...fadeInLeft}
            className="md:col-span-7"
          >
            <motion.form 
              onSubmit={handleSubmit} 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <motion.div variants={staggerItem} className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm uppercase tracking-widest text-t3-muted-gray mb-3">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-t3-soft-wash border border-t3-soft-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-t3-accent-gold focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm uppercase tracking-widest text-t3-muted-gray mb-3">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-t3-soft-wash border border-t3-soft-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-t3-accent-gold focus:border-transparent transition-all"
                    placeholder="john@company.com"
                  />
                </div>
              </motion.div>

              <motion.div variants={staggerItem}>
                <label htmlFor="company" className="block text-sm uppercase tracking-widest text-t3-muted-gray mb-3">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-t3-soft-wash border border-t3-soft-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-t3-accent-gold focus:border-transparent transition-all"
                  placeholder="Your Company Name"
                />
              </motion.div>

              <motion.div variants={staggerItem}>
                <label htmlFor="building" className="block text-sm uppercase tracking-widest text-t3-muted-gray mb-3">
                  What are you building? *
                </label>
                <input
                  type="text"
                  id="building"
                  name="building"
                  required
                  value={formData.building}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-t3-soft-wash border border-t3-soft-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-t3-accent-gold focus:border-transparent transition-all"
                  placeholder="Tell us about your project or challenge"
                />
              </motion.div>

              <motion.div variants={staggerItem}>
                <label htmlFor="message" className="block text-sm uppercase tracking-widest text-t3-muted-gray mb-3">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-5 py-4 bg-t3-soft-wash border border-t3-soft-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-t3-accent-gold focus:border-transparent transition-all resize-none"
                  placeholder="Tell us more about your challenge, goals, or timeline..."
                />
              </motion.div>

              <motion.div variants={staggerItem}>
                <Button type="submit" variant="primary" className="w-full md:w-auto px-12 py-4 text-lg">
                  Send Message
                </Button>
              </motion.div>
            </motion.form>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            {...fadeInRight}
            className="md:col-span-5"
          >
            <TiltCard className="rounded-lg sticky top-24" tiltDeg={18} scale={1.04}>
              <div className="bg-t3-soft-wash rounded-lg p-8 md:p-10">
                <h3 className="text-2xl font-heading tracking-tight mb-8">
                  Get in touch
                </h3>

                <div className="space-y-8">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-t3-muted-gray mb-3">
                      Email
                    </div>
                    <a
                      href="mailto:info@t-3.in"
                      className="text-lg hover:text-t3-accent-gold transition-colors"
                    >
                      info@t-3.in
                    </a>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-widest text-t3-muted-gray mb-3">
                      Website
                    </div>
                    <a
                      href="https://www.t-3.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg hover:text-t3-accent-gold transition-colors"
                    >
                      www.t-3.in
                    </a>
                  </div>

                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

    </div>
  );
}