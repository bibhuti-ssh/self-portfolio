import type { SvelteComponent } from 'svelte';

export interface Project {
	title: string;
	slug: string;
	description: string;
	techStack: string[];
	url?: string;
	repo?: string;
	featured: boolean;
	date: string;
	thumbnail?: string;
	status: 'active' | 'archived' | 'in-progress';
	content?: typeof SvelteComponent;
}

export interface Reading {
	title: string;
	slug: string;
	author: string;
	type: 'book' | 'article';
	rating: number;
	dateRead: string;
	cover?: string;
	url?: string;
	tags: string[];
	status: 'read' | 'reading' | 'to-read';
	content?: typeof SvelteComponent;
}

export interface Wording {
	title: string;
	slug: string;
	date: string;
	tags: string[];
	description: string;
	content?: typeof SvelteComponent;
}

export interface TimelineEntry {
	title: string;
	date: string;
	type: 'career' | 'education' | 'personal';
	description: string;
}

export interface Achievement {
	title: string;
	date: string;
	description: string;
	url?: string;
}
