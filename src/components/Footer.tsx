import { motion } from "framer-motion";
import {
  Facebook,
  Heart,
  Instagram,
  MessageCircleMore,
  Music2,
  Twitter,
  Youtube,
} from "lucide-react";
import Logo from "@/components/Logo";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://web.facebook.com/profile.php?id=61562074914381",
    icon: Facebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/e.africa1?igsh=MWhuanR1ODh4NGZmcA%3D%3D&utm_source=qr",
    icon: Instagram,
  },
  {
    label: "X / Twitter",
    href: "https://x.com/empower__africa?s=21",
    icon: Twitter,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@e_africa01?_t=ZS-8zrl8nXXinB&_r=1",
    icon: Music2,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@e-africaserices?si=CbConmy1ptbJny3Z",
    icon: Youtube,
  },
  {
    label: "WhatsApp Channel",
    href: "https://whatsapp.com/channel/0029VbCQYKC42DcYzssykX2z/1648",
    icon: MessageCircleMore,
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <footer className="bg-gradient-to-b from-primary to-primary/95 dark:from-card dark:to-card text-primary-foreground dark:text-foreground relative overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-10" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="container mx-auto px-4 py-16 lg:px-8 relative z-10"
      >
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex flex-col items-start gap-1">
              <div className="inline-flex items-center justify-center rounded-lg border border-primary-foreground/20 bg-white/10 backdrop-blur-sm px-3 py-2">
                <Logo variant="light" className="h-8" />
              </div>
              <span className="font-heading text-sm font-bold leading-tight">
                E-Africa Services
              </span>
            </div>
            <p className="text-sm leading-relaxed opacity-90 max-w-xs font-light">
              Helping global companies <strong>outsource customer support</strong>, <strong>hire remote virtual assistant talent</strong>, and find <strong>stay at home jobs in africa</strong> for professionals.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs opacity-75">
              <Heart className="h-3.5 w-3.5 fill-accent text-accent" />
              <span>Building Africa's future of work</span>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={itemVariants}>
            <h4 className="mb-5 font-heading text-base font-semibold">Quick Links</h4>
            <div className="space-y-3 text-sm">
              {[
                "For Employers",
                "For Job Seekers",
                "About Us",
                "Talent Solutions",
                "FAQ",
                "Contact",
              ].map((link, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ x: 4 }}
                  className="block opacity-90 hover:opacity-100 transition-opacity"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact and socials */}
          <motion.div variants={itemVariants}>
            <h4 className="mb-5 font-heading text-base font-semibold">Contact Info</h4>
            <div className="space-y-4 text-sm opacity-90">
              <div>
                <p className="text-xs uppercase tracking-widest opacity-75 mb-1">Location</p>
                <p className="font-light">Pan-African Operations</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest opacity-75 mb-1">Phone</p>
                <a href="tel:+2349076628205" className="font-light hover:opacity-100 transition-opacity">
                  +2349076628205
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest opacity-75 mb-1">Email</p>
                <a href="mailto:eafrica.ng@gmail.com" className="font-light hover:opacity-100 transition-opacity">
                  eafrica.ng@gmail.com
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/15 bg-white/5 text-primary-foreground transition-colors hover:bg-white/10 hover:text-white"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="border-t border-primary-foreground/10 dark:border-border" />

      {/* Bottom section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="container mx-auto px-4 py-8 lg:px-8 relative z-10"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs opacity-75 font-light">
          <p>
            © {currentYear} E-Africa Services. All rights reserved.
          </p>
          <p>
            Powered by <span className="font-semibold">E-Amplify</span>
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
