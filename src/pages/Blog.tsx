import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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

const BLOG_UPLOADS_STORAGE_KEY = "blog_uploaded_posts_v1";

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadedPosts, setUploadedPosts] = useState<BlogPost[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tags: "",
    excerpt: "",
    readTime: "",
  });

  useEffect(() => {
    const raw = localStorage.getItem(BLOG_UPLOADS_STORAGE_KEY);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw) as BlogPost[];
      if (Array.isArray(parsed)) {
        setUploadedPosts(parsed);
      }
    } catch {
      localStorage.removeItem(BLOG_UPLOADS_STORAGE_KEY);
    }
  }, []);

  const allPosts = useMemo(() => {
    return [...uploadedPosts, ...blogPosts];
  }, [uploadedPosts]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(allPosts.map((post) => post.category)));
    return ["All", ...uniqueCategories];
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return allPosts.filter((post) => {
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
  }, [allPosts, searchQuery, selectedCategory]);

  const handleUploadPost = (event: React.FormEvent) => {
    event.preventDefault();

    const title = formData.title.trim();
    const category = formData.category.trim();
    const excerpt = formData.excerpt.trim();

    if (!title || !category || !excerpt) {
      return;
    }

    const parsedTags = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const newPost: BlogPost = {
      id: Date.now(),
      title,
      category,
      tags: parsedTags,
      excerpt,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      readTime: formData.readTime.trim() || "5 min read",
    };

    const updatedUploadedPosts = [newPost, ...uploadedPosts];
    setUploadedPosts(updatedUploadedPosts);
    localStorage.setItem(
      BLOG_UPLOADS_STORAGE_KEY,
      JSON.stringify(updatedUploadedPosts),
    );

    setFormData({
      title: "",
      category: "",
      tags: "",
      excerpt: "",
      readTime: "",
    });
    setSelectedCategory("All");
  };

  return (
    <div className="min-h-screen">
      <Header />
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
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 mb-8">
              <h2 className="font-heading text-lg font-semibold text-card-foreground">
                Upload Blog Post
              </h2>
              <form onSubmit={handleUploadPost} className="mt-4 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-foreground">Title</label>
                    <Input
                      required
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Enter blog post title"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Category</label>
                    <Input
                      required
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      placeholder="e.g. Hiring, Operations"
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-foreground">Tags</label>
                    <Input
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                      placeholder="comma, separated, tags"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Read Time</label>
                    <Input
                      value={formData.readTime}
                      onChange={(e) =>
                        setFormData({ ...formData, readTime: e.target.value })
                      }
                      placeholder="e.g. 6 min read"
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Excerpt</label>
                  <Textarea
                    required
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    placeholder="Short summary of the post"
                    rows={4}
                    className="mt-1.5"
                  />
                </div>

                <Button type="submit" variant="brand">
                  Upload Post
                </Button>
              </form>
            </div>

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
