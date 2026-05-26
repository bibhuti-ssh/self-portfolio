---
title: "FA3STER"
description: "Multi-agent RAG system for financial document analysis, built for Inter-IIT Tech Meet 13.0 Pathway High-Prep."
techStack: ["RAG", "Multi-Agent Systems", "Pathway", "Docker", "Financial Docs"]
url: ""
repo: ""
featured: true
date: "2024-12-01"
status: "archived"
---

FA3STER was built for the Inter-IIT Tech Meet 13.0 Pathway High-Prep problem statement: a financial-document intelligence system where the answer is only useful if the reasoning path can be trusted.

## Agentic RAG

I architected a multi-agent RAG pipeline that produced 92%+ accurate responses and rendered live workflow graphs while querying financial documents. The system separated retrieval, reasoning, metrics, business interpretation, and executive reporting into autonomous layers.

## Evaluation

The agentic chunking setup reached 90.4% context precision, 84.9% recall, and 93.1% faithfulness. The application was containerized with Docker and built on Pathway's dynamic ingestion pipeline for low-latency document updates.
