"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import WaveGrid from "@/app/components/wave-grid";
import GbteSearch from "@/app/components/gbte-search";
import PipelineSection from "@/app/components/pipeline-section";
import ReactMarkdown from "react-markdown";

export default function GBTERagSearch() {
	const [notesOpen, setNotesOpen] = useState(false);
	const [notes, setNotes] = useState("");

	useEffect(() => {
		fetch("/notes/projects/gbte-rag-search/gbte-rag-search.md").then(r => r.text()).then(setNotes);
	}, []);

	return (
		<main className="min-h-screen bg-background text-foreground font-mono">
			<WaveGrid />

			<div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 pb-16">

				{/* back */}
				<Link href="/" className="text-white/30 no-underline text-[11px] tracking-[0.08em] inline-flex items-center gap-1.5 mb-8 hover:text-accent-project transition-colors">
					← back
				</Link>

				{/* header */}
				<div className="mb-10">
					<div className="flex items-center gap-3 mb-2">
						<span className="w-1.5 h-1.5 rounded-full bg-accent-project inline-block" />
						<span className="text-[9px] tracking-[0.15em] uppercase text-white/30">complete</span>
					</div>
					<h1 className="font-serif text-2xl sm:text-3xl lg:text-[3.2rem] font-normal tracking-tight mb-2">
						GBTE RAG Search
					</h1>
					<p className="text-[11px] sm:text-[13px] text-white/40 leading-relaxed max-w-[600px]">
						Ask a tennis related question and receive an answer based in GreatBase content. Built on 300+ hours of GBTE's own podcasts and course videos.
					</p>
				</div>

				{/* top grid - hero video + about */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 items-stretch">

					{/* hero video */}
					<div className="glass p-0 overflow-hidden rounded-2xl">
						<video
							src="/videos/gbte-rag-search/gbte-hero-video.mp4"
							autoPlay
							loop
							muted
							playsInline
							preload="none"
							className="w-full h-full aspect-video object-cover"
						/>
					</div>

					{/* about */}
					<div className="glass p-6 sm:p-7 flex flex-col overflow-hidden">
						<div className="flex justify-between items-center mb-5">
							<p className="text-[10px] tracking-[0.15em] uppercase text-white/25">About</p>
							<a
								href="https://github.com/ivanOzerets/John-Carter-Speedrun/tree/main/Projects/gbte-rag-assistant"
								target="_blank"
								rel="noopener noreferrer"
								className="text-[10px] text-white/30 no-underline tracking-[0.08em] hover:text-accent-project transition-colors"
							>
								link to repo
							</a>
						</div>

						<p className="text-[12px] text-white/60 leading-relaxed mb-4">
							Retrieval augmented generation (RAG) pairs a search step with an LLM's generation step. The model answers based mainly on context retrieved from a specific, private data source, not what it memorized in training.
						</p>

						<p className="text-[12px] text-white/60 leading-relaxed mb-6">
							GBTE's content lives inside video courses and podcasts general models were never trained on. RAG grounds every answer in the unseen data, with a citation to the exact moment it was said.
						</p>

						<div className="grid grid-cols-3 gap-3 mt-auto">
							<div>
								<p className="text-[1.4rem] font-serif text-accent-project leading-none">24,486</p>
								<p className="text-[9px] text-white/30 tracking-[0.05em] mt-1.5">embedded chunks</p>
							</div>

							<div>
								<p className="text-[1.4rem] font-serif text-accent-project leading-none">300+</p>
								<p className="text-[9px] text-white/30 tracking-[0.05em] mt-1.5">podcast episodes</p>
							</div>

							<div>
								<p className="text-[1.4rem] font-serif text-accent-project leading-none">31+ hrs</p>
								<p className="text-[9px] text-white/30 tracking-[0.05em] mt-1.5">video courses</p>
							</div>
						</div>
					</div>
				</div>

				<PipelineSection />

				{/* bottom grid - live demo + notes */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">

					{/* demo */}
					<GbteSearch />

					{/* Notes */}
					<div className="glass p-6 sm:p-7">
						<div
							onClick={() => setNotesOpen(!notesOpen)}
							className="flex justify-between items-center cursor-pointer select-none group"
						>
							<div className="flex items-center gap-2">
								<p className="text-[10px] tracking-[0.15em] uppercase text-white/25 group-hover:text-accent-project/50 transition-colors">
									Notes
								</p>
								<span className="text-sm text-white/25 leading-none mb-1 group-hover:text-accent-project/50 transition-colors">
									{notesOpen ? "▴" : "▾"}
								</span>
							</div>
						</div>

						{notesOpen && (
							<div className="notes-content text-xs text-white/35 leading-[1.8] mt-4">
								<ReactMarkdown>{notes}</ReactMarkdown>
							</div>
						)}
					</div>
				</div>
			</div>
		</main>
	)
}
