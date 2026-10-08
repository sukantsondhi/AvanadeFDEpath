"use strict";

const PATHWAY = {
  "source": "https://fde-avanade.nl-dot.com/journey.html#anchors",
  "captured": "2026-10-08",
  "domains": [
    {
      "title": "Agentic AI Fundamentals",
      "sub": "What every FDE must explain at a whiteboard",
      "priority": "P1",
      "icon": "brain-circuit",
      "destination": "Explain to any client, in plain English, what an LLM is, why it hallucinates, what the context window means, and how 'agentic' differs from 'chatbot'. Describe the four design patterns \u2014 reflection, tool use, planning, multi-agent \u2014 with a real example of each.",
      "functional": {
        "start": "Strong at explaining complex ideas; knows the business case but not the model mechanics.",
        "build": "AI Capabilities & Limitations \u00b7 Agentic AI Unplugged \u00b7 first lessons of Agentic AI Fluency."
      },
      "technical": {
        "start": "Understands the mechanics but frames in developer terms a client can't follow.",
        "build": "Reframe every technical explanation as a business outcome. Drill the jargon-free whiteboard explanation."
      },
      "proof": "Explain to a sceptical 'client' (played by a colleague) what an agent is and when you would and wouldn't use one. They must repeat it back in their own words.",
      "sources": [
        "Agentic AI Unplugged",
        "Agentic AI Fluency",
        "AI Capabilities & Limitations",
        "Claude 101"
      ]
    },
    {
      "title": "Technical Build Capability",
      "sub": "What every FDE must ship in a client room",
      "priority": "P1",
      "icon": "code-xml",
      "destination": "Use GitHub Copilot and Claude Code fluently under time pressure. Scaffold a PoC from a brief in under 30 minutes. Run Explore \u2192 Plan \u2192 Code \u2192 Commit without thinking. Build tool-use agents, RAG on Azure AI Search, and multi-agent systems in MAF or Python.",
      "functional": {
        "start": "May have limited coding experience; build basic fluency before tool fluency makes sense.",
        "build": "Claude Code 101 \u00b7 GHCP hands-on labs \u00b7 3 small end-to-end PoCs before Activation Day."
      },
      "technical": {
        "start": "Already codes; may build by instinct rather than the structured loop.",
        "build": "Enforce the RPI loop on every build. Target a 25-minute PoC scaffold from brief to running app."
      },
      "proof": "Timed build drill: from a one-paragraph brief, produce a running, deployed application in 45 minutes using GHCP or Claude Code.",
      "sources": [
        "Claude Code 101",
        "Building Agents",
        "Build AI Apps & Agents with Azure",
        "MAF deep-dive",
        "Activation Day"
      ]
    },
    {
      "title": "Facilitation & Discovery",
      "sub": "The half of the role training barely covers",
      "priority": "P1",
      "icon": "messages-square",
      "destination": "Run a 2-hour LUMA discovery session that ends with a scoped, buildable PoC brief. Surface use cases from vague asks (Statement Starters), pressure-test direction (Assumptions Grid), prioritise (Importance/Difficulty Matrix). Explain any AI concept to an exec in under 3 minutes.",
      "functional": {
        "start": "Strong facilitation instinct from consulting; needs the LUMA toolkit to systematise it.",
        "build": "LUMA fundamentals certification \u00b7 design a standard FDE discovery workshop template \u00b7 run it twice internally."
      },
      "technical": {
        "start": "Has workshop experience but jumps to solution; discovery feels uncomfortable.",
        "build": "Deliberately slow down. Run a LUMA session where you may not propose a technical solution until the final 15 minutes."
      },
      "proof": "Facilitate a live 90-minute discovery with colleagues playing clients who 'just want AI'. End with a brief another FDE can build from without a clarifying question.",
      "sources": [
        "LUMA System",
        "LUMA AI discovery template",
        "Design Thinking for AI",
        "4D Framework",
        "Teaching AI Fluency"
      ]
    },
    {
      "title": "Squad Discipline",
      "sub": "The operating system that makes everything reliable",
      "priority": "P1",
      "icon": "users-round",
      "destination": "Blueprint before build (even a 20-min plan). Red-team before build (15-min structured challenge). Quality-gate before demo (browser-tested end-to-end). Write game tape after every build. Never demo an untested page. Never skip the governance that cannot be skipped.",
      "functional": {
        "start": "Strong at specs and reviews; may over-document \u2014 the time-box is the discipline.",
        "build": "Blueprint drills \u00b7 receive a red-team without defending \u00b7 log decisions \u00b7 write 3-sentence game tape per build."
      },
      "technical": {
        "start": "Jumps straight to code; blueprint and red-team feel like overhead.",
        "build": "Resist the instinct \u2014 the pivot cost of building the wrong thing beats the 20 minutes. Make RPI + review a habit."
      },
      "proof": "Produce a 20-minute blueprint for an unseen brief; hand it to another FDE who builds from it with zero questions. Then run a red-team that finds 2 blockers.",
      "sources": [
        "HVE RPI lifecycle",
        "Squad blueprint pattern",
        "Red-team checklist",
        "Vera browser checklist",
        "Coach game-tape"
      ]
    },
    {
      "title": "Commercial & Presales",
      "sub": "The FDE role is a sales accelerator",
      "priority": "P1",
      "icon": "chart-no-axes-combined",
      "destination": "Frame any working PoC as a business case in under 5 minutes: problem (30s) \u2192 live demo (3m) \u2192 three business metrics (1m) \u2192 one ask (30s). Navigate the progression from workshop \u2192 PoC \u2192 Avanade engagement. Always disclose GA vs preview status.",
      "functional": {
        "start": "Natural strength \u2014 business case, exec presence, commercial awareness. Apply it to AI PoCs.",
        "build": "PoC-to-Business-Case framing \u00b7 3 metric templates for common verticals \u00b7 demo with no slides."
      },
      "technical": {
        "start": "Can build it; demos features not outcomes. The CFO 'so what?' catches you off guard.",
        "build": "Practise the 5-minute format with a functional colleague. Record yourself and watch it back."
      },
      "proof": "5-minute demo to a non-technical 'CFO': problem \u2192 live demo \u2192 3 business metrics \u2192 one ask. They must ask an informed ROI follow-up.",
      "sources": [
        "PoC-to-Business-Case",
        "FDE Presales Motion",
        "Live Demo Under Pressure",
        "GA-vs-preview discipline"
      ]
    },
    {
      "title": "Tools & Daily Practice",
      "sub": "The edge compounds daily",
      "priority": "P1",
      "icon": "terminal",
      "destination": "GitHub Copilot and Claude Code as primary build tools, with a working CLAUDE.md on every project. A forked squad setup adapted to your domain. A personal daily-practice habit \u2014 20 minutes, one new technique, logged \u2014 sustained for 30+ days.",
      "functional": {
        "start": "Discipline and habit-building are natural; the risk is logging practice without applying it.",
        "build": "Daily practice log \u00b7 one new prompt technique per day for two weeks \u00b7 review weekly."
      },
      "technical": {
        "start": "Comfortable in the terminal; may use the tools as a faster chatbot, not a workflow.",
        "build": "Enforce Explore \u2192 Plan on every build. Add subagents. Publish one skill. Measure the acceleration."
      },
      "proof": "Show your 30-day practice log and your forked squad config. Identify 3 capability gains that came from practice, and demonstrate one live.",
      "sources": [
        "GitHub Copilot labs",
        "Claude Code 101",
        "Agent Skills (skills.sh)",
        "HVE Learning katas",
        "Personal patterns log"
      ]
    }
  ],
  "courses": [
    {
      "title": "Frontier Transformation Engineer badge",
      "tier": "must",
      "source": "LevelUp",
      "meta": "~86 hrs \u00b7 3 milestones",
      "url": "https://skillupwithlevelup.com/frontier"
    },
    {
      "title": "HVE Core \u2014 All (VS Code)",
      "tier": "must",
      "source": "HVE",
      "meta": "ise-hve-essentials.hve-core-all",
      "url": "https://marketplace.visualstudio.com/items?itemName=ise-hve-essentials.hve-core-all"
    },
    {
      "title": "HVE Learning Platform (VS Code)",
      "tier": "must",
      "source": "HVE",
      "meta": "ise-hve-essentials.hve-learning",
      "url": "https://marketplace.visualstudio.com/items?itemName=ise-hve-essentials.hve-learning"
    },
    {
      "title": "GH-300: GitHub Copilot",
      "tier": "must",
      "source": "Cert",
      "meta": "10 hrs \u00b7 credential"
    },
    {
      "title": "AI-103: Develop AI apps & agents on Azure",
      "tier": "must",
      "source": "Cert",
      "meta": "10 hrs \u00b7 AI-102 accepted"
    },
    {
      "title": "AB-100: Agentic AI Business Solutions Architect",
      "tier": "must",
      "source": "Cert",
      "meta": "10 hrs \u00b7 credential"
    },
    {
      "title": "Hypervelocity Engineering Framework",
      "tier": "must",
      "source": "LevelUp",
      "meta": "1.5 hrs \u00b7 required assessment"
    },
    {
      "title": "Agentic AI Fluency",
      "tier": "must",
      "source": "Core",
      "meta": "6 hrs \u00b7 top priority"
    },
    {
      "title": "Build AI Apps & Agents with Azure",
      "tier": "must",
      "source": "MSFT",
      "meta": "12 hrs \u00b7 anchor course"
    },
    {
      "title": "Develop AI Agents on Azure",
      "tier": "must",
      "source": "MSFT",
      "meta": "8 hrs \u00b7 Foundry Agent Service"
    },
    {
      "title": "Claude 101 + Prompt Engineering",
      "tier": "must",
      "source": "Anthropic",
      "meta": "start here \u00b7 free \u00b7 certified"
    },
    {
      "title": "Claude Code 101 + Tool Use",
      "tier": "must",
      "source": "Anthropic",
      "meta": "before Activation Day"
    },
    {
      "title": "Microsoft Generative AI for Beginners (selective)",
      "tier": "rec",
      "source": "Core",
      "meta": "keep eps 1\u20135,12,13,15"
    },
    {
      "title": "Building Agents",
      "tier": "rec",
      "source": "Core",
      "meta": "12 hrs \u00b7 technical track"
    },
    {
      "title": "Multi-Agent Systems (+ MAF track)",
      "tier": "rec",
      "source": "Core",
      "meta": "15 hrs \u00b7 add MAF"
    },
    {
      "title": "Context Engineering \u2014 Deep Dive",
      "tier": "rec",
      "source": "Core",
      "meta": "expand to 2+ hrs \u00b7 critical"
    },
    {
      "title": "Copilot Studio: Autonomous Agents",
      "tier": "rec",
      "source": "MSFT",
      "meta": "3 hrs \u00b7 low-code path"
    },
    {
      "title": "MCP + Subagents",
      "tier": "rec",
      "source": "Anthropic",
      "meta": "connectivity + scale"
    },
    {
      "title": "Microsoft Agent Framework (C#/.NET)",
      "tier": "rec",
      "source": "Gap",
      "meta": "8\u201312 hrs \u00b7 Avanade stack"
    },
    {
      "title": "LLM Evaluation \u2014 RAGAS, LLM-as-Judge",
      "tier": "rec",
      "source": "Gap",
      "meta": "differentiator"
    },
    {
      "title": "LUMA System \u2014 Fundamentals",
      "tier": "rec",
      "source": "Facilitation",
      "meta": "certify \u00b7 run the room"
    },
    {
      "title": "Design Thinking for AI \u2014 Applied Sprint",
      "tier": "rec",
      "source": "Facilitation",
      "meta": "half-day workshop"
    },
    {
      "title": "Build Along with a Squad (Superteam)",
      "tier": "rec",
      "source": "Build lab",
      "meta": "capstone build lab"
    },
    {
      "title": "PoC-to-Business-Case Framing",
      "tier": "rec",
      "source": "Commercial",
      "meta": "one slide \u00b7 three numbers \u00b7 one ask"
    },
    {
      "title": "Live Demo Delivery Under Pressure",
      "tier": "rec",
      "source": "Commercial",
      "meta": "practise repeatedly"
    },
    {
      "title": "Responsible AI Impact Assessment",
      "tier": "rec",
      "source": "Governance",
      "meta": "before any client-facing AI"
    },
    {
      "title": "Microsoft Copilot Family Deep Dive",
      "tier": "rec",
      "source": "MSFT",
      "meta": "which Copilot? in 60 sec"
    },
    {
      "title": "Microsoft Phi \u2014 SLMs for PoCs",
      "tier": "rec",
      "source": "MSFT",
      "meta": "cost / data-residency scenarios"
    },
    {
      "title": "4D AI Fluency Framework",
      "tier": "rec",
      "source": "Anthropic",
      "meta": "client-room asset"
    },
    {
      "title": "AI Capabilities & Limitations",
      "tier": "rec",
      "source": "Anthropic",
      "meta": "honest AI literacy"
    },
    {
      "title": "Claude Cowork",
      "tier": "rec",
      "source": "Anthropic",
      "meta": "non-technical client users"
    },
    {
      "title": "Security, Compliance & Governance for AI (AWS)",
      "tier": "info",
      "source": "Core",
      "meta": "Azure sections only"
    },
    {
      "title": "Data Narrative 101 / 201",
      "tier": "info",
      "source": "Core",
      "meta": "advisory context"
    },
    {
      "title": "Claude with AWS Bedrock",
      "tier": "info",
      "source": "Anthropic",
      "meta": "awareness \u00b7 non-Avanade"
    },
    {
      "title": "Claude with Google Vertex AI",
      "tier": "info",
      "source": "Anthropic",
      "meta": "awareness \u00b7 non-Avanade"
    },
    {
      "title": "Intro to AI & ML",
      "tier": "info",
      "source": "Core",
      "meta": "cut \u00b7 gated by pre-assessment"
    },
    {
      "title": "Cloud Computing & MLOps",
      "tier": "info",
      "source": "Core",
      "meta": "managed-services discipline"
    }
  ]
};
