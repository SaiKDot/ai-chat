/* Shared TS interfaces + mock data matching the Stitch designs. All data is local/mock. */

/* ---------- Chat ---------- */

export interface CodeLine {
  tokens: { text: string; color?: string }[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: string;
  streaming?: boolean;
  /** Renders the rich showcase body (code block + telemetry footer) */
  showcase?: boolean;
}

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    role: "user",
    timestamp: "14:02:18",
    text: "Write a high-performance FastAPI endpoint with Server-Sent Events (SSE) streaming for raw OpenAI completions with backpressure.",
  },
  {
    id: "m2",
    role: "assistant",
    timestamp: "14:02:21",
    text: "",
    showcase: true,
  },
];

export const PYTHON_CODE_LINES: CodeLine[] = [
  {
    tokens: [
      { text: "from", color: "text-secondary" },
      { text: " fastapi " },
      { text: "import", color: "text-secondary" },
      { text: " FastAPI, Request" },
    ],
  },
  {
    tokens: [
      { text: "from", color: "text-secondary" },
      { text: " sse_starlette.sse " },
      { text: "import", color: "text-secondary" },
      { text: " EventSourceResponse" },
    ],
  },
  { tokens: [{ text: "import", color: "text-secondary" }, { text: " openai" }] },
  { tokens: [{ text: "" }] },
  { tokens: [{ text: "app = FastAPI()" }] },
  { tokens: [{ text: "client = openai.AsyncOpenAI()" }] },
  { tokens: [{ text: "" }] },
  {
    tokens: [
      { text: "@app.get", color: "text-tertiary" },
      { text: "(" },
      { text: '"/api/stream"', color: "text-primary-fixed" },
      { text: ")" },
    ],
  },
  {
    tokens: [
      { text: "async def", color: "text-secondary" },
      { text: " " },
      { text: "stream_tokens", color: "text-surface-tint" },
      { text: "(prompt: " },
      { text: "str", color: "text-secondary" },
      { text: ", req: Request):" },
    ],
  },
  {
    tokens: [
      { text: "    " },
      { text: "async def", color: "text-secondary" },
      { text: " " },
      { text: "event_generator", color: "text-surface-tint" },
      { text: "():" },
    ],
  },
  {
    tokens: [
      { text: "        stream = " },
      { text: "await", color: "text-secondary" },
      { text: " client.chat.completions.create(" },
    ],
  },
  {
    tokens: [
      { text: "            model=" },
      { text: '"gpt-4o"', color: "text-primary-fixed" },
      { text: ", stream=" },
      { text: "True", color: "text-tertiary" },
      { text: ")" },
    ],
  },
];

/* ---------- Sessions ---------- */

export type ThreadCategory = "code" | "vision" | "rag";

export interface SessionThread {
  id: string;
  title: string;
  icon: string;
  iconColor: string;
  preview: string;
  category: ThreadCategory;
  tags: { label: string; color?: string }[];
  timeAgo: string;
  active?: boolean;
  attachment?: { label: string };
}

export interface SessionGroup {
  label: string;
  labelColor: string;
  threads: SessionThread[];
}

export const SESSION_GROUPS: SessionGroup[] = [
  {
    label: "Today",
    labelColor: "text-primary",
    threads: [
      {
        id: "t1",
        title: "FastAPI SSE Streaming with Backpressure",
        icon: "terminal",
        iconColor: "text-primary",
        preview:
          "Handling client disconnections gracefully in async generator stream loops...",
        category: "code",
        tags: [
          { label: "OpenAI gpt-4o", color: "text-primary" },
          { label: "14 msgs" },
        ],
        timeAgo: "2m ago",
        active: true,
      },
      {
        id: "t2",
        title: "Architecture Diagram Latency Bottlenecks",
        icon: "image_search",
        iconColor: "text-secondary",
        preview:
          "Analysis of edge CDN proxy hop versus origin server SSE connection delays...",
        category: "vision",
        tags: [
          { label: "Gemini Vision", color: "text-secondary" },
          { label: "6 msgs" },
        ],
        timeAgo: "45m ago",
        attachment: { label: "1 diagram annotated" },
      },
    ],
  },
  {
    label: "Yesterday",
    labelColor: "text-tertiary",
    threads: [
      {
        id: "t3",
        title: "pgvector HNSW Index Optimization",
        icon: "database",
        iconColor: "text-tertiary",
        preview:
          "Tuning m=16 and ef_construction=64 for sub-10ms similarity queries across 1M chunks...",
        category: "rag",
        tags: [
          { label: "RAG Ingestion", color: "text-tertiary" },
          { label: "22 msgs" },
          { label: "1.2k tokens" },
        ],
        timeAgo: "1d ago",
      },
      {
        id: "t4",
        title: "Next.js EventSource Reconnect Logic",
        icon: "sync_saved_locally",
        iconColor: "text-primary",
        preview:
          "Client state hydration after cellular tunnel interruption using custom headers...",
        category: "code",
        tags: [{ label: "OpenAI", color: "text-primary" }, { label: "8 msgs" }],
        timeAgo: "1d ago",
      },
    ],
  },
  {
    label: "Previous 7 Days",
    labelColor: "text-on-surface-variant",
    threads: [
      {
        id: "t5",
        title: "PostgreSQL Database Schema & Migration",
        icon: "storage",
        iconColor: "text-on-surface-variant",
        preview:
          "Foreign key cascade rules for guest sessions and ephemeral prompt logs...",
        category: "code",
        tags: [{ label: "UUID Guest Auth", color: "text-on-surface-variant" }],
        timeAgo: "4d ago",
      },
    ],
  },
];

export interface SessionFilter {
  id: "all" | ThreadCategory;
  label: string;
  dotColor?: string;
  count?: number;
}

export const SESSION_FILTERS: SessionFilter[] = [
  { id: "all", label: "All", count: 18 },
  { id: "code", label: "Code & FastAPI", dotColor: "bg-primary" },
  { id: "vision", label: "Vision Analysis", dotColor: "bg-secondary" },
  { id: "rag", label: "RAG Queries", dotColor: "bg-tertiary" },
];

/* ---------- Knowledge ---------- */

export interface RetrievedChunk {
  id: string;
  ref: string;
  source: string;
  score: string;
  highMatch?: boolean;
  scoreColor: string;
  content: string;
  code?: boolean;
  meta: string;
}

export const RETRIEVED_CHUNKS: RetrievedChunk[] = [
  {
    id: "c1",
    ref: "#402",
    source: "doc_42 • p.7",
    score: "0.942 HIGH MATCH",
    highMatch: true,
    scoreColor: "text-primary",
    code: true,
    content:
      '...StreamingResponse(event_generator(), media_type="text/event-stream")... async def event_generator(): async for token in engine.stream_tokens(): if await client.is_disconnected(): break yield f"data: {token}\\n\\n"',
    meta: "512 chars • 108 tokens",
  },
  {
    id: "c2",
    ref: "#188",
    source: "doc_42 • p.12",
    score: "0.887",
    scoreColor: "text-secondary-fixed",
    content:
      "FastAPI asynchronous generators naturally yield execution control back to the asyncio event loop between frames, preventing client buffer overflow and stabilizing memory pressure during burst token emission.",
    meta: "488 chars • 94 tokens",
  },
  {
    id: "c3",
    ref: "#912",
    source: "doc_42 • p.24",
    score: "0.814",
    scoreColor: "text-on-surface-variant",
    content:
      "The pgvector HNSW cosine distance cutoff threshold is calibrated to 0.75 for context pruning. Chunks falling below the hyper-plane score are omitted from LLM prompt construction to conserve context window budget.",
    meta: "510 chars • 102 tokens",
  },
];

export interface VectorStat {
  icon: string;
  iconColor: string;
  label: string;
  value: string;
  valueClass: string;
  suffix?: string;
  footnote: string;
  footnoteClass?: string;
  pulse?: boolean;
}

export const VECTOR_STATS: VectorStat[] = [
  {
    icon: "database",
    iconColor: "text-tertiary",
    label: "Vector Store",
    value: "pgvector",
    valueClass: "font-headline-sm text-headline-sm text-on-surface truncate",
    footnote: "PostgreSQL 16.2",
  },
  {
    icon: "view_in_ar",
    iconColor: "text-primary",
    label: "Total Chunks",
    value: "14,280",
    valueClass: "font-headline-sm text-headline-sm text-primary",
    suffix: "pts",
    footnote: "1536d • Cosine",
  },
  {
    icon: "memory",
    iconColor: "text-secondary",
    label: "Embedding Model",
    value: "text-embedding-3",
    valueClass: "font-body-md text-body-md text-on-surface font-medium truncate",
    footnote: "OpenAI v1.40.0",
    footnoteClass: "text-secondary",
  },
  {
    icon: "speed",
    iconColor: "text-primary",
    label: "Index Health",
    value: "HNSW Active",
    valueClass: "font-label-mono-sm text-label-mono-sm text-primary",
    footnote: "m=16 • ef=64",
    pulse: true,
  },
];

/* ---------- Vision ---------- */

export interface LatencyCheckpoint {
  icon: string;
  iconColor: string;
  title: string;
  description: { text: string; strong?: boolean }[];
}

export const LATENCY_CHECKPOINTS: LatencyCheckpoint[] = [
  {
    icon: "schedule",
    iconColor: "text-tertiary",
    title: "Ingestion Pipeline Bottleneck",
    description: [
      { text: "Vector embedding generation introduces roughly " },
      { text: "~180ms", strong: true },
      { text: " on the client payload before pgvector index evaluation." },
    ],
  },
  {
    icon: "hub",
    iconColor: "text-primary",
    title: "HNSW Index Lookup",
    description: [
      { text: "pgvector HNSW index search executes at " },
      { text: "~12ms for top_k=5", strong: true },
      { text: ", well within typical vector cache thresholds." },
    ],
  },
  {
    icon: "stream",
    iconColor: "text-secondary",
    title: "Time-to-First-Token (TTFT) Amortization",
    description: [
      {
        text: "FastAPI SSE streaming flushes chunked tokens directly to the Next.js client, masking downstream model inference delays.",
      },
    ],
  },
];

export interface MediaStat {
  label: string;
  value: string;
}

export const MEDIA_STATS: MediaStat[] = [
  { label: "Resolution", value: "1080 × 720" },
  { label: "Payload Size", value: "142 KB" },
  { label: "Format", value: "PNG / RGB" },
];

export const VISION_ACTIONS = [
  { icon: "view_timeline", iconColor: "text-secondary", label: "Inspect Chunks" },
  { icon: "swap_horiz", iconColor: "text-primary", label: "Re-route to OpenAI Vision" },
  { icon: "download", iconColor: "text-tertiary", label: "Download Analysis" },
];
