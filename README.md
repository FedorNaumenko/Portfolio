# Fedor Naumenko

**[fedornaumenko.github.io/Portfolio](https://fedornaumenko.github.io/Portfolio/)**

AI Engineer & Support Tech Lead at Quicklizard. I build production LLM agent systems
that other teams actually use every day.

This repo is my portfolio site: a scrolling, retro-game-themed page with hand-drawn
canvas backgrounds. No frameworks, no build step — plain HTML, CSS, and JavaScript.

## What I do

I split my time between leading Quicklizard's Technical Support team and building the
AI automation the Operations department runs on. That means owning projects end to end:
scoping the problem with non-technical stakeholders, designing the prompts and tools,
shipping to production, and staying on the hook when something breaks at 2am.

Most of my work is multi-agent systems wired into real infrastructure — Zendesk, Slack,
BigQuery, GitHub, S3, Kubernetes, and observability tooling — over REST APIs, webhooks,
and MCP servers.

## Experience

**AI Engineer** · Quicklizard · Jan 2026 – Present
- Build and run production LLM agent systems adopted across the Operations department,
  cutting investigation work that took minutes down to seconds.
- Lead automation projects from idea to deployment: process design, prompt and tool
  design, testing, rollout.
- Integrate LLM workflows over REST APIs, webhooks, and MCP servers across Zendesk,
  Slack, BigQuery, GitHub, AWS S3, Kubernetes, and Groundcover.
- Own reliability — monitoring, retry/backoff, error handling, and steady improvements
  to prompts, tools, and agent architecture.

**Support Tech Lead** · Quicklizard · Sep 2025 – Present
- Lead the Technical Support team covering tier-1/2 incidents for 50+ enterprise
  e-commerce clients on a SaaS pricing platform. Own SLAs, escalation routing, upskilling.
- Bridge Support, R&D, and Tech Operations: triage cross-functional issues, run client
  onboarding, maintain runbooks read by both humans and agents.
- Drive AI adoption inside the team — train engineers on agent usage, watch agent
  quality, turn feedback into concrete fixes.

**Technical Support Specialist** · Quicklizard · Jan 2024 – Sep 2025
- Tier-2 support over Zendesk for an enterprise pricing and competitive intelligence
  platform: feed/ETL issues, pricing engine errors, custom Python pricing functions.
- Embedded with Tech Operations — Python and SQL scripts plus kubectl work against
  EU/US production clusters to automate feed reprocessing, client initialization, log triage.
- Built the internal client knowledge base (50+ structured Markdown docs) that later
  became the grounding corpus for the agent systems.

**Technician, Combat Intelligence Collection Battalion** · IDF · Jun 2017 – Oct 2021
- Installed, maintained, and repaired ground surveillance radars, electro-optical
  systems, Windows servers, and field networks.
- Trained personnel on system operation, troubleshooting, and field maintenance.

## Selected work

**Zendesk Ticket Agent** — production multi-agent support automation
*Python · Google ADK · Vertex AI · Cloud Run · MCP*

Auto-triages every incoming Zendesk ticket: posts a structured internal note (history,
client knowledge, log signals, code insights, suggested next steps, priority) and sends
a context-aware first reply. A Zendesk webhook hits a Cloud Run dispatcher, which calls
a root agent on Vertex AI Agent Engine orchestrating four specialist sub-agents
(knowledge / data / logs / code) across 20+ tools — Zendesk REST, BigQuery, GitHub,
S3, an internal stock service, Slack alerts, and the Groundcover MCP server for live
logs, traces, and incidents. First-response time went from minutes to seconds.

**Slack Support Copilot** — conversational internal ops agent
*Python · Google ADK · Cloud Run · MCP*

A Slack-native copilot answering operational questions for support and tech-ops by
searching client docs, querying production logs, and reading source code. Built on a
reusable router + sub-agent pattern shared across our internal agents, so prompts,
tools, and the knowledge corpus stay consistent. Handles mentions, DMs, and threads
with an ack-then-process pattern for Slack's 3-second deadline.

## Side projects

- **[FPL Solver](https://github.com/FedorNaumenko/fplsolver)** — Fantasy Premier League
  transfer advisor built on form, fixtures, and projected points. *TypeScript, Next.js*
- **[Sal-Kal](https://github.com/FedorNaumenko/Sal-Kal)** — grocery price comparison for
  Israeli supermarkets, using published chain price data. *Python, FastAPI, Next.js, Docker*
- **[AI Subtitles for Stremio](https://github.com/FedorNaumenko/stremio-aisubs)** — Stremio
  addon that transcribes a stream's audio with Groq Whisper and translates it with Gemini,
  so zero-subtitle content gets synced subtitles on the fly. *JavaScript, Docker*

## Skills

**Languages** — Python, Ruby, SQL. Familiar with JavaScript, HTML, CSS.
**AI & agents** — multi-agent orchestration, tool/function calling, prompt engineering,
retrieval & grounding, Model Context Protocol (MCP), Google ADK, Vertex AI Agent Engine.
**Integrations** — webhook handlers, REST APIs, async background processing,
retry/backoff, structured logging.
**Infrastructure** — GCP, AWS, BigQuery, Docker, Kubernetes, Linux.
**Tools** — Zendesk, Slack (Bolt SDK), GitHub, Groundcover, Postman, Kibana, Grafana, ClickUp.
**Spoken** — Hebrew, English, Russian, Ukrainian.

## Education

- **B.Sc. Software Engineering** — Bar-Ilan University, Ramat Gan (2024 – 2025)
- **Pre-Academic Preparatory Program**, Engineering & Exact Sciences — Bar-Ilan University (2021 – 2022)
- **Software Technician** — ORT College, Netanya (2016 – 2017)

## Running this site

Static files — open `index.html`, or serve the folder:

```bash
python -m http.server 8000
```

## Get in touch

Want to collaborate, chat about AI agents, or just say hi?

[GitHub](https://github.com/FedorNaumenko) ·
[LinkedIn](https://www.linkedin.com/in/fedor-naumenko/) ·
[Email](mailto:fedornaumenko1998@gmail.com)
