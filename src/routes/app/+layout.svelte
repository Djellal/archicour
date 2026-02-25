<script lang="ts">
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages';
	import { locales, localizeHref, getLocale } from '$lib/paraglide/runtime';
	import type { LayoutServerData } from './$types';

	let { data, children }: { data: LayoutServerData; children: any } = $props();

	let sidebarOpen = $state(false);

	const locale = $derived(getLocale());

	const navItems = $derived([
		{ href: '/app/dashboard', label: m.dashboard(), icon: 'dashboard' },
		{ href: '/app/correspondences', label: m.correspondences(), icon: 'mail' },
		{ href: '/app/categories', label: m.categories(), icon: 'folder' },
		{ href: '/app/correspondents', label: m.correspondents(), icon: 'people' },
		{ href: '/app/transfers', label: m.transfers(), icon: 'transfer' },
		{ href: '/app/settings', label: m.settings(), icon: 'settings' }
	]);

	function isActive(href: string): boolean {
		if (href === '/app/dashboard') {
			return page.url.pathname === '/app/dashboard' || page.url.pathname === '/app';
		}
		return page.url.pathname.startsWith(href);
	}
</script>

<!-- Mobile sidebar overlay -->
{#if sidebarOpen}
	<div
		class="fixed inset-0 z-40 bg-black/50 lg:hidden"
		role="button"
		tabindex="-1"
		onclick={() => (sidebarOpen = false)}
		onkeydown={(e) => e.key === 'Escape' && (sidebarOpen = false)}
	></div>
{/if}

<!-- Sidebar -->
<aside
	class="fixed inset-y-0 start-0 z-50 flex w-64 flex-col bg-gray-900 text-white transition-transform lg:translate-x-0
	{sidebarOpen ? 'translate-x-0' : 'max-lg:-translate-x-full max-lg:rtl:translate-x-full'}"
>
	<!-- Logo -->
	<div class="flex h-16 items-center gap-3 border-b border-gray-700 px-6">
		<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold">
			AC
		</div>
		<div>
			<div class="text-lg font-bold">{m.app_name()}</div>
		</div>
	</div>

	<!-- Navigation -->
	<nav class="flex-1 space-y-1 overflow-y-auto px-3 py-4">
		{#each navItems as item}
			<a
				href={item.href}
				onclick={() => (sidebarOpen = false)}
				class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
				{isActive(item.href)
					? 'bg-primary-600 text-white'
					: 'text-gray-300 hover:bg-gray-800 hover:text-white'}"
			>
				{#if item.icon === 'dashboard'}
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
					</svg>
				{:else if item.icon === 'mail'}
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
				{:else if item.icon === 'folder'}
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
					</svg>
				{:else if item.icon === 'people'}
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
				{:else if item.icon === 'transfer'}
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
					</svg>
				{:else if item.icon === 'settings'}
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
				{/if}
				<span>{item.label}</span>
			</a>
		{/each}
	</nav>

	<!-- User section at bottom -->
	<div class="border-t border-gray-700 px-4 py-3">
		<div class="flex items-center justify-between">
			<div class="text-sm">
				<div class="font-medium">{data.user.name}</div>
				<div class="text-gray-400 text-xs">{data.user.email}</div>
			</div>
			<a
				href="/app/logout"
				class="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
				title={m.logout()}
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
				</svg>
			</a>
		</div>
	</div>
</aside>

<!-- Main content -->
<div class="ms-0 min-h-screen lg:ms-64">
	<!-- Top header -->
	<header class="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 lg:px-8">
		<!-- Mobile menu button -->
		<button
			class="rounded-md p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
			onclick={() => (sidebarOpen = !sidebarOpen)}
			aria-label="Toggle menu"
		>
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		</button>

		<!-- Search -->
		<div class="flex-1">
			<div class="relative max-w-md">
				<svg class="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
				<input
					type="search"
					placeholder="{m.search()}..."
					class="w-full rounded-lg border-gray-300 bg-gray-50 py-2 pe-4 ps-10 text-sm focus:border-primary-500 focus:ring-primary-500"
				/>
			</div>
		</div>

		<!-- Language switcher -->
		<div class="flex items-center gap-2">
			{#each locales as loc}
				<a
					href={localizeHref(page.url.pathname, { locale: loc })}
					class="rounded-md px-2 py-1 text-xs font-medium uppercase transition-colors
					{locale === loc ? 'bg-primary-100 text-primary-700' : 'text-gray-500 hover:bg-gray-100'}"
				>
					{loc}
				</a>
			{/each}
		</div>
	</header>

	<!-- Page content -->
	<main class="p-4 lg:p-8">
		{@render children()}
	</main>
</div>
