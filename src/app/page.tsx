"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import WaveGrid from "@/app/components/wave-grid";

const PROJECTS = [
  {
    slug: "ml-architecture-comparison",
    title: "ML Architecture Comparison",
    description: "PyTorch vs TensorFlow vs Scikit-learn. Scratch CNN to fine-tuning pretrained models on Intel's scene classification dataset.",
    tags: ["Python", "PyTorch", "TensorFlow", "sklearn", "FastAPI"],
    status: "complete",
    disabled: false,
  },
  {
    slug: "greatbase-tennis-rag-assistant",
    title: "GreatBase Tennis RAG Assistant",
    description: "A personal AI research assistant. In goes a list of links and out pops summaries, highlights, and relevant follow-up.",
    tags: ["RAG", "LangChain", "Pinecone", "OpenAI", "FastAPI"],
    status: "in progress",
    disabled: true,
  },
  {
    slug: "stringing-marketplace-micro-saas",
    title: "Stringing Marketplace Micro Saas",
    description: "Uber for tennis stringers. A place for non-professional stringers with neglected stringers to make an income on the side.",
    tags: ["Next.js", "FastAPI", "REST API", "PostgreSQL", "AWS"],
    status: "planned",
    disabled: true,
  },
];

const APPS = [
  {
    slug: "ai-desktop-companion",
    title: "AI Desktop Companion",
    description: "An interactive bird that roams around the screen. Evolves its personality with the user through API calls.",
    tags: ["Ollama", "Win32", "GDI", "C++", "LLM APIs"],
    status: "complete",
    disabled: false,
  },
  {
    slug: "re-zero",
    title: "Re-Zero Productivity System",
    description: "An implementation of Mark Forster's Resistance Zero system. Using psychology to build momentum and beat procrastination.",
    tags: ["Tauri", "Rust", "React", "SQLite", "TypeScript"],
    status: "in progress",
    disabled: true,
  },
  {
    slug: "connect-more",
    title: "Connect More Desktop Widget",
    description: "A widget that cycles through reminders. A constant reminder to keep up with the people that mean the most to you.",
    tags: ["Tauri", "Rust", "React", "SQLite", "TypeScript"],
    status: "planned",
    disabled: true,
  },
]

const COURSES = [
  {
    slug: "ml-specialization",
    title: "Machine Learning Specialization",
    description: "The most recommended ML course, by Andrew Ng. Supervised, unsupervised, and reinforcement learning basics.",
    tags: ["Python", "NumPy", "Classification", "Regression", "Supervised Learning", "Unsupervised Learning"],
    status: "complete",
    disabled: false,
    provider: "Coursera · DeepLearning.AI",
  },
  {
    slug: "deep-learning-specialization",
    title: "Deep Learning Specialization",
    description: "Neural networks, CNNs, RNNs, and transformers. Follow-up course by Andrew Ng on modern deep learning.",
    tags: ["Python", "TensorFlow", "CNNs", "RNNs", "Transformers"],
    status: "complete",
    disabled: false,
    provider: "Coursera · DeepLearning.AI",
  },
  {
    slug: "ml-in-production",
    title: "Machine Learning in Production",
    description: "MLOps practices for deploying and maintaining ML systems. Learning to understand production-grade pipelines.",
    tags: ["MLOps", "Python", "Deployment", "Monitoring"],
    status: "planned",
    disabled: true,
    provider: "Coursera · DeepLearning.AI",
  },
];

const BOOKS = [
  {
    slug: "mathmatics-for-machine-learning",
    title: "Mathmatics For Machine Learning",
    authors: "Marc Peter Deisnroth · A. Aldo Faisal · Cheng Soon Ong",
    description: "Understanding the mathmatical foundations of machine learning. The math needs to start mathing.",
    tags: ["Linear Regression", "PCA", "Gaussian Mixture Models", "Support Vector Machines"],
    status: "in progress",
    disabled: true,
  },
  {
    slug: "agentic-design-patterns",
    title: "Agentic Design Patterns",
    authors: "Antonio Gullí",
    description: "Transforming LLMs from chatbots to AI agents. Understanding modern AI tools and how to use them.",
    tags: ["Agentic Patterns", "Memory & Adaptation", "Resilience & RAG", "Multi-Agent Systems"],
    status: "in progress",
    disabled: true,
  },
  {
    slug: "deep-learning",
    title: "Deep Learning",
    authors: "Ian Goodfellow · Yoshua Bengio · Aaron Courville",
    description: "The definitive deep learning textbook apparently. From math foundations through modern architectures.",
    tags: ["Math Foundations", "Neural Networks", "CNNs & RNNs", "Practical DL"], 
    status: "planned",
    disabled: true,
  },
  /*
  {
    slug: "pattern-recognition-and-machine-learning",
    title: "Pattern Recognition and Machine Learning",
    authors: "Christopher M. Bishop",
    description: "Heavy on the Bayesian viewpoint. Presents approximate inference algs and applies graphical models to ML.",
    tags: ["Bayesian Methods", "Probabilistic Models", "Kernel Methods", "Graphical Models"],
    status: "planned",
    disabled: true,
  },
  */
]

function ProjectCard({ p }: { p: typeof PROJECTS[0] }) {
  return (
    <div className="glass-card p-6 sm:p-7 h-full relative">

      {/* Status */}
      <div className="flex items-center mb-5">
        <span className={`status-dot ${p.status === "complete" ? "dot-complete-project" :
            p.status === "in progress" ? "dot-progress" : "dot-planned"
          }`} />
        <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-white/30">
          {p.status}
        </span>
      </div>

      {/* Title */}
      <h2 className="font-serif text-lg sm:text-xl font-normal mb-3 tracking-tight text-foreground">
        {p.title}
      </h2>

      {/* Preview */}
      <div className="w-full aspect-video rounded-lg border border-white/[0.08] overflow-hidden mb-5">
        {p.slug === "ml-architecture-comparison" ? (
          <video
            src="/videos/ml-architecture-comparison-preview-video.mp4"
            autoPlay loop muted playsInline
            className="w-full h-full object-cover block"
          />
        ) : (
          <div className="w-full h-full bg-white/[0.02] flex items-center justify-center">
            <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-white/[0.18]">
              preview cooking
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="font-mono text-[11px] sm:text-xs leading-relaxed text-white/45 mb-6">
        {p.description}
      </p>

      {/* Tags */}
      <div className="flex gap-[5px] flex-wrap">
        {p.tags.map(tag => <span key={tag} className="tag tag-accent-project">{tag}</span>)}
      </div>
    </div>
  );
}

function AppCard({ a }: { a: typeof APPS[0] }) {
  return (
    <div className="glass-card glass-card-app p-6 sm:p-7 h-full relative">
      {/* Status */}
      <div className="flex items-center mb-5">
        <span className={`status-dot ${a.status === "complete" ? "dot-complete-app" :
            a.status === "in progress" ? "dot-progress" : "dot-planned"
          }`} />
        <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-white/30">
          {a.status}
        </span>
      </div>

      {/* Title */}
      <h2 className="font-serif text-lg sm:text-xl font-normal mb-3 tracking-tight text-foreground">
        {a.title}
      </h2>

      {/* Preview */}
      <div className="w-full aspect-video rounded-lg border border-white/[0.08] overflow-hidden mb-5">
        <div className="w-full h-full bg-white/[0.02] flex items-center justify-center">
          <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-white/[0.18]">
            preview cooking
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="font-mono text-[11px] sm:text-xs leading-relaxed text-white/45 mb-6">
        {a.description}
      </p>

      {/* Tags */}
      <div className="flex gap-[5px] flex-wrap">
        {a.tags.map(tag => <span key={tag} className="tag tag-accent-app">{tag}</span>)}
      </div>
    </div>
  );
}

function CourseCard({ c }: { c: typeof COURSES[0] }) {
  return (
    <div className="glass-card glass-card-course p-6 sm:p-7 h-full relative">
      {/* Status */}
      <div className="flex items-center mb-5">
        <span className={`status-dot ${c.status === "complete" ? "dot-complete-course" :
            c.status === "in progress" ? "dot-progress" : "dot-planned"
          }`} />
        <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-white/30">
          {c.status}
        </span>
      </div>

      {/* Title */}
      <h2 className="font-serif text-lg sm:text-xl font-normal mb-1 tracking-tight text-foreground">
        {c.title}
      </h2>

      {/* Provider */}
      <p className="font-mono text-[9px] tracking-[0.08em] text-accent-course/50 uppercase mb-4">
        {c.provider}
      </p>

      {/* Description */}
      <p className="font-mono text-[11px] sm:text-xs leading-relaxed text-white/45 mb-6">
        {c.description}
      </p>

      {/* Tags */}
      <div className="flex gap-[5px] flex-wrap">
        {c.tags.map(tag => <span key={tag} className="tag tag-accent-course">{tag}</span>)}
      </div>
    </div>
  );
}

function BookCard({ b }: { b: typeof BOOKS[0] }) {
  return (
    <div className="glass-card glass-card-book p-6 sm:p-7 h-full relative">
      {/* Status */}
      <div className="flex items-center mb-5">
        <span className={`status-dot ${b.status === "complete" ? "dot-complete-book" :
            b.status === "in progress" ? "dot-progress" : "dot-planned"
          }`} />
        <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-white/30">
          {b.status}
        </span>
      </div>

      {/* Title */}
      <h2 className="font-serif text-lg sm:text-xl font-normal mb-1 tracking-tight text-foreground">
        {b.title}
      </h2>

      {/* Authors */}
      <p className="font-mono text-[9px] tracking-[0.08em] text-accent-book/50 uppercase mb-4">
        {b.authors}
      </p>

      {/* Description */}
      <p className="font-mono text-[11px] sm:text-xs leading-relaxed text-white/45 mb-6">
        {b.description}
      </p>

      {/* Tags */}
      <div className="flex gap-[5px] flex-wrap">
        {b.tags.map(tag => <span key={tag} className="tag tag-accent-book">{tag}</span>)}
      </div>
    </div>
  );
}

export default function Home() {
  const [copied, setCopied] = useState(false);

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("ivan.ozerets@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen text-foreground relative">
      <WaveGrid />

      <div className="relative">
        <section className="px-4 sm:px-8 lg:px-24 pt-8 pb-16 max-w-[1400px] mx-auto">

          {/* Identity */}
          <div className="flex items-center gap-6 sm:gap-8 mb-10">
            {/* Photo */}
            <div className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] rounded-full overflow-hidden border border-white/[0.12] shrink-0">
              <Image src="/images/photo.JPG" alt="Ivan Ozerets" width={110} height={110} className="object-cover w-full h-full" />
            </div>
            {/* Name + role stacked on mobile, inline on desktop */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-5">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[4.2rem] font-normal tracking-tight leading-none">
                Ivan Ozerets
              </h1>
              <div className="flex items-center gap-2 sm:gap-4 mt-1 sm:mt-0">
                <span className="hidden sm:inline text-white/[0.38] text-sm sm:text-base pt-2">|</span>
                <span className="font-mono text-[10px] sm:text-sm lg:text-base tracking-[0.08em] uppercase text-white/[0.38] sm:pt-3">
                  ML Engineer
                </span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="font-mono text-[12px] sm:text-[15px] leading-[1.9] text-white/45 max-w-[640px] mb-7">
            Heavily interested in anything data science, machine learning, and AI.
            Here you'll find my projects, course notes, and apps I've developed for personal development and competency in the field.
            Feel free to reach out (m-dash) I'm always looking to chat with like-minded folks.
          </p>

          {/* Contact */}
          <div className="font-mono text-[11px] sm:text-[13px] tracking-[0.04em] mb-8 sm:mb-12 flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <span className="text-white/25">email:</span>
              <a href="#" onClick={copyEmail} className="text-accent-project no-underline cursor-pointer">
                ivan (dot) ozerets [at] gmail (dot) com
              </a>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-white/25">github:</span>
              <a href="https://github.com/ivanOzerets" target="_blank" rel="noopener noreferrer"
                className="text-accent-project no-underline cursor-pointer">
                ivanOzerets
              </a>
            </div>
          </div>

          {/* Projects */}
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/25 mb-4">
            Projects
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 sm:mb-12">
            {PROJECTS.map((p, i) => {
              return p.disabled ? (
                <div key={p.slug} className={`cursor-default pointer-events-none`}>
                  <ProjectCard p={p} />
                </div>
              ) : (
                <Link key={p.slug} href={`/projects/${p.slug}`}
                  className={`no-underline text-inherit block group`}>
                  <ProjectCard p={p} />
                </Link>
              )
            })}
          </div>

          {/* Apps */}
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/25 mb-4">
            Apps
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 sm:mb-12">
            {APPS.map((p, i) => {
              return p.disabled ? (
                <div key={p.slug} className={`cursor-default pointer-events-none`}>
                  <AppCard a={p} />
                </div>
              ) : (
                <Link key={p.slug} href={`/apps/${p.slug}`}
                  className={`no-underline text-inherit block group`}>
                  <AppCard a={p} />
                </Link>
              )
            })}
          </div>

          {/* Courses */}
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/25 mb-4">
            Courses
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 sm:mb-12">
            {COURSES.map((p, i) => {
              return p.disabled ? (
                <div key={p.slug} className={`cursor-default pointer-events-none lg:order-none`}>
                  <CourseCard c={p} />
                </div>
              ) : (
                <Link key={p.slug} href={`/courses/${p.slug}`}
                  className={`no-underline text-inherit block group lg:order-none`}>
                  <CourseCard c={p} />
                </Link>
              );
            })}
          </div>

          {/* Books */}
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/25 mb-4">
            Books
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BOOKS.map((p, i) => {
              return p.disabled ? (
                <div key={p.slug} className={`cursor-default pointer-events-none lg:order-none`}>
                  <BookCard b={p} />
                </div>
              ) : (
                <Link key={p.slug} href={`/courses/${p.slug}`}
                  className={`no-underline text-inherit block group lg:order-none`}>
                  <BookCard b={p} />
                </Link>
              );
            })}
          </div>

        </section>
      </div>

      {/* Copied toast */}
      {copied && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-accent/[0.08] border border-accent/25 text-accent-project font-mono text-[11px] tracking-[0.05em] px-4 py-2 rounded z-[100] backdrop-blur-lg whitespace-nowrap">
          copied to clipboard
        </div>
      )}
    </main>
  );
}
