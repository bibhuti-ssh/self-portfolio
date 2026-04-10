---
title: "DroidRun Cloud"
description: "Cloud platform for AI-powered mobile device automation"
techStack: ["SvelteKit", "Python", "FastAPI", "Android", "LLMs"]
url: ""
repo: ""
featured: true
date: "2025-06-15"
status: "active"
---

DroidRun Cloud is a platform that lets AI agents control real Android devices in the cloud. Instead of building fragile UI test scripts, you describe what you want in natural language and an LLM figures out the taps, swipes, and inputs.

## The Problem

Mobile testing and automation is stuck in 2015. Appium scripts break when a button moves 10 pixels. Record-and-replay tools can't handle dynamic content. Every app update means rewriting tests.

## The Approach

We stream device screens to vision-capable LLMs that understand UI context the way a human does. The agent sees the screen, decides what to do, acts, and observes the result. No element selectors. No XPath. Just "log in with the test account and check if the dashboard loads."

## What I Built

- SvelteKit frontend for device management and session monitoring
- FastAPI backend orchestrating device pools and agent sessions
- Real-time screen streaming with sub-200ms latency
- Agent framework supporting multiple LLM providers
