"use client";
import { useState } from "react";

type Citation = { title: string; url: string };
type SearchResult = { answer: string; citations: Citation[] };

const API_URL = "https://pkzvniqch1.execute-api.us-east-2.amazonaws.com/search";

function extractTimestamp(url: string): number {
	const match = url.match(/[?&]t=(\d+)s/);

	return match ? parseInt(match[1], 10) : 0;
}

function formatTimestamp(seconds: number): string {
	const hrs = Math.floor(seconds / 3600);
	const mins = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;
	const paddedMins = String(mins).padStart(2, "0");
	const paddedSecs = String(secs).padStart(2, "0");
	
	return hrs > 0 ? `${hrs}:${paddedMins}:${paddedSecs}` : `${mins}:${paddedSecs}`;
}

function renderAnswer(text: string) {
	const lines = text.split("\n");

	return lines.map((line, i) => (
		<span key={i}>
			{line.split(/(\*\*.*?\*\*)/g).map((part, j) =>
				part.startsWith("**") && part.endsWith("**")
					? <strong key={j} className="text-white/90 font-medium">{part.slice(2, -2)}</strong>
					: part
			)}
			{i < lines.length - 1 && <br />}
		</span>
	));
}

export default function GbteSearch() {
	const [question, setQuestion] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [result, setResult] = useState<SearchResult | null>(null);
	const [submitted, setSubmitted] = useState(false);

	const runSearch = async () => {
		if (!question.trim() || loading) return;
		setSubmitted(true);
		setLoading(true);
		setError(null);
		setResult(null);

		try {
			const res = await fetch(API_URL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ question }),
			});

			if (!res.ok) throw new Error("Request failed");

			setResult(await res.json());
		} catch {
			setError("Something went wrong. Please retry, the database may be spinning up.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="glass p-6 sm:p-7 min-w-0">
			<p className="text-[10px] tracking-[0.15em] uppercase text-white/25 mb-5">Live demo</p>

			<div className="relative w-full">
				<input
					type = "text"
					value = {question}
					onChange = {e => {
						const v = e.target.value;
						setSubmitted(false);
						setQuestion(v.length > 0 ? v.charAt(0).toUpperCase() + v.slice(1) : v);
					}}

					onKeyDown = {e => e.key === "Enter" && runSearch()}
					placeholder = "Ask a tennis question…"
					className = {`w-full bg-black/20 border border-white/[0.08] rounded-lg pl-3 pr-10 py-2 text-[12px] placeholder:text-white/25 focus:outline-none focus:border-accent-project/40 transition-colors ${submitted ? "text-white/40" : "text-foreground"}`}
				/>

				<button
					onClick = {runSearch}
					disabled = {loading}
					aria-label = "Search"
					className = "absolute right-0 top-0 h-full w-10 flex items-center justify-center text-white/40 hover:text-accent-project disabled:opacity-40 transition-colors"
				>
					<svg viewBox = "0 0 24 24" width = "15" height = "15" fill = "none" stroke = "currentColor" strokeWidth = "2" strokeLinecap = "round" className = {loading ? "animate-pulse" : ""}>
						<circle cx = "10" cy = "10" r = "6" />
						<line x1 = "15" y1 = "15" x2 = "20" y2 = "20" />
					</svg>
				</button>
			</div>

			{error && <p className = "text-[10px] text-red-400/70 tracking-[0.05em] mt-3">{error}</p>}

			{result && (
				<div className = "mt-5 max-h-[280px] overflow-y-auto pr-1">
					<p className = "text-[9px] tracking-[0.1em] uppercase text-white/25 mb-2">Answer</p>

					<p className = "text-[12px] text-white/70 leading-relaxed break-words">{renderAnswer(result.answer)}</p>

					<p className = "text-[10px] text-white/30 italic mt-3">
						Answers are generated from GBTE's video library and may not always be fully accurate.
					</p>

					<p className = "text-[9px] tracking-[0.1em] uppercase text-white/25 mt-4 mb-2">Sources</p>

					<ul className="flex flex-col gap-1.5">
						{result.citations.map((c, i) => (
							<li key={i} className = "min-w-0">
								<a
									href = {c.url}
									target = "_blank"
									rel = "noopener noreferrer"
									className = "text-[11px] text-accent-project no-underline hover:underline break-words"
								>
									{c.title}
								</a>

								<span className = "text-[10px] text-white/30 ml-1.5">
									({formatTimestamp(extractTimestamp(c.url))})
								</span>
							</li>
						))}
					</ul>
				</div>
			)}

			{loading && (
				<div className="mt-4 h-[50px] flex items-center justify-center">
					<img
						src = "/images/gbte-rag-search/tennis-ball.gif"
						alt = "Searching"
						className = "h-[50px] w-auto"
					/>
				</div>
			)}
		</div>
	);
}
