import { motion } from "framer-motion";
import { Linkedin, Twitter } from "lucide-react";
import SectionHeading from "./SectionHeading";

const team = [
  {
    name: "James Okonkwo",
    role: "Chief Executive Officer",
    initials: "JO",
    bio: "20+ years of leadership experience in African business consulting and strategic advisory.",
  },
  {
    name: "Amara Diallo",
    role: "Head of Consulting",
    initials: "AD",
    bio: "Expert in organizational transformation and operational excellence across emerging markets.",
  },
  {
    name: "David Mensah",
    role: "Director of Training",
    initials: "DM",
    bio: "Passionate about developing Africa's workforce through innovative learning methodologies.",
  },
  {
    name: "Sarah Kimani",
    role: "Talent Acquisition Lead",
    initials: "SK",
    bio: "Specialized in executive search and cross-border talent management across the continent.",
  },
];

const Team = () => {
  return (
    <section id="team" className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          title="Our Leadership Team"
          subtitle="Meet the experienced professionals driving E-Africa Services forward."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group text-center"
            >
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
                <span className="font-heading text-3xl font-bold">
                  {member.initials}
                </span>
              </div>
              <h3 className="mt-6 font-heading text-lg font-semibold text-foreground">
                {member.name}
              </h3>
              <p className="text-sm font-medium text-accent">{member.role}</p>
              <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
              <div className="mt-4 flex justify-center gap-3">
                <button
                  className="text-muted-foreground transition-colors hover:text-accent"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <Linkedin className="h-5 w-5" />
                </button>
                <button
                  className="text-muted-foreground transition-colors hover:text-accent"
                  aria-label={`${member.name} Twitter`}
                >
                  <Twitter className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
