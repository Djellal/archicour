<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<div class="space-y-6">
	<h1 class="text-2xl font-bold text-gray-900">{m.transfers()}</h1>

	<div class="rounded-xl bg-white shadow-sm">
		{#if data.transfers.length === 0}
			<div class="px-6 py-12 text-center text-gray-500">
				<svg class="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
				</svg>
				<p class="mt-2">{m.no_results()}</p>
			</div>
		{:else}
			<ul class="divide-y divide-gray-100">
				{#each data.transfers as { transfer: t, correspondence: c }}
					<li class="px-6 py-4">
						<div class="flex items-center justify-between">
							<div>
								<a href="/app/correspondences/{c?.id}" class="font-medium text-primary-600 hover:underline">
									{c?.subject ?? '—'}
								</a>
								{#if t.note}
									<p class="mt-1 text-sm text-gray-500">{t.note}</p>
								{/if}
							</div>
							<div class="flex items-center gap-3">
								<span class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium
									{t.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
									{t.status === 'viewed' ? 'bg-green-100 text-green-800' : ''}
									{t.status === 'cancelled' ? 'bg-gray-100 text-gray-800' : ''}">
									{t.status === 'pending' ? m.pending() : t.status === 'viewed' ? m.viewed() : m.cancelled()}
								</span>
								<span class="text-xs text-gray-400">{t.createdAt}</span>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
