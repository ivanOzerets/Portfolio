"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import WaveGrid from "@/app/components/wave-grid";
import ReactMarkdown from "react-markdown";

const EXPLANATION = [
	{ step: "1", text: "Write out a list of things to do." },
	{ step: "2", text: "Scan the list backwards and mark tasks with no resistance." },
	{ step: "3", text: "Take action on the marked tasked from the end of the marked list." },
	{ step: "4", text: "Repeat the first three steps." }
]

const INSTALL_METHODS = [
	{ name: "Lazy", code: `{ "ivanOzerets/re-zero" }`, run: ":Lazy sync" },
	{ name: "Vim packages", code: `vim.pack.add({ "https://github.com/ivanOzerets/re-zero" })`, run: "" },
	{ name: "Packer", code: `use "ivanOzerets/re-zero"`, run: ":PackerSync (or :PackerInstall)" },
	{ name: "Vim-Plug", code: `Plug 'ivanOzerets/re-zero'`, run: ":PlugInstall" },
];

const COMMANDS = [
	{ name: ":ReZero", desc: "Open (or create) today's todo list" },
	{ name: ":ReZeroReview", desc: "Enter review mode" },
	{ name: ":ReZeroUpdate", desc: "Run the daily check, archiving finished tasks" },
];

const KEYMAPS = [
	{ keys: "<leader>tt", mode: "n", desc: "Save and open the todo list" },
	{ keys: "<CR>", mode: "n", desc: "Mark the task under the cursor as finished" },
	{ keys: "<leader>td", mode: "n", desc: "Add a new task to the pending list" },
	{ keys: "<leader>tr", mode: "n", desc: "Enter review mode" },
	{ keys: "<leader>tu", mode: "n", desc: "Run the daily check" },
	{ keys: "<CR>", mode: "i", desc: "Smart enter — continues the current list or header" },
	{ keys: "o", mode: "n", desc: "Smart o — continues the current list or header" },
];

const REVIEW_KEYMAPS = [
	{ keys: "h", desc: "Some resistance — prompts for a subtask" },
	{ keys: "j", desc: "No resistance — moves the task to active" },
	{ keys: "k", desc: "Completed — moves the task to finished" },
	{ keys: "u", desc: "Undo the last action" },
];

const FILE_FORMAT = [
	{ title: "TODO Date", desc: "The first line populates with the current date, referenced on every daily check." },
	{ title: "Active List", desc: "Tasks with zero resistance. Work through them top to bottom." },
	{ title: "Pending List", desc: "New or not-yet-triaged tasks, entered or reviewed at any time." },
	{ title: "Finished List", desc: "Completed tasks. Wiped clean at the start of each new day." },
];

const FEATURES = [
	{
		title: "Subtask System",
		description: "Prompts a smaller subtask any time a task has some resistance, filtering it back into the pending list alongside its parent task.",
		clip: "/videos/re-zero/subtask_system.mp4",
	},
	{
		title: "Review Mode",
		description: "A floating buffer displays pending tasks one at a time in reverse order — some resistance, no resistance, complete, or undo.",
		clip: "/videos/re-zero/review_mode.mp4",
	},
	{
		title: "Daily Archive",
		description: "Archives a snapshot of todo.md at the end of every day, updates the date, and wipes the finished list clean.",
		clip: "/videos/re-zero/daily_archive.mp4",
	},
	{
		title: "Smart Enter",
		description: "Pressing Enter or o creates a new task bullet exactly where you'd expect, inspired by Notion, VimWiki, and Org Mode.",
		clip: "/videos/re-zero/smart_enter.mp4",
	}
];

export default function ReZero() {
	const [notes, setNotes] = useState("");
	const [notesOpen, setNotesOpen] = useState(false);

	useEffect(() => {
		fetch("/notes/apps/re-zero/re-zero_notes.md").then(r => r.text()).then(setNotes);
	}, []);

	const [copiedMethod, setCopiedMethod] = useState<string | null>(null);

	const copyMethod = (name: string, code: string) => {
		navigator.clipboard.writeText(code);
		setCopiedMethod(name);
		setTimeout(() => setCopiedMethod(null), 2000);
	};

	return (
		<main className="min-h-screen bg-background text-foreground font-mono">
			<WaveGrid />

			<div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 pb-16">

				{/* back */}
				<Link href="/" className="text-white/30 no-underline text-[11px] tracking-[0.08em] inline-flex items-center gap-1.5 mb-8 hover:text-accent-app transition-colors">
					← back
				</Link>

				{/* header */}
				<div className="mb-8">
					<div className="flex items-center gap-3 mb-2">
						<span className="w-1.5 h-1.5 rounded-full bg-accent-app inline-block" />
						<span className="text-[9px] tracking-[0.15em] uppercase text-white/30">complete</span>
					</div>
					<h1 className="font-serif text-2xl sm:text-3xl lg:text-[3.2rem] font-normal tracking-tight mb-2">
						Re-Zero Neovim Plugin
					</h1>
					<p className="text-[11px] sm:text-[13px] text-white/40 leading-relaxed max-w-[560px]">
						An implementation of Mark Forster's Resistance Zero Productivity system.
					</p>
				</div>

				{/* hero section */}
				<div className="glass p-0 overflow-hidden mb-4 rounded-2xl">
					<video
						src="/videos/re-zero/re-zero_hero.mp4"
						autoPlay
						loop
						muted
						playsInline
						preload="none"
						className="w-full aspect-video object-cover"
					/>
				</div>

				{/* explanation and bindings */}
				<div className="glass p-6 sm:p-7 mb-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

						{/* explanation */}
						<div className="flex flex-col gap-5">
							<p className="text-[10px] tracking-[0.15em] uppercase text-white/25">Explanation</p>
							<div className="flex items-center gap-2">
								<p className="text-[9px] tracking-[0.12em] uppercase text-white/25">The System</p>
								<a
									href="http://markforster.squarespace.com/blog/2022/6/14/resistance-how-to-make-the-most-of-it-the-resistance-zero-sy.html"
									target="_blank"
									rel="noopener noreferrer"
									className="ml-6 self-start font-mono text-[10px] text-accent-app/60 hover:text-accent-app transition-colors no-underline"
								>
									↗ Resistance Zero by Mark Forster
								</a>
							</div>
							<div className="flex flex-col gap-3">
								{EXPLANATION.map((s) => (
									<div key={s.step} className="flex items-start gap-3">
										<span className="text-[9px] font-mono text-accent-app/50 mt-0.5 shrink-0 w-3">{s.step}</span>
										<span className="text-[11px] text-white/40 leading-relaxed">{s.text}</span>
									</div>
								))}
							</div>
							<div className="flex flex-col gap-3">
								<p className="text-[9px] tracking-[0.12em] uppercase text-white/25">Why It Works</p>
								<p className="text-[11px] text-white/40 leading-relaxed">
									Mr. Forster's system suggests a quick scan of all the tasks while still contemplating taking action on each one.
								</p>
								<p className="text-[11px] text-white/40 leading-relaxed">
									As the review process iterates, the skipped reviewed tasks lose resistance and will eventually become marked.
								</p>
								<blockquote className="border-l border-accent-app/20 pl-3 text-[11px] text-white/30 italic leading-relaxed">
									"I found that I got better results having the older slower moving tasks at the end of the scan, rather than at the beginning."
									<footer className="not-italic text-[9px] tracking-[0.1em] uppercase text-white/20 mt-1">— Mark Forster</footer>
								</blockquote>
								<p className="text-[11px] text-white/40 leading-relaxed">
									This psycological though process also applies to acting on tasks starting from the end of the list.
								</p>
							</div>
						</div>

						{/* bindings */}
						<div className="flex flex-col gap-5">
							<p className="text-[10px] tracking-[0.15em] uppercase text-white/25">Bindings</p>

							<div className="flex flex-col gap-2">
								<p className="text-[9px] tracking-[0.12em] uppercase text-white/25">Commands</p>
								<div className="flex flex-col gap-1.5">
									{COMMANDS.map((c) => (
										<div key={c.name} className="flex items-baseline gap-2.5">
											<span className="font-mono text-[10px] text-accent-app/60 shrink-0">{c.name}</span>
											<span className="font-mono text-[10px] text-white/35 leading-relaxed">{c.desc}</span>
										</div>
									))}
								</div>
							</div>

							<div className="flex flex-col gap-2">
								<p className="text-[9px] tracking-[0.12em] uppercase text-white/25">Keymaps</p>
								<div className="flex flex-col gap-1.5">
									{KEYMAPS.map((k) => (
										<div key={`${k.mode}-${k.keys}`} className="flex items-baseline gap-2.5">
											<span className="font-mono text-[10px] text-accent-app/60 shrink-0">{k.keys}</span>
											<span className="font-mono text-[8px] text-white/20 shrink-0 uppercase">{k.mode}</span>
											<span className="font-mono text-[10px] text-white/35 leading-relaxed">{k.desc}</span>
										</div>
									))}
								</div>
							</div>

							<div className="flex flex-col gap-2">
								<p className="text-[9px] tracking-[0.12em] uppercase text-white/25">Review Mode</p>
								<div className="flex flex-col gap-1.5">
									{REVIEW_KEYMAPS.map((r) => (
										<div key={r.keys} className="flex items-baseline gap-2.5">
											<span className="font-mono text-[10px] text-accent-app/60 shrink-0">{r.keys}</span>
											<span className="font-mono text-[10px] text-white/35 leading-relaxed">{r.desc}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* feature clips - 2x2 grid */}
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

				{/* file format & installation */}
				<div className="glass p-6 sm:p-7 mb-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

						{/* file format */}
						<div className="flex flex-col gap-5">
							<p className="text-[10px] tracking-[0.15em] uppercase text-white/25">File Format</p>
							<p className="text-[9px] tracking-[0.12em] uppercase text-white/25">todo.md by default</p>
							<p className="text-[11px] text-white/40 leading-relaxed">
								todo.md is auto-populated with these four headers on first open
							</p>
							<div className="flex flex-col gap-2.5">
								{FILE_FORMAT.map((f) => (
									<div key={f.title} className="flex flex-col gap-0.5 border-l border-accent-app/20 pl-3">
										<span className="font-mono text-[10px] text-white/50">{f.title}</span>
										<span className="font-mono text-[10px] text-white/35 leading-relaxed">{f.desc}</span>
									</div>
								))}
							</div>
						</div>

						{/* installation */}
						<div className="flex flex-col gap-5">
							<p className="text-[10px] tracking-[0.15em] uppercase text-white/25">Installation</p>
							<p className="text-[9px] tracking-[0.12em] uppercase text-white/25">
								Neovim v0.12+
								<span className="text-white/15 mx-2">|</span>
								<span className="text-white/15">v0.9+ should work</span>
							</p>
							<div className="flex flex-col gap-2.5">
								{INSTALL_METHODS.map((m) => (
									<div key={m.name} className="flex flex-col gap-0.5 border-l border-accent-app/20 pl-3">
										<span className="font-mono text-[10px] text-white/50">{m.name}</span>
										<button
											onClick={() => copyMethod(m.name, m.code)}
											className="font-mono text-[10px] text-white/35 hover:text-accent-app transition-colors cursor-pointer bg-transparent border-none p-0 text-left leading-relaxed"
										>
											{m.code}
										</button>
										{m.run && (
											<span className="font-mono text-[10px] text-white/25 leading-relaxed">{m.run}</span>
										)}
									</div>
								))}
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
							<ReactMarkdown>{notes}</ReactMarkdown>
						</div>
					)}
				</div>

			</div>

			{copiedMethod && (
				<div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-accent-app/[0.08] border border-accent-app/25 text-accent-app font-mono text-[11px] tracking-[0.05em] px-4 py-2 rounded z-[100] backdrop-blur-lg whitespace-nowrap">
					copied to clipboard
				</div>
			)}
		</main>
	);
}
