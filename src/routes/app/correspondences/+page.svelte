<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();

	const totalPages = $derived(Math.ceil(data.total / data.perPage));
</script>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex flex-wrap items-center justify-between gap-4">
		<h1 class="text-2xl font-bold text-gray-900">{m.correspondences()}</h1>
		<a
			href="/app/correspondences/new"
			class="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
			</svg>
			{m.add()}
		</a>
	</div>

	<!-- Filters -->
	<div class="flex flex-wrap items-center gap-3">
		<form method="get" class="flex flex-1 flex-wrap items-center gap-3">
			<div class="relative min-w-[200px] flex-1">
				<svg class="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
				<input
					type="search"
					name="q"
					value={data.search}
					placeholder="{m.search()}..."
					class="w-full rounded-lg border-gray-300 py-2 pe-4 ps-10 text-sm focus:border-primary-500 focus:ring-primary-500"
				/>
			</div>
			<select
				name="type"
				class="rounded-lg border-gray-300 py-2 text-sm focus:border-primary-500 focus:ring-primary-500"
			>
				<option value="">{m.type()}</option>
				<option value="incoming" selected={data.typeFilter === 'incoming'}>{m.incoming()}</option>
				<option value="outgoing" selected={data.typeFilter === 'outgoing'}>{m.outgoing()}</option>
			</select>
			<select
				name="scope"
				class="rounded-lg border-gray-300 py-2 text-sm focus:border-primary-500 focus:ring-primary-500"
			>
				<option value="">{m.scope()}</option>
				<option value="internal" selected={data.scopeFilter === 'internal'}>{m.internal()}</option>
				<option value="external" selected={data.scopeFilter === 'external'}>{m.external()}</option>
			</select>
			<button
				type="submit"
				class="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
			>
				{m.search()}
			</button>
		</form>
	</div>

	<!-- Table -->
	<div class="rounded-xl bg-white shadow-sm">
		{#if data.correspondences.length === 0}
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
							<th class="px-6 py-3 text-start font-medium">{m.academic_year()}</th>
							<th class="px-6 py-3 text-start font-medium">{m.actions()}</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-100">
						{#each data.correspondences as item}
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
								<td class="px-6 py-3 text-gray-600">{item.academicYear}</td>
								<td class="px-6 py-3">
									<div class="flex items-center gap-2">
										<a
											href="/app/correspondences/{item.id}"
											class="text-primary-600 hover:text-primary-800"
											title={m.view()}
										>
											<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
											</svg>
										</a>
										<a
											href="/app/correspondences/{item.id}/edit"
											class="text-gray-500 hover:text-gray-700"
											title={m.edit()}
										>
											<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
											</svg>
										</a>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<!-- Pagination -->
			{#if totalPages > 1}
				<div class="flex items-center justify-between border-t border-gray-200 px-6 py-3">
					<p class="text-sm text-gray-500">
						{data.total} {m.total_correspondences()}
					</p>
					<div class="flex items-center gap-1">
						{#each Array(totalPages) as _, i}
							<a
								href="?page={i + 1}&q={data.search}&type={data.typeFilter}&scope={data.scopeFilter}"
								class="rounded-md px-3 py-1 text-sm {data.page === i + 1
									? 'bg-primary-600 text-white'
									: 'text-gray-600 hover:bg-gray-100'}"
							>
								{i + 1}
							</a>
						{/each}
					</div>
				</div>
			{/if}
		{/if}
	</div>
</div>
