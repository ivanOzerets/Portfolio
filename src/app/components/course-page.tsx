"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import WaveGrid from "@/app/components/wave-grid";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { cleanMarkdown } from "@/app/utils/clean-markdown";

export interface Lab {
    title: string;
    file: string;
}

export interface Week {
    title: string;
    file: string | null;
    labs?: Lab[];
}

export interface Course {
    title: string;
    weeks: Week[];
}

interface CoursePageProps {
    title: string;
    provider: string;
    courses: Course[];
    basePath: string;
}

export default function CoursePage({ title, provider, courses, basePath }: CoursePageProps) {
    const [openCourses, setOpenCourses] = useState<Record<number, boolean>>({});
    const [openWeeks, setOpenWeeks] = useState<Record<string, boolean>>({});
    const [weekContent, setWeekContent] = useState<Record<string, string>>({});
    const [showTop, setShowTop] = useState(false);

    const toggleCourse = (ci: number) => {
        setOpenCourses(prev => ({ ...prev, [ci]: !prev[ci] }));
        courses[ci].weeks.forEach(week => {
            if (week.file && !weekContent[week.file]) {
                fetch(basePath + week.file)
                    .then(r => r.text())
                    .then(text => {
                        const cleaned = cleanMarkdown(text);
                        setWeekContent(prev => ({ ...prev, [week.file!]: cleaned }));
                    });
            }
        });
    };

    useEffect(() => {
        const onScroll = () => setShowTop(window.scrollY > 400);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const toggleWeek = (key: string, file: string | null) => {
        setOpenWeeks(prev => ({ ...prev, [key]: !prev[key] }));
        if (file && !weekContent[file]) {
            fetch(basePath + file)
                .then(r => r.text())
                .then(text => {
                    const cleaned = cleanMarkdown(text);
                    setWeekContent(prev => ({ ...prev, [file]: cleaned }));
                });
        }
    };

    return (
        <main style={{ minHeight: "100vh", background: "#080808", color: "#f0f0f0", fontFamily: "'DM Mono', monospace" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .glass {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 0.5px solid rgba(255,255,255,0.08);
          border-radius: 16px;
        }

        .course-row {
          display: flex;
          align-items: baseline;
          justify-content: flex-start;
          cursor: pointer;
          padding: 0.6rem 0;
          user-select: none;
          gap: 0.5rem;
        }
        .course-row:hover .course-title { color: rgba(240,240,240,0.9); }
        .course-title {
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: rgba(240,240,240,0.7);
        }
        .chevron {
          font-size: 18px;
          color: rgba(240,240,240,0.2);
          flex-shrink: 0;
        }

        .week-row {
          display: flex;
          align-items: baseline;
          justify-content: flex-start;
          cursor: pointer;
          padding: 0.45rem 0 0.45rem 1.25rem;
          user-select: none;
          gap: 0.5rem;
        }
        .week-row:hover .week-title { color: rgba(240,240,240,0.7); }
        .week-title {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: rgba(240,240,240,0.4);
          letter-spacing: 0.03em;
        }
        .week-title.coming-soon {
          color: rgba(240,240,240,0.18);
          font-style: italic;
        }

        .week-content {
          padding: 0.75rem 0 0.5rem 2.5rem;
        }
        .notes-content h1 {
          font-size: 13px;
          color: rgba(240,240,240,0.7);
          margin-bottom: 0.5rem;
          margin-top: 1.5rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-family: 'DM Mono', monospace;
        }
        .notes-content h2 {
          font-size: 12px;
          color: rgba(240,240,240,0.55);
          margin-bottom: 0.4rem;
          margin-top: 1.25rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          font-family: 'DM Mono', monospace;
        }
        .notes-content h3 {
          font-size: 11px;
          color: rgba(240,240,240,0.45);
          margin-bottom: 0.35rem;
          margin-top: 1.25rem;
          font-weight: 400;
          letter-spacing: 0.04em;
          font-family: 'DM Mono', monospace;
        }
        .notes-content p {
          font-size: 11px;
          color: rgba(240,240,240,0.35);
          line-height: 1.75;
          margin-bottom: 0.4rem;
          font-family: 'DM Mono', monospace;
        }
        .notes-content ul, .notes-content ol {
          padding-left: 1.1rem;
          margin-bottom: 0.5rem;
          list-style-type: disc;
        }
        .notes-content li {
          font-size: 11px;
          color: rgba(240,240,240,0.35);
          line-height: 1.7;
          margin-bottom: 0.15rem;
          font-family: 'DM Mono', monospace;
        }
        .notes-content li ul {
          margin-top: 0.15rem;
          margin-bottom: 0.15rem;
        }
        .notes-content strong {
          color: rgba(240,240,240,0.75);
          font-weight: 500;
        }
        .notes-content em {
          color: rgba(240,240,240,0.5);
        }
        .notes-content ul + p {
          margin-top: 1rem;
        }
        .notes-content pre {
          background: rgba(0,0,0,0.3);
          border: 0.5px solid rgba(255,255,255,0.06);
          border-radius: 8px;
          padding: 0.9rem 1rem;
          margin: 0.6rem 0 0.6rem 0;
          overflow-x: auto;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          line-height: 1.6;
        }
        .notes-content pre code {
          background: transparent !important;
          font-size: 11px;
          font-family: 'DM Mono', monospace;
        }
        .notes-content code:not(pre code) {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: rgba(240,240,240,0.6);
          background: rgba(255,255,255,0.05);
          padding: 1px 5px;
          border-radius: 3px;
        }
        .notes-content a {
          color: rgba(240,240,240,0.5);
          text-decoration: underline;
          cursor: pointer;
        }
        .notes-content a:hover {
          color: rgba(240,240,240,0.8);
        }
      `}</style>

            <WaveGrid />

            <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem clamp(1rem, 4vw, 3rem) 6rem" }}>

                <Link href="/" style={{
                    color: "rgba(240,240,240,0.3)",
                    textDecoration: "none",
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: "2rem",
                }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#a78bfa")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,240,240,0.3)")}
                >
                    ← back
                </Link>

                <div style={{ marginBottom: "2rem" }}>
                    <p style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(167,139,250,0.5)", marginBottom: "0.5rem" }}>
                        {provider}
                    </p>
                    <h1 style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                        fontWeight: 400,
                        letterSpacing: "-0.01em",
                        marginBottom: "0.4rem",
                    }}>
                        {title}
                    </h1>
                </div>

                <div className="glass" style={{ padding: "1.75rem" }}>
                    {courses.map((course, ci) => (
                        <div key={ci}>
                            <div
                                className="course-row"
                                onClick={() => toggleCourse(ci)}
                            >
                                <span className="chevron">{openCourses[ci] ? "▴" : "▾"}</span>
                                <span className="course-title">{course.title}</span>
                            </div>

                            {openCourses[ci] && (
                                <div style={{ paddingBottom: "0.5rem" }}>
                                    {course.weeks.map((week, wi) => {
                                        const key = `${ci}-${wi}`;
                                        const hasNotes = !!week.file;
                                        return (
                                            <div key={key}>
                                                <div
                                                    className="week-row"
                                                    onClick={() => toggleWeek(key, week.file)}
                                                    style={{ cursor: hasNotes ? "pointer" : "default" }}
                                                >
                                                    {hasNotes && (
                                                        <span className="chevron">{openWeeks[key] ? "▴" : "▾"}</span>
                                                    )}
                                                    <span className={`week-title${!hasNotes ? " coming-soon" : ""}`}>
                                                        {week.title}{!hasNotes ? " — coming soon" : ""}
                                                    </span>
                                                </div>

                                                {openWeeks[key] && week.file && (
                                                    weekContent[week.file] ? (
                                                        <div className="notes-content week-content">
                                                            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                                                {weekContent[week.file]}
                                                            </ReactMarkdown>
                                                        </div>
                                                    ) : (
                                                        <div style={{ padding: "0.5rem 0 0.5rem 2.5rem", fontSize: 11, color: "rgba(240,240,240,0.2)", fontFamily: "'DM Mono', monospace" }}>
                                                            loading...
                                                        </div>
                                                    )
                                                )}

                                                {openWeeks[key] && week.labs && week.labs.map((lab, li) => {
                                                    const labKey = `${key}-lab-${li}`;
                                                    return (
                                                        <div key={labKey}>
                                                            <div
                                                                className="week-row"
                                                                onClick={() => toggleWeek(labKey, lab.file)}
                                                                style={{ paddingLeft: "2.5rem", cursor: "pointer" }}
                                                            >
                                                                <span className="chevron">{openWeeks[labKey] ? "▴" : "▾"}</span>
                                                                <span className="week-title" style={{ fontSize: "10px" }}>{lab.title}</span>
                                                            </div>
                                                            {openWeeks[labKey] && weekContent[lab.file] && (
                                                                <div className="notes-content week-content" style={{ paddingLeft: "4rem" }}>
                                                                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                                                        {weekContent[lab.file]}
                                                                    </ReactMarkdown>
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {showTop && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    style={{
                        position: "fixed",
                        bottom: "2rem",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "rgba(255,255,255,0.04)",
                        border: "0.5px solid rgba(167,139,250,0.3)",
                        color: "#a78bfa",
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 10,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "0.4rem 1rem",
                        borderRadius: 4,
                        cursor: "pointer",
                        backdropFilter: "blur(8px)",
                        zIndex: 100,
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.borderColor = "rgba(167,139,250,0.6)";
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.borderColor = "rgba(167,139,250,0.3)";
                    }}
                >
                    ↑ top
                </button>
            )}

        </main>
    );
}
