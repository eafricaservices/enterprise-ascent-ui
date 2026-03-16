import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type BlogPost = {
  id: number;
  title: string;
  category: string;
  tags: string[];
  excerpt: string;
  date: string;
  readTime: string;
};

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "How to Build a High-Performance Remote Support Team",
    category: "Operations",
    tags: ["remote work", "customer service", "team management"],
    excerpt:
      "A practical framework for hiring, onboarding, and scaling distributed support teams across time zones.",
    date: "March 12, 2026",
    readTime: "6 min read",
  },
  {
    id: 2,
    title: "What Global Employers Look for in African Remote Talent",
    category: "Hiring",
    tags: ["talent", "interview", "skills"],
    excerpt:
      "The most in-demand skills, communication signals, and portfolio strengths employers prioritize today.",
    date: "March 8, 2026",
    readTime: "5 min read",
  },
  {
    id: 3,
    title: "Payroll and Compliance: Cross-Border Hiring Simplified",
    category: "Compliance",
    tags: ["payroll", "legal", "contracts"],
    excerpt:
      "A simple breakdown of payroll setup, contract structure, and compliance essentials for distributed teams.",
    date: "March 4, 2026",
    readTime: "7 min read",
  },
  {
    id: 4,
    title: "From Job Seeker to Top Performer in 90 Days",
    category: "Career",
    tags: ["career growth", "productivity", "communication"],
    excerpt:
      "How professionals can stand out quickly after placement with disciplined execution and visibility habits.",
    date: "February 27, 2026",
    readTime: "4 min read",
  },
  {
    id: 5,
    title: "Scaling Sales and Customer Success with Remote Pods",
    category: "Sales",
    tags: ["sales", "customer success", "growth"],
    excerpt:
      "How companies can combine SDR, account, and support workflows into focused remote pods for faster growth.",
    date: "February 19, 2026",
    readTime: "6 min read",
  },
  {
    id: 6,
    title: "The Leader’s Playbook for Managing Distributed Teams",
    category: "Leadership",
    tags: ["leadership", "KPIs", "culture"],
    excerpt:
      "Weekly cadences, scorecards, and communication rituals that keep remote teams aligned and accountable.",
    date: "February 10, 2026",
    readTime: "8 min read",
  },
];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(blogPosts.map((post) => post.category)));
    return ["All", ...uniqueCategories];
  }, []);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      if (!normalizedQuery) {
        return matchesCategory;
      }

      const searchableText = [post.title, post.category, ...post.tags]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableText.includes(normalizedQuery);
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24">
        <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-3xl font-bold text-foreground sm:text-5xl text-center"
            >
              Blog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-center"
            >
              Explore insights on hiring, remote operations, leadership, and career growth.
            </motion.p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <h2 className="font-heading text-lg font-semibold text-card-foreground">
                Filter by Categories
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "brand" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <div className="mt-5 relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by blog title, category, or tag..."
                  className="pl-9"
                />
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                >
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary font-medium">
                      {post.category}
                    </span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="mt-4 font-heading text-xl font-bold text-card-foreground leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-muted/60 px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="mt-10 rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
                No blog posts match your current filters.
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
