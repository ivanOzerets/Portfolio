import React from "react";

type Accent = "project" | "app" | "course" | null;

type PipelineNodeData = {
	name: string;
	description: string;
	url: string | null;
	accent: Accent;
};

const INGESTION_NODES: PipelineNodeData[] = [
	{ name: "yt-dlp", description: "Pulls mp3s from YouTube videos", url: "https://github.com/yt-dlp/yt-dlp", accent: null },
	{ name: "Whisper", description: "Transcribes audio with per-segment timestamps", url: "https://github.com/openai/whisper", accent: null },
	{ name: "LangChain splitter", description: "Splits transcript into 1500 char chunks", url: "https://python.langchain.com/", accent: null },
	{ name: "Titan Embed V2", description: "Embeds each chunk as a 1024-dim vector", url: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-amazon-titan-text-embeddings-v2.html", accent: "project" },
	{ name: "psycopg", description: "Connects to Aurora via IAM auth token", url: "https://www.psycopg.org/psycopg3/", accent: "app" },
	{ name: "Aurora | pgvector", description: "Inserts chunk, vector, and metadata", url: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html", accent: "course" },
];

const QUERY_NODES: PipelineNodeData[] = [
	{ name: "User Query", description: "Typed into the search box", url: null, accent: null },
	{ name: "Titan Embed V2", description: "Embeds the question the same way", url: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-amazon-titan-text-embeddings-v2.html", accent: "project" },
	{ name: "psycopg", description: "Connects to Aurora via IAM auth token", url: "https://www.psycopg.org/psycopg3/", accent: "app" },
	{ name: "Aurora | pgvector", description: "Cosine search the top 5 chunks", url: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html", accent: "course" },
	{ name: "Claude (Bedrock)", description: "Produces contextually accurate answer", url: "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html", accent: null },
	{ name: "WordPress plugin", description: "Renders the answer with citations", url: "https://developer.wordpress.org/plugins/", accent: null },
];

const ACCENT_BORDER: Record<Exclude<Accent, null>, string> = {
	project: "border-accent-project/40 bg-accent-project/[0.04] hover:border-accent-project/60",
	app: "border-accent-app/40 bg-accent-app/[0.04] hover:border-accent-app/60",
	course: "border-accent-course/40 bg-accent-course/[0.04] hover:border-accent-course/60",
};

const ACCENT_TEXT: Record<Exclude<Accent, null>, string> = {
	project: "text-accent-project",
	app: "text-accent-app",
	course: "text-accent-course",
};

function PipelineNode({ node }: { node: PipelineNodeData }) {
	const borderClass = node.accent ? ACCENT_BORDER[node.accent] : "border-white/[0.08] bg-black/20 hover:border-white/20";
	const textClass = node.accent ? ACCENT_TEXT[node.accent] : "text-foreground";

	const content = (
		<>
			<p className={`text-[11px] font-medium ${textClass}`}>{node.name}</p>
			<p className="text-[9px] text-white/35 leading-snug mt-1">{node.description}</p>
		</>
	);

	const baseClass = `rounded-lg border px-3 py-2.5 w-full lg:flex-1 lg:min-w-0 transition-colors ${borderClass}`;

	if (node.url) {
		return (
			<a href={node.url} target="_blank" rel="noopener noreferrer" className={`${baseClass} no-underline block`}>
				{content}
			</a>
		);
	}

	return <div className={baseClass}>{content}</div>;
}

function PipelineArrow() {
	return (
		<div className="flex items-center justify-center text-white/20 text-sm shrink-0 rotate-90 lg:rotate-0 my-1 lg:my-0 lg:mx-1.5">
			→
		</div>
	);
}

function PipelineFlow({ nodes }: { nodes: PipelineNodeData[] }) {
	return (
		<div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 lg:gap-0">
			{nodes.map((node, i) => (
				<React.Fragment key={node.name + i}>
					<PipelineNode node={node} />
					{i < nodes.length - 1 && <PipelineArrow />}
				</React.Fragment>
			))}
		</div>
	);
}

export default function PipelineSection() {
	return (
		<div className="glass p-6 sm:p-7 mb-4">
			<p className="text-[10px] tracking-[0.15em] uppercase text-white/25 mb-6">Pipelines</p>

			{/* mobile + tablet: two columns side by side, one shared header row */}
			<div className="lg:hidden">
				<div className="flex justify-between items-baseline mb-3">
					<p className="text-[9px] tracking-[0.1em] uppercase text-white/30">
						<span className="sm:hidden">Ingestion</span>
						<span className="hidden sm:inline">Ingestion | data to embeddings</span>
					</p>
					<p className="text-[9px] tracking-[0.1em] uppercase text-white/30 text-right">
						<span className="sm:hidden">Query</span>
						<span className="hidden sm:inline">Query | question to answer</span>
					</p>
				</div>
				<div className="grid grid-cols-2 gap-3">
					<PipelineFlow nodes={INGESTION_NODES} />
					<PipelineFlow nodes={QUERY_NODES} />
				</div>
			</div>

			{/* desktop: full-width horizontal rows, stacked */}
			<div className="hidden lg:block">
				<div className="mb-8">
					<p className="text-[9px] tracking-[0.1em] uppercase text-white/30 mb-3">
						Ingestion | data to embeddings
					</p>
					<PipelineFlow nodes={INGESTION_NODES} />
				</div>

				<div>
					<p className="text-[9px] tracking-[0.1em] uppercase text-white/30 mb-3">
						Query | question to answer
					</p>
					<PipelineFlow nodes={QUERY_NODES} />
				</div>
			</div>
		</div>
	);
}
