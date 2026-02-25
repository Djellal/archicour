<script lang="ts">
	import { enhance } from '$app/forms';
	import * as m from '$lib/paraglide/messages';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
	let showDeleteConfirm = $state(false);

	const item = $derived(data.correspondence);
</script>

<div class="mx-auto max-w-3xl space-y-6">
	<!-- Header -->
	<div class="flex flex-wrap items-center justify-between gap-4">
		<div class="flex items-center gap-4">
			<a href="/app/correspondences" class="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100" aria-label={m.back()}>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
				</svg>
			</a>
			<h1 class="text-2xl font-bold text-gray-900">{item.subject}</h1>
		</div>
		<div class="flex items-center gap-2">
			<a
				href="/app/correspondences/{item.id}/edit"
				class="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
				</svg>
				{m.edit()}
			</a>
			<button
				onclick={() => (showDeleteConfirm = true)}
				class="inline-flex items-center gap-2 rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
				</svg>
				{m.delete()}
			</button>
		</div>
	</div>

	<!-- Detail Card -->
	<div class="rounded-xl bg-white shadow-sm">
		<div class="grid grid-cols-1 divide-y divide-gray-100 md:grid-cols-2 md:divide-x md:divide-y-0 rtl:md:divide-x-reverse">
			<div class="space-y-4 p-6">
				<div>
					<dt class="text-sm text-gray-500">{m.sequence_number()}</dt>
					<dd class="mt-1 font-medium text-gray-900">{item.sequenceNumber}</dd>
				</div>
				<div>
					<dt class="text-sm text-gray-500">{m.reference_number()}</dt>
					<dd class="mt-1 font-medium text-gray-900">{item.referenceNumber ?? '—'}</dd>
				</div>
				<div>
					<dt class="text-sm text-gray-500">{m.type()} / {m.scope()}</dt>
					<dd class="mt-1">
						{#if item.type === 'incoming'}
							<span class="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
								{m.incoming()} {item.scope === 'internal' ? m.internal() : m.external()}
							</span>
						{:else}
							<span class="inline-flex rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
								{m.outgoing()} {item.scope === 'internal' ? m.internal() : m.external()}
							</span>
						{/if}
					</dd>
				</div>
				<div>
					<dt class="text-sm text-gray-500">{m.academic_year()}</dt>
					<dd class="mt-1 font-medium text-gray-900">{item.academicYear}</dd>
				</div>
			</div>
			<div class="space-y-4 p-6">
				<div>
					<dt class="text-sm text-gray-500">{m.correspondence_date()}</dt>
					<dd class="mt-1 font-medium text-gray-900">{item.correspondenceDate}</dd>
				</div>
				<div>
					<dt class="text-sm text-gray-500">{m.received_date()} / {m.sent_date()}</dt>
					<dd class="mt-1 font-medium text-gray-900">{item.receivedSentDate ?? '—'}</dd>
				</div>
				<div>
					<dt class="text-sm text-gray-500">{m.category()}</dt>
					<dd class="mt-1 font-medium text-gray-900">{data.category?.name ?? '—'}</dd>
				</div>
				<div>
					<dt class="text-sm text-gray-500">{m.sender()} / {m.recipient()}</dt>
					<dd class="mt-1 font-medium text-gray-900">{data.correspondent?.name ?? '—'}</dd>
				</div>
			</div>
		</div>

		{#if item.notes}
			<div class="border-t border-gray-100 p-6">
				<dt class="text-sm text-gray-500">{m.notes()}</dt>
				<dd class="mt-1 text-gray-900">{item.notes}</dd>
			</div>
		{/if}
	</div>

	<!-- Attachments -->
	{#if data.attachments.length > 0}
		<div class="rounded-xl bg-white p-6 shadow-sm">
			<h2 class="mb-4 font-semibold text-gray-900">{m.attachments()}</h2>
			<ul class="space-y-2">
				{#each data.attachments as att}
					<li class="flex items-center gap-3 rounded-lg border border-gray-200 p-3">
						<svg class="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
						</svg>
						<span class="flex-1 text-sm">{att.filename}</span>
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	<!-- Delete Confirmation Modal -->
	{#if showDeleteConfirm}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div class="mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
				<h3 class="text-lg font-semibold text-gray-900">{m.confirm_delete()}</h3>
				<div class="mt-4 flex items-center justify-end gap-3">
					<button
						onclick={() => (showDeleteConfirm = false)}
						class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
					>
						{m.cancel()}
					</button>
					<form method="post" action="?/delete" use:enhance>
						<button
							type="submit"
							class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
						>
							{m.delete()}
						</button>
					</form>
				</div>
			</div>
		</div>
	{/if}
</div>
