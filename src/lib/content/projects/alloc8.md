---
title: "Alloc8"
description: "Official IIT Patna hostel room allocation platform for 6,000+ students, with roommate selection and concurrency-safe booking."
techStack: ["Full Stack", "Redis", "Concurrency", "Semaphores", "Web"]
url: "https://alloc8.in"
repo: ""
featured: false
date: "2024-06-01"
status: "active"
---

Alloc8 is the official hostel room allocation website of IIT Patna, built for a high-pressure use case: thousands of students trying to claim limited rooms at the same time.

## Seat-Booking UX for Rooms

The interface borrows from movie-seat booking patterns because the mental model is instantly clear: choose a room, choose a spot, coordinate with a roommate, commit.

## Concurrency Control

The harder part lived behind the interface. I implemented Redis locks and semaphore-based concurrency control so the system could scale horizontally without double-booking rooms or collapsing under simultaneous allocation traffic.
