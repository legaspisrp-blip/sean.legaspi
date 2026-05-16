// data.jsx - content store
const PROFILE = {
  name: "Sean Rovick P. Legaspi",
  shortName: "Sean Legaspi",
  initial: "S",
  role: "Operations & Administrative Specialist",
  tagline: "Data, Research & Digital Systems",
  location: "Metro Manila · Philippines",
  email: "legaspi.srp@gmail.com",
  phone: "+63 950 617 0178",
  linkedin: "linkedin.com/in/sean-legaspi-543a7b355",
  linkedinUrl: "https://www.linkedin.com/in/sean-legaspi-543a7b355",
  medium: "medium.com/@legaspi.srp",
  availability: "Available for remote work",
  years: "6+",
  since: "2019",
  photo: "assets/sean.jpg",
};

const METRICS = [
  { num: "6", sup: "+", label: "Years building operations systems" },
  { num: "12", sup: "", label: "Amazon products launched in 5 months" },
  { num: "99", sup: "%", label: "Document accuracy at scale" },
  { num: "100", sup: "+", label: "Docs processed per day at peak" },
];

const SKILL_KEYWORDS = [
  "Operations", "SOP Design", "Workflow Automation", "Data Enrichment",
  "Inventory Management", "Web3 Research", "HIPAA Compliance", "QuickBooks",
  "Amazon FBA", "Influencer Analytics", "Procurement",
];

const CASES = [
  {
    id: "blackvault",
    current: true,
    company: "Black Vault Media",
    role: "Executive Virtual Assistant",
    industry: "Media / Agency",
    type: "Current role",
    color: "#1a1815",
    tagline: "Executive support for a media agency: calendar, inbox, client coordination, and project tracking.",
    overview:
      "Acting as the right-hand for the founder. Triage the inbox, run the calendar, coordinate with creators and clients, keep projects moving across the team. The role is glue-work done well so the founder can focus on the things only the founder can do.",
    problem: [
      "Founder's inbox and calendar were swallowing the day before any strategic work could begin.",
      "Project status was scattered across DMs, threads, and the founder's head.",
      "Client touchpoints needed faster, more consistent responses without losing voice.",
    ],
    approach: [
      "Took ownership of the inbox with a triage taxonomy and templated replies in the founder's voice.",
      "Built a single project tracker (status, owner, next action, due date) reviewed in a weekly 1:1.",
      "Set up a calendar policy with deep-work blocks and standardized meeting types.",
      "Manage vendor and client communications with clear SLAs.",
    ],
    outcomes: [
      { n: "Daily", l: "Inbox to zero" },
      { n: "1:1", l: "Weekly status sync" },
      { n: "Calm", l: "Founder calendar" },
    ],
    stack: ["Gmail", "Google Calendar", "Notion", "ClickUp", "Slack", "Loom"],
    quote: "Executive partner work: making the founder's time more leveraged by owning everything that isn't theirs to own.",
  },
  {
    id: "ntc",
    current: true,
    company: "NTC Accounting Firm",
    role: "Accounting Support",
    industry: "Accounting / Finance",
    type: "Current role",
    color: "#2a4a3a",
    tagline: "Bookkeeping, document operations, and client file management for a working accounting practice.",
    overview:
      "Hands-on accounting support: bookkeeping entries, reconciliations, client document intake, and keeping the working papers tidy for the senior accountants. The job is invisible done right, visible done wrong, so I keep it invisible.",
    problem: [
      "Client documents arrive in many formats and need to be normalized before they're usable.",
      "Reconciliations get bogged down when source files aren't tagged and stored cleanly.",
      "Senior accountants lose time chasing missing receipts or unclear entries.",
    ],
    approach: [
      "Standardized intake checklist for every new client engagement.",
      "Indexed digital working papers so any senior accountant can find a document in seconds.",
      "Pre-checked and tagged transactions before the senior reviewer touches them.",
      "Flag discrepancies with context so they can be resolved in one pass.",
    ],
    outcomes: [
      { n: "Clean", l: "Working papers" },
      { n: "Fewer", l: "Review cycles" },
      { n: "Faster", l: "Close periods" },
    ],
    stack: ["QuickBooks Online", "Excel", "Google Sheets", "PDF tooling"],
    quote: "Accountancy degree in practice: bookkeeping and document operations at the level a senior accountant can rely on.",
  },
  {
    id: "isaless",
    current: true,
    company: "ISALESS",
    role: "Database & Campaign Support",
    industry: "Sales / Marketing Ops",
    type: "Current role",
    color: "#3a5a8a",
    tagline: "Keeping the sales database clean and the outbound campaigns moving on schedule.",
    overview:
      "Database hygiene and campaign coordination for an outbound sales operation. Lists are only as good as their last cleanup, and campaigns only land when the data behind them is right.",
    problem: [
      "Lead lists accumulate duplicates, bounced emails, and stale records that quietly tank deliverability.",
      "Campaign launches slip when the segmentation prep isn't done.",
      "Reps need clean enriched data, not raw exports.",
    ],
    approach: [
      "Run a recurring data hygiene routine: dedupe, verify, enrich, retire dead records.",
      "Build segmented lists by ICP, persona, and campaign before each send.",
      "Coordinate launch checklists and post-campaign reporting.",
      "Maintain CRM data integrity standards so reps trust what they see.",
    ],
    outcomes: [
      { n: "Higher", l: "Deliverability" },
      { n: "On-time", l: "Campaign launches" },
      { n: "Clean", l: "CRM source-of-truth" },
    ],
    stack: ["HubSpot", "Apollo", "Excel", "Google Sheets", "Make"],
    quote: "Sales velocity is downstream of database hygiene. I keep the upstream clean.",
  },
  {
    id: "studentworld",
    current: true,
    company: "Student World Pte Ltd",
    role: "Junior Visa Processing Assistant",
    industry: "Immigration / EdTech",
    type: "Current role",
    color: "#6a4a3a",
    tagline: "Supporting international student visa applications: documents, deadlines, applicant communications.",
    overview:
      "Junior support on the visa processing team. Each application is a compliance-sensitive document workflow with hard deadlines and an anxious applicant on the other end, so the job is equal parts precision and bedside manner.",
    problem: [
      "Visa applications are document-heavy and easy to delay if a single piece is missing.",
      "Applicants get anxious when status is unclear.",
      "Compliance requirements vary by destination country and change often.",
    ],
    approach: [
      "Built an applicant checklist tailored to each destination country.",
      "Track every open application against deadlines with proactive nudges.",
      "Communicate status updates to applicants clearly and on a regular cadence.",
      "Flag complex cases to senior officers with the document trail already organized.",
    ],
    outcomes: [
      { n: "0", l: "Missed deadlines" },
      { n: "Clear", l: "Applicant updates" },
      { n: "Tidy", l: "Document trail" },
    ],
    stack: ["Internal CRM", "Google Workspace", "Trello", "Excel"],
    quote: "Compliance-sensitive document operations with a human voice on every reply.",
  },
  {
    id: "mnt",
    company: "MNT Scientific, LLC",
    role: "Medical Administrative & Operations Manager",
    industry: "Healthcare",
    type: "Past role",
    color: "#c2502a",
    tagline: "Took a backlogged healthcare practice and rebuilt the operating system underneath it.",
    overview:
      "Stepped in to lead daily admin operations for a US healthcare practice. Inherited an overflowing inbox, fragmented workflows, and a team without clear ownership. Within five months I had backlogs cleared, SOPs documented, and KPIs on the wall.",
    problem: [
      "Patient communications, intake, and insurance verification all lived in one shared inbox with no triage rules.",
      "There were no written procedures, so onboarding a new admin meant shoulder-surfing.",
      "Insurance claims were being rejected because eligibility wasn't being verified upstream.",
    ],
    approach: [
      "Mapped every recurring task to an owner, a tool, and an SLA.",
      "Wrote SOPs for onboarding, insurance verification, scheduling, and patient communications.",
      "Built inbox routing and a task tracker so nothing sat unread for more than 24 hours.",
      "Set up weekly KPI reviews on response time, claim accuracy, and backlog age.",
    ],
    outcomes: [
      { n: "0", l: "Backlog (from weeks)" },
      { n: "<24h", l: "Response SLA" },
      { n: "5", l: "SOPs documented" },
    ],
    stack: ["EMR", "Insurance portals", "Google Workspace", "Notion", "HIPAA"],
    quote: "Reorganized practice operations, eliminated administrative backlogs, and developed SOPs that improved team coordination, response times, and accountability.",
  },
  {
    id: "alpha",
    company: "Alpha Mail Media",
    role: "KOL Research & Data Enrichment Specialist",
    industry: "Web3 / Crypto",
    type: "Past role",
    color: "#9a6b3a",
    tagline: "Hunted high-signal KOLs across crypto Twitter, YouTube, and Telegram, and proved which ones were worth a partnership.",
    overview:
      "Crypto marketing lives or dies on influencer quality. I built and maintained the research stack that screened thousands of KOLs for follower authenticity, engagement consistency, and niche fit before a single dollar of partnership budget was spent.",
    problem: [
      "Bought lists were inflated with bots and recycled accounts.",
      "Engagement rates looked good on paper but didn't convert.",
      "No single source of truth for influencer history, niche, or contact info.",
    ],
    approach: [
      "Built a structured KOL database with engagement ratios, niche tags, audience checks, and campaign history.",
      "Cross-platform verification (X, YouTube, Telegram) to flag suspicious follower curves.",
      "Standardized data hygiene rules: deduplication, contact verification, niche taxonomy.",
      "Weekly market intelligence briefs on token narratives and competitor campaigns.",
    ],
    outcomes: [
      { n: "1000s", l: "KOLs evaluated" },
      { n: "4+", l: "Platforms tracked" },
      { n: "↑", l: "Outreach hit-rate" },
    ],
    stack: ["X / Twitter", "YouTube Analytics", "Telegram", "Airtable", "Notion"],
    quote: "Generated high-quality lead lists supporting influencer partnerships and strengthened outreach efficiency through enriched and verified influencer data.",
  },
  {
    id: "uppsyde",
    company: "Uppsyde",
    role: "Procurement & Product Research Assistant",
    industry: "E-commerce / Amazon",
    type: "Past role",
    color: "#7a8a4a",
    tagline: "Sourced and shipped twelve Amazon SKUs in five months: research first, supplier negotiations second.",
    overview:
      "Acted as the bridge between Amazon market signals and the supplier floor. Validated demand with rank/competition/margin analysis, negotiated landed costs, and tracked the freight all the way to FBA.",
    problem: [
      "Product ideas were being launched on instinct, not data.",
      "Margins were getting squeezed by hidden landed costs.",
      "Shipments were arriving late and missing replenishment windows.",
    ],
    approach: [
      "Built a sourcing scorecard: rank trend, review count, competitor density, projected margin.",
      "Negotiated MOQs, payment terms, and production timelines with domestic and overseas suppliers.",
      "Created a shipment tracker tying each PO to a freight reference and an FBA replenishment date.",
      "Wrote listings: descriptions, keyword research, competitive positioning.",
    ],
    outcomes: [
      { n: "12", l: "SKUs launched in 5 mo" },
      { n: "↑", l: "Margin from negotiation" },
      { n: "↓", l: "Stockout incidents" },
    ],
    stack: ["Helium 10", "Seller Central", "Alibaba", "Excel", "Slack"],
    quote: "Successfully launched 12 products within 5 months through market research, supplier sourcing, and proactive shipment monitoring.",
  },
  {
    id: "dynamic",
    company: "Dynamic Voice & Data",
    role: "E-commerce Administrative Virtual Assistant",
    industry: "E-commerce / B2B",
    type: "Past role",
    color: "#5a6f8a",
    tagline: "Ran the back office of a B2B e-commerce operation: listings, orders, AR/AP, FBA inventory.",
    overview:
      "Owned the unglamorous-but-critical layer: product data integrity across the website + Amazon, order accuracy, invoicing, AR reminders, FBA inventory tuning, and QuickBooks bookkeeping.",
    problem: [
      "SKU and pricing drift between the website and Amazon was creating order errors.",
      "Outstanding AR was sitting too long without follow-up.",
      "FBA inventory was oscillating between stockout and overstock.",
    ],
    approach: [
      "Built a single product master and pushed updates to both channels from one source.",
      "Set up an AR aging routine with templated reminders at 7/14/30 days.",
      "Tuned FBA replenishment using sales velocity + lead time + safety stock.",
      "Cleaned and migrated financial + inventory data into QuickBooks for reporting.",
    ],
    outcomes: [
      { n: "↓", l: "Fulfillment errors" },
      { n: "↑", l: "Cash flow recovery" },
      { n: "0", l: "Major stockouts" },
    ],
    stack: ["QuickBooks", "Amazon Seller", "WooCommerce", "Excel", "Slack"],
    quote: "Improved order processing accuracy, strengthened cash flow through AR follow-ups, and prevented stockouts through proactive FBA monitoring.",
  },
  {
    id: "pnj",
    company: "PNJ Financial Solutions",
    role: "Social Media Manager & Content Creator",
    industry: "Insurance / Marketing",
    type: "Past role",
    color: "#8a4a6f",
    tagline: "Two-year content engine for an insurance brand: calendars, creatives, Reels, blog posts.",
    overview:
      "Built and ran the social presence for an insurance company and its subsidiaries. Strategy → calendar → creative → publish → measure → refine.",
    problem: [
      "Inconsistent posting cadence with no clear brand voice across the subsidiaries.",
      "No measurement loop: content went out, then silence.",
      "Creative production was reactive and bottlenecked.",
    ],
    approach: [
      "Monthly content calendar tied to seasonal insurance topics and campaigns.",
      "Designed posters, carousels, short-form video and Reels in a consistent visual system.",
      "Reviewed engagement / reach / impressions weekly and re-allocated formats.",
      "Wrote blog posts mapped to lead-gen keywords.",
    ],
    outcomes: [
      { n: "2yr", l: "Sustained cadence" },
      { n: "↑", l: "Engagement & reach" },
      { n: "↑", l: "Inquiries from social" },
    ],
    stack: ["Meta Business", "Canva", "CapCut", "Notion", "Google Analytics"],
    quote: "Increased social media engagement through structured content planning and analytics-driven strategies that supported business growth.",
  },
  {
    id: "pref",
    company: "Private Real Estate Firm (PREF)",
    role: "Data Entry Specialist",
    industry: "Real Estate",
    type: "Past role",
    color: "#6a7a8a",
    tagline: "Processed 100+ contracts, lien waivers and insurance docs per day at 99% accuracy.",
    overview:
      "High-volume document operations role. The metrics tell the story: throughput, accuracy, and speed under load.",
    problem: [
      "Document volume was exceeding manual processing capacity.",
      "Errors downstream were costing the firm time on reconciliations.",
      "Records weren't retrievable when needed for audits.",
    ],
    approach: [
      "Standardized intake checks: completeness and compliance before system entry.",
      "Tagged and indexed digital records for fast retrieval.",
      "Flagged discrepancies and built a resolution log with internal teams.",
    ],
    outcomes: [
      { n: "100+", l: "Docs / day" },
      { n: "99%", l: "Data accuracy" },
      { n: "<5min", l: "Avg per doc" },
    ],
    stack: ["Internal CRM", "Excel", "PDF tooling"],
    quote: "Maintained 99% data accuracy through careful verification and quality checks at high throughput.",
  },
  {
    id: "freelance",
    company: "Freelance Writing & Research",
    role: "Writer & Researcher",
    industry: "Writing / Research",
    type: "First role",
    color: "#4a4a4a",
    tagline: "Where it all started: freelance writing, editing, and research for academic and business clients.",
    overview:
      "My very first role. Two years of freelance writing and research while I finished my accountancy degree. I learned to write for an audience that wasn't me, to research things I didn't already know, and to deliver clean work on a deadline. Everything since has been built on those habits.",
    problem: [
      "Clients needed clear writing and credible research, often on tight timelines.",
      "Academic and business writing have different rules and tones.",
      "Multiple projects in flight at once required disciplined coordination.",
    ],
    approach: [
      "Adapted writing style and tone to client guidelines and audience.",
      "Researched using credible sources and verified claims before drafting.",
      "Edited and proofread to improve grammar, structure, and clarity.",
      "Managed simultaneous projects while keeping every deadline.",
    ],
    outcomes: [
      { n: "Repeat", l: "Client referrals" },
      { n: "On-time", l: "Every delivery" },
      { n: "2 yrs", l: "Self-taught discipline" },
    ],
    stack: ["Google Docs", "Grammarly", "Scholar databases", "PDF tooling"],
    quote: "Supported students with thesis writing and research, and helped business clients strengthen written communication with clear, structured, professional content.",
  },
];

const TOOLS = [
  // Productivity & Ops
  { name: "Notion", slug: "notion", color: "#000000", group: "Productivity" },
  { name: "ClickUp", slug: "clickup", color: "#7B68EE", group: "Productivity" },
  { name: "Asana", slug: "asana", color: "#F06A6A", group: "Productivity" },
  { name: "Trello", slug: "trello", color: "#0052CC", group: "Productivity" },
  { name: "Airtable", slug: "airtable", color: "#18BFFF", group: "Productivity" },
  { name: "Slack", slug: "slack", color: "#4A154B", group: "Productivity" },
  { name: "Loom", slug: "loom", color: "#625DF5", group: "Productivity" },
  { name: "Zoom", slug: "zoom", color: "#0B5CFF", group: "Productivity" },
  // Google Workspace
  { name: "Gmail", slug: "gmail", color: "#EA4335", group: "Workspace" },
  { name: "Google Calendar", slug: "googlecalendar", color: "#4285F4", group: "Workspace" },
  { name: "Google Drive", slug: "googledrive", color: "#4285F4", group: "Workspace" },
  { name: "Google Sheets", slug: "googlesheets", color: "#34A853", group: "Workspace" },
  { name: "Google Docs", slug: "googledocs", color: "#4285F4", group: "Workspace" },
  // Finance
  { name: "QuickBooks", slug: "intuitquickbooks", color: "#2CA01C", group: "Finance" },
  { name: "Microsoft Excel", slug: "microsoftexcel", color: "#217346", group: "Finance" },
  // Sales / CRM
  { name: "HubSpot", slug: "hubspot", color: "#FF7A59", group: "Sales" },
  { name: "Apollo", slug: "apollographql", color: "#311C87", group: "Sales" },
  { name: "Make", slug: "make", color: "#6D00CC", group: "Sales" },
  { name: "Zapier", slug: "zapier", color: "#FF4F00", group: "Sales" },
  // E-commerce
  { name: "Amazon Seller", slug: "amazon", color: "#FF9900", group: "E-commerce" },
  { name: "Helium 10", slug: "helium", color: "#0072CE", group: "E-commerce" },
  { name: "WooCommerce", slug: "woocommerce", color: "#96588A", group: "E-commerce" },
  // Marketing & Content
  { name: "Meta Business", slug: "meta", color: "#0668E1", group: "Marketing" },
  { name: "Canva", slug: "canva", color: "#00C4CC", group: "Marketing" },
  { name: "CapCut", slug: "capcut", color: "#000000", group: "Marketing" },
  { name: "LinkedIn", slug: "linkedin", color: "#0A66C2", group: "Marketing" },
  { name: "X (Twitter)", slug: "x", color: "#000000", group: "Marketing" },
  { name: "YouTube", slug: "youtube", color: "#FF0000", group: "Marketing" },
  // AI
  { name: "ChatGPT", slug: "openai", color: "#000000", group: "AI" },
  { name: "Claude", slug: "anthropic", color: "#D97757", group: "AI" },
];

const TIMELINE = [
  { year: "Most recent", role: "Executive Virtual Assistant", co: "Black Vault Media", note: "Calendar, inbox, project tracking, client coordination." },
  { year: "Most recent", role: "Accounting Support", co: "NTC Accounting Firm", note: "Bookkeeping, reconciliations, working papers." },
  { year: "Most recent", role: "Database & Campaign Support", co: "ISALESS", note: "Sales database hygiene and outbound campaign coordination." },
  { year: "Most recent", role: "Junior Visa Processing Assistant", co: "Student World Pte Ltd", note: "International student visa applications and applicant comms." },
  { year: "Prior", role: "Medical Administrative & Operations Manager", co: "MNT Scientific, LLC", note: "Cleared backlogs, wrote SOPs, set KPIs." },
  { year: "Prior", role: "KOL Research & Data Enrichment Specialist", co: "Alpha Mail Media", note: "Built the KOL screening database for crypto." },
  { year: "Prior", role: "Social Media Manager & Content Creator", co: "PNJ Financial Solutions", note: "Two-year content engine for an insurance brand." },
  { year: "Prior", role: "Procurement & Product Research Assistant", co: "Uppsyde", note: "12 Amazon SKUs sourced and launched in 5 months." },
  { year: "Prior", role: "E-commerce Administrative Virtual Assistant", co: "Dynamic Voice & Data", note: "Listings, orders, AR/AP, FBA inventory." },
  { year: "Prior", role: "Trade Check Auditor", co: "Wizard of Ads", note: "Audited up to 20 store locations / day." },
  { year: "Prior", role: "Data Entry Specialist", co: "Private Real Estate Firm", note: "100+ docs/day at 99% accuracy." },
  { year: "Origin", role: "Freelance Writer & Researcher", co: "Independent", note: "Where it started: academic and business writing." },
];

const SKILLS = [
  {
    h: "Operations",
    items: ["SOP design & rollout", "Workflow optimization", "KPI tracking", "Inbox & task routing", "Cross-team coordination"],
  },
  {
    h: "Data & Research",
    items: ["Market & competitor research", "Influencer / KOL screening", "Data cleanup & enrichment", "Reporting & dashboards", "Document operations"],
  },
  {
    h: "E-commerce & Finance",
    items: ["Amazon FBA / Seller Central", "Procurement & sourcing", "AR/AP & QuickBooks", "Inventory forecasting", "Listings & copy"],
  },
];

const CERTS = [
  { mark: "QB", name: "Introduction with QuickBooks Online", issuer: "Intuit" },
  { mark: "NC", name: "National Certificate III in Bookkeeping", issuer: "TESDA" },
  { mark: "HX", name: "HIPAA Privacy Training", issuer: "HIPAAA" },
  { mark: "CN", name: "Canopy Associate Certification", issuer: "Canopy" },
];

const WRITING = [
  {
    date: "Apr 2026",
    title: "Building SOPs that actually get used",
    tag: "Operations",
    time: "6 min",
    excerpt: "Most SOPs die in a Google Doc nobody opens. Here's the format I use to make sure they live inside the workflow they're describing.",
    body: `Most SOPs fail for the same reason: they're written like documents instead of like tools. A document is something you read once. A tool is something you reach for when you need it.

When I rewrote the SOPs at MNT Scientific, I followed three rules.

§ One screen, one task.
Every procedure had to fit on a single screen. If it didn't, it was actually two procedures pretending to be one. Splitting them made each one usable.

§ Lead with the trigger.
The first line of every SOP is "When X happens, do this." That way the SOP is searchable by event - "patient calls about a refill," "claim comes back denied" - not by author or department.

§ Owner + escalation + tool, every time.
Three pieces of metadata at the top of every SOP. Who owns this. Who do you escalate to. Which tool is the source of truth. Without those three lines, an SOP is just a wish.

The result wasn't a thicker manual. It was a thinner one that people actually opened during the workday.`,
  },
  {
    date: "Feb 2026",
    title: "From inbox chaos to a 24-hour response SLA",
    tag: "Operations",
    time: "8 min",
    excerpt: "How I took a shared inbox with thousands of unread messages and built routing rules that got the team to a 24-hour reply SLA in six weeks.",
    body: `When I inherited the practice inbox at MNT Scientific, there were over four thousand unread emails. Nobody knew which ones mattered. Patients were calling because nobody had replied to the email they sent two weeks ago.

The trap is to start by clearing the backlog. Don't. The backlog will fill back up by Friday.

Start by stopping the bleeding.

I set up filters that auto-tagged every inbound by category - insurance, patient, internal, vendor, junk. Each category had an owner and a tracker. New mail had to flow into one of those buckets within fifteen minutes of arrival or my morning routine had failed.

Only then did I open the backlog, and I worked it in reverse chronological order. The most recent stuff was most likely to still matter.

Six weeks in, the SLA was 24 hours. Two months in, it was 8 hours for anything tagged "patient."

The lesson: triage first, archaeology second.`,
  },
  {
    date: "Nov 2025",
    title: "How I screen a KOL in under five minutes",
    tag: "Web3 Research",
    time: "5 min",
    excerpt: "A repeatable checklist for spotting inflated follower counts, recycled engagement, and niche drift before you spend a dollar.",
    body: `KOL research in crypto is mostly fraud detection. Real follower counts are rare; real engagement is rarer.

My five-minute check, in order:

1. Open the follower curve on a third-party analytics site. Look for vertical cliffs. Real audiences grow in slopes, not jumps.

2. Scroll their last 30 posts. Count how many are about the same narrative. Niche drift across three narratives in a month means the audience won't trust them for any of them.

3. Sample five comments. If the comments are mostly "🔥🚀" and emoji-only, the engagement is performative - not opinions.

4. Cross-check their other handles (Telegram, YouTube). If the audience size collapses by 10× between platforms, the X follower number is probably inflated.

5. Check campaign history. Have they shilled three competitors in the last quarter? Then they'll shill yours too - and the audience knows.

Five minutes, five checks. The KOLs that survive all five are the ones worth a deeper look.`,
  },
  {
    date: "Aug 2025",
    title: "The Amazon sourcing scorecard I run before every launch",
    tag: "E-commerce",
    time: "7 min",
    excerpt: "Four numbers I check before I'll quote a supplier. If they don't line up, I don't launch.",
    body: `Twelve products in five months at Uppsyde wasn't luck. It was the same scorecard, run twelve times.

The scorecard has four cells, all numeric:

§ Cell 1: Rank trend.
Pull the BSR of the top three competitors for the last 90 days. Stable or rising? Good. Falling? The category is cooling - pass.

§ Cell 2: Review velocity.
Take the top competitor's review count divided by months listed. If they're earning fewer than ten reviews per month, the demand isn't strong enough to support a third entrant.

§ Cell 3: Projected margin.
Landed cost (with freight, duties, FBA fees, returns reserve) divided by realistic selling price. Below 25% margin and I don't launch - there's no room for ad spend.

§ Cell 4: Competitor density at price band.
How many sellers are within ±10% of the price you'll need to hit? More than fifteen and the listing rank fight gets ugly. Below seven is comfortable.

Four numbers. If all four are green, I move. If even one is yellow, I dig deeper. If two are red, the product doesn't exist.`,
  },
  {
    date: "May 2025",
    title: "Why your AR aging report is the most important document in the business",
    tag: "Finance Ops",
    time: "4 min",
    excerpt: "Cash flow problems are almost never sales problems. They're collection problems hiding in a spreadsheet.",
    body: `Most small businesses I've worked with have a cash flow problem. Most of them think it's a sales problem. Almost none of them are right.

The proof is the AR aging report.

If you have $80k in outstanding invoices and $30k of that is over 60 days old, you don't need more sales. You need a reminder routine.

The routine that worked at Dynamic Voice & Data was:
- Day 7 past due: friendly nudge, attached invoice.
- Day 14: phone call.
- Day 30: formal letter with terms.
- Day 60: stop service, escalate.

We sent the day 7 nudge automatically. Just that step alone moved 60% of receivables to under 30 days. The cash flow problem wasn't a sales problem. It was a reminder problem.`,
  },
  {
    date: "Feb 2025",
    title: "Notes from running a content calendar for two years",
    tag: "Marketing",
    time: "5 min",
    excerpt: "Two years of monthly content for an insurance brand. Here's what I'd do differently and what I'd do again.",
    body: `Two years on PNJ Financial's social. Some lessons that landed:

- Calendars beat campaigns. Steady cadence outperforms three big pushes a year. The audience knows when to expect you.

- Repurpose ruthlessly. One blog post is one Reel, three carousels, ten quote posts, and one email. Stop writing once.

- Measure formats, not posts. Don't ask "did this post do well." Ask "is the carousel format outperforming the static this month."

- Vertical video is the cheapest demand-gen there is. Two years in and I still won't shut up about it.

- Insurance is a trust business. The brand voice has to be calm, specific, and never clever. Cleverness erodes trust.

Things I'd do differently: I'd have invested earlier in email. Social is rented land. Email is owned.`,
  },
];

Object.assign(window, {
  PROFILE, METRICS, SKILL_KEYWORDS, CASES, TIMELINE, SKILLS, CERTS, WRITING, TOOLS,
});
