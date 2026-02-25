<script lang="ts">
	import { enhance } from '$app/forms';
	import * as m from '$lib/paraglide/messages';
	import type { PageServerData, ActionData } from './$types';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();
	let showForm = $state(false);
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-bold text-gray-900">{m.categories()}</h1>
		<button
			onclick={() => (showForm = !showForm)}
			class="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
			</svg>
			{m.add()}
		</button>
	</div>

	<!-- Add Form -->
	{#if showForm}
		<form method="post" action="?/create" use:enhance class="rounded-xl bg-white p-6 shadow-sm">
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div>
					<label for="name" class="block text-sm font-medium text-gray-700">{m.category()} *</label>
					<input
						id="name"
						type="text"
						name="name"
						required
						class="mt-1 block w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
					/>
				</div>
				<div>
					<label for="description" class="block text-sm font-medium text-gray-700">{m.notes()}</label>
					<input
						id="description"
						type="text"
						name="description"
						class="mt-1 block w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
					/>
				</div>
			</div>
			<div class="mt-4 flex items-center justify-end gap-3">
				<button
					type="button"
					onclick={() => (showForm = false)}
					class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				>
					{m.cancel()}
				</button>
				<button
					type="submit"
					class="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
				>
					{m.save()}
				</button>
			</div>
		</form>
	{/if}

	<!-- List -->
	<div class="rounded-xl bg-white shadow-sm">
		{#if data.categories.length === 0}
			<div class="px-6 py-12 text-center text-gray-500">
				<p>{m.no_results()}</p>
			</div>
		{:else}
			<ul class="divide-y divide-gray-100">
				{#each data.categories as cat}
					<li class="flex items-center justify-between px-6 py-4">
						<div>
							<p class="font-medium text-gray-900">{cat.name}</p>
							{#if cat.description}
								<p class="text-sm text-gray-500">{cat.description}</p>
							{/if}
						</div>
						<form method="post" action="?/delete" use:enhance>
							<input type="hidden" name="id" value={cat.id} />
							<button
								type="submit"
								class="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
								title={m.delete()}
							>
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
								</svg>
							</button>
						</form>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
