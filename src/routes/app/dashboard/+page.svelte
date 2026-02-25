<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<div class="space-y-6">
	<h1 class="text-2xl font-bold text-gray-900">{m.dashboard()}</h1>

	<!-- Stats Grid -->
	<div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
		<!-- Total -->
		<div class="rounded-xl bg-white p-4 shadow-sm">
			<div class="flex items-center gap-3">
				<div class="rounded-lg bg-blue-100 p-2.5">
					<svg class="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
				</div>
			</div>
			<div class="mt-3">
				<p class="text-2xl font-bold text-gray-900">{data.stats.total}</p>
				<p class="text-sm text-gray-500">{m.total_correspondences()}</p>
			</div>
		</div>

		<!-- Incoming -->
		<div class="rounded-xl bg-white p-4 shadow-sm">
			<div class="flex items-center gap-3">
				<div class="rounded-lg bg-green-100 p-2.5">
					<svg class="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 16l4-4m0 0l4 4m-4-4v12M21 8l-4 4m0 0l-4-4m4 4V0" />
					</svg>
				</div>
			</div>
			<div class="mt-3">
				<p class="text-2xl font-bold text-gray-900">{data.stats.incoming}</p>
				<p class="text-sm text-gray-500">{m.incoming_count()}</p>
			</div>
		</div>

		<!-- Outgoing -->
		<div class="rounded-xl bg-white p-4 shadow-sm">
			<div class="flex items-center gap-3">
				<div class="rounded-lg bg-orange-100 p-2.5">
					<svg class="h-5 w-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l-7-7 7-7m0 14l7-7-7-7" />
					</svg>
				</div>
			</div>
			<div class="mt-3">
				<p class="text-2xl font-bold text-gray-900">{data.stats.outgoing}</p>
				<p class="text-sm text-gray-500">{m.outgoing_count()}</p>
			</div>
		</div>

		<!-- This Month -->
		<div class="rounded-xl bg-white p-4 shadow-sm">
			<div class="flex items-center gap-3">
				<div class="rounded-lg bg-purple-100 p-2.5">
					<svg class="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
				</div>
			</div>
			<div class="mt-3">
				<p class="text-2xl font-bold text-gray-900">{data.stats.thisMonth}</p>
				<p class="text-sm text-gray-500">{m.this_month()}</p>
			</div>
		</div>

		<!-- Today -->
		<div class="rounded-xl bg-white p-4 shadow-sm">
			<div class="flex items-center gap-3">
				<div class="rounded-lg bg-teal-100 p-2.5">
					<svg class="h-5 w-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</div>
			</div>
			<div class="mt-3">
				<p class="text-2xl font-bold text-gray-900">{data.stats.today}</p>
				<p class="text-sm text-gray-500">{m.today()}</p>
			</div>
		</div>

		<!-- Pending Transfers -->
		<div class="rounded-xl bg-white p-4 shadow-sm">
			<div class="flex items-center gap-3">
				<div class="rounded-lg bg-red-100 p-2.5">
					<svg class="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
					</svg>
				</div>
			</div>
			<div class="mt-3">
				<p class="text-2xl font-bold text-gray-900">{data.stats.pendingTransfers}</p>
				<p class="text-sm text-gray-500">{m.pending_transfers()}</p>
			</div>
		</div>
	</div>

	<!-- Recent Correspondences -->
	<div class="rounded-xl bg-white shadow-sm">
		<div class="border-b border-gray-200 px-6 py-4">
			<h2 class="text-lg font-semibold text-gray-900">{m.recent_correspondences()}</h2>
		</div>
		{#if data.recentCorrespondences.length === 0}
			<div class="px-6 py-12 text-center text-gray-500">
				<svg class="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
				</svg>
				<p class="mt-2">{m.no_results()}</p>
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead class="bg-gray-50 text-gray-600">
						<tr>
							<th class="px-6 py-3 text-start font-medium">{m.sequence_number()}</th>
							<th class="px-6 py-3 text-start font-medium">{m.reference_number()}</th>
							<th class="px-6 py-3 text-start font-medium">{m.subject()}</th>
							<th class="px-6 py-3 text-start font-medium">{m.type()}</th>
							<th class="px-6 py-3 text-start font-medium">{m.correspondence_date()}</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-100">
						{#each data.recentCorrespondences as item}
							<tr class="transition-colors hover:bg-gray-50">
								<td class="px-6 py-3 font-medium text-gray-900">{item.sequenceNumber}</td>
								<td class="px-6 py-3 text-gray-600">{item.referenceNumber ?? '—'}</td>
								<td class="px-6 py-3">
									<a href="/app/correspondences/{item.id}" class="text-primary-600 hover:underline">
										{item.subject}
									</a>
								</td>
								<td class="px-6 py-3">
									{#if item.type === 'incoming'}
										<span class="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
											{m.incoming()} {item.scope === 'internal' ? m.internal() : m.external()}
										</span>
									{:else}
										<span class="inline-flex rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
											{m.outgoing()} {item.scope === 'internal' ? m.internal() : m.external()}
										</span>
									{/if}
								</td>
								<td class="px-6 py-3 text-gray-600">{item.correspondenceDate}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</div>
