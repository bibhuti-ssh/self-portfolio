/// <reference types="@sveltejs/kit" />

declare module '*.md' {
	import type { SvelteComponent } from 'svelte';
	export default class extends SvelteComponent {}
	export const metadata: Record<string, unknown>;
}

declare namespace App {
	interface Locals {
		viewMode: 'human' | 'agent';
	}
}
