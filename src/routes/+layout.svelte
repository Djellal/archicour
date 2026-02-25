<script lang="ts">
	import { page } from '$app/state';
	import { locales, localizeHref, getLocale } from '$lib/paraglide/runtime';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	const locale = $derived(getLocale());
	const dir = $derived(locale === 'ar' ? 'rtl' : 'ltr');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link
		href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div {dir} class="min-h-screen bg-gray-50">
	{@render children()}
</div>

<div style="display:none">
	{#each locales as loc}
		<a href={localizeHref(page.url.pathname, { locale: loc })}>{loc}</a>
	{/each}
</div>
