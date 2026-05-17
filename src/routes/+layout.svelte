<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { mode } from '$lib/stores/mode.svelte';
	import { theme } from '$lib/stores/theme.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import '../app.css';

	let { children, data } = $props();

	$effect(() => {
		mode.init();
		theme.init();
	});

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<Header />

<main>
	{@render children()}
</main>

<Footer
	github={data.settings.github}
	twitter={data.settings.twitter}
	email={data.settings.email}
/>

<style>
	main {
		min-height: 60vh;
	}
</style>
