"use client";
import { useState } from "react";
import Link from "next/link";
import WaveGrid from "@/app/components/wave-grid";
import ReactMarkdown from "react-markdown";

const FEATURES = [
    {
        title: "Animations",
        description: "Dynamic weight-driven animation system. Current animations include idle, flight, sleep, and dance if you ask nicely.",
        clip: "/videos/animation_clip.mp4",
    },
    {
        title: "Interactivity",
        description: "Pet, poke, or talk to the bird. Reacts relatively quickly and remembers your interactions.. so don't poke too much.",
        clip: "/videos/interaction.mp4",
    },
    {
        title: "Evolution",
        description: "Personality and animation weights shift slowly over time from user interactions and environment cues.",
        clip: "/videos/evolution_clip.mp4",
    },
    {
        title: "Memory",
        description: "A running history log shapes the LLM context. Give the bird continuity across sessions.. if you ever turn the bird off for some reason pfft.",
        clip: "/videos/memory.mp4",
    },
];

const SETUP_APP = [
    { step: "1", text: "Download the latest working version below." },
    { step: "2", text: "Extract the zip anywhere you want to run it from." },
    { step: "3", text: "Double click the exe. The bird should fly in." },
];

const SETUP_OLLAMA = [
    { step: "1", text: "Download and install Ollama from ollama.com." },
    { step: "2", text: "In the app's model selection search, find and download your model." },
    { step: "3", text: "Your latest model is used or pin a specific one in config.json." },
];

const HINTS = [
    { key: "Ctrl + Shift + Space", desc: "Open a spotlight to talk to the bird." },
    { key: "Click the bird", desc: "Sends it flying to a new ledge." },
    { key: "Pet the bird", desc: "Drag your cursor back and forth over it." },
    { key: "config.json", desc: "Pin a model, adjust max tokens, and override settings." },
    { key: "weights.json", desc: "Manually adjust how often each animation plays." },
];

const MODELS = [
    { name: "llama3.2", size: "2 GB", note: "Not that good. Wouldn't recommend." },
    { name: "llama3.1:8b", size: "5 GB", note: "Not bad. Can get repetative at times." },
    { name: "mistral", size: "4 GB", note: "Meh, just alright. Nothing special." },
    { name: "phi3:mini", size: "2 GB", note: "Like the first one, wouldn't recommend." },
    { name: "gemma2:9b", size: "6 GB", note: "Pretty good. Can be actually funny sometimes." },
];

export default function AiDesktopCompanion() {
    const [notesOpen, setNotesOpen] = useState(false);
    const [copiedModel, setCopiedModel] = useState<string | null>(null);

    const copyModel = (name: string) => {
        navigator.clipboard.writeText(name);
        setCopiedModel(name);
        setTimeout(() => setCopiedModel(null), 2000);
    };

    return (
        <main className="min-h-screen bg-background text-foreground font-mono">
            <WaveGrid />

            <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 pb-16">

                {/* Back */}
                <Link href="/" className="text-white/30 no-underline text-[11px] tracking-[0.08em] inline-flex items-center gap-1.5 mb-8 hover:text-accent-app transition-colors">
                    ← back
                </Link>

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-app inline-block" />
                        <span className="text-[9px] tracking-[0.15em] uppercase text-white/30">complete</span>
                    </div>
                    <h1 className="font-serif text-2xl sm:text-3xl lg:text-[3.2rem] font-normal tracking-tight mb-2">
                        AI Desktop Companion
                    </h1>
                    <p className="text-[11px] sm:text-[13px] text-white/40 leading-relaxed max-w-[560px]">
                        A small bird that lives on your desktop. A locally-run LLM drives its personality, memory, and evolution over time.
                    </p>
                </div>

                {/* Hero video */}
                <div className="glass p-0 overflow-hidden mb-4 rounded-2xl">
                    <video
                        src="/videos/main.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="none"
                        className="w-full aspect-video object-cover"
                    />
                </div>

                {/* Feature clips — 2x2 grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {FEATURES.map((f) => (
                        <div key={f.title} className="glass p-5 flex flex-col gap-3">
                            <p className="text-[10px] tracking-[0.15em] uppercase text-white/25">{f.title}</p>
                            {f.clip ? (
                                <video
                                    src={f.clip}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="none"
                                    className="w-full aspect-video rounded-lg object-cover"
                                />
                            ) : (
                                <div className="w-full aspect-video bg-white/[0.02] rounded-lg flex items-center justify-center">
                                    <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-white/[0.18]">clip roasting</span>
                                </div>
                            )}
                            <p className="text-[11px] text-white/35 leading-relaxed">{f.description}</p>
                        </div>
                    ))}
                </div>

                {/* Setup */}
                <div className="glass p-6 sm:p-7 mb-4">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-white/25 mb-6">Setup</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

                        {/* App */}
                        <div className="flex flex-col gap-5">
                            <p className="text-[9px] tracking-[0.12em] uppercase text-white/25">The app</p>
                            <div className="flex flex-col gap-3">
                                {SETUP_APP.map((s) => (
                                    <div key={s.step} className="flex items-start gap-3">
                                        <span className="text-[9px] font-mono text-accent-app/50 mt-0.5 shrink-0 w-3">{s.step}</span>
                                        <span className="text-[11px] text-white/40 leading-relaxed">{s.text}</span>
                                    </div>
                                ))}
                                <a href="https://github.com/ivanOzerets/AI-Desktop-Companion/releases/download/v1.0-beta/ai-desktop-companion.zip" className="ml-6 self-start font-mono text-[10px] text-accent-app/60 hover:text-accent-app transition-colors no-underline">
                                    ↓ download .zip <span className="text-white/25">· 34.5 MB</span>
                                </a>
                            </div>

                            {/* Hints */}
                            <div>
                                <p className="text-[9px] tracking-[0.12em] uppercase text-white/25 mb-3">Controls & config</p>
                                <div className="flex flex-col gap-2.5">
                                    {HINTS.map((h) => (
                                        <div key={h.key} className="flex flex-col gap-0.5 border-l border-accent-app/20 pl-3">
                                            <span className="font-mono text-[10px] text-white/50">{h.key}</span>
                                            <span className="font-mono text-[10px] text-white/30 leading-relaxed">{h.desc}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Ollama */}
                        <div className="flex flex-col gap-5">
                            <p className="text-[9px] tracking-[0.12em] uppercase text-white/25">
                                Ollama (local LLM)
                                <span className="text-white/15 mx-2">|</span>
                                <span className="text-white/15">Cloud API option is still cooking</span>
                            </p>
                            <div className="flex flex-col gap-3">
                                {SETUP_OLLAMA.map((s) => (
                                    <div key={s.step} className="flex items-start gap-3">
                                        <span className="text-[9px] font-mono text-accent-app/50 mt-0.5 shrink-0 w-3">{s.step}</span>
                                        <span className="text-[11px] text-white/40 leading-relaxed">{s.text}</span>
                                    </div>
                                ))}
                                <a
                                    href="https://ollama.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-6 self-start font-mono text-[10px] text-accent-app/60 hover:text-accent-app transition-colors no-underline"
                                >
                                    ↗ ollama.com
                                </a>
                            </div>

                            {/* Model options */}
                            <div>
                                <p className="text-[9px] tracking-[0.12em] uppercase text-white/25 mb-3">Lightweight model options</p>
                                <div className="flex flex-col gap-2.5">
                                    {MODELS.map((m) => (
                                        <div key={m.name} className="flex flex-col gap-0.5 border-l border-accent-app/20 pl-3">
                                            <div className="flex items-baseline gap-2">
                                                <button
                                                    onClick={() => copyModel(m.name)}
                                                    className="font-mono text-[10px] text-white/55 hover:text-accent-app transition-colors cursor-pointer bg-transparent border-none p-0"
                                                >
                                                    {m.name}
                                                </button>
                                                <span className="font-mono text-[9px] text-white/25">{m.size}</span>
                                            </div>
                                            <span className="font-mono text-[10px] text-white/30 leading-relaxed">{m.note}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notes */}
                <div className="glass p-6 sm:p-7">
                    <div
                        onClick={() => setNotesOpen(!notesOpen)}
                        className="flex justify-between items-center cursor-pointer select-none group"
                    >
                        <div className="flex items-center gap-2">
                            <p className="text-[10px] tracking-[0.15em] uppercase text-white/25 group-hover:text-accent-app/50 transition-colors">
                                Notes
                            </p>
                            <span className="text-sm text-white/25 leading-none mb-1 group-hover:text-accent-app/50 transition-colors">
                                {notesOpen ? "▴" : "▾"}
                            </span>
                        </div>
                    </div>
                    {notesOpen && (
                        <div className="notes-content text-xs text-white/35 leading-[1.8] mt-4">
                            <ReactMarkdown>{"No notes yet.."}</ReactMarkdown>
                        </div>
                    )}
                </div>

            </div>

            {copiedModel && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-accent-app/[0.08] border border-accent-app/25 text-accent-app font-mono text-[11px] tracking-[0.05em] px-4 py-2 rounded z-[100] backdrop-blur-lg whitespace-nowrap">
                    copied to clipboard
                </div>
            )}
        </main>
    );
}
