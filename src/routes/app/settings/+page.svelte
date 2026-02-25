<script lang="ts">
	import { enhance } from '$app/forms';
	import * as m from '$lib/paraglide/messages';
	import type { PageServerData, ActionData } from './$types';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();
</script>

<div class="mx-auto max-w-2xl space-y-6">
	<h1 class="text-2xl font-bold text-gray-900">{m.settings()}</h1>

	{#if form?.success}
		<div class="rounded-lg bg-green-50 p-4 text-sm text-green-600">{m.success()}</div>
	{/if}

	<form method="post" use:enhance class="space-y-6 rounded-xl bg-white p-6 shadow-sm">
		<div>
			<label for="currentAcademicYear" class="block text-sm font-medium text-gray-700">
				{m.current_academic_year()}
			</label>
			<input
				id="currentAcademicYear"
				type="text"
				name="currentAcademicYear"
				value={data.settings.currentAcademicYear}
				placeholder="2024/2025"
				class="mt-1 block w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
			/>
		</div>

		<div>
			<label for="deleteGracePeriodHours" class="block text-sm font-medium text-gray-700">
				{m.delete_grace_period()}
			</label>
			<input
				id="deleteGracePeriodHours"
				type="number"
				name="deleteGracePeriodHours"
				value={data.settings.deleteGracePeriodHours}
				min="1"
				class="mt-1 block w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
			/>
		</div>

		<div class="flex items-center justify-end border-t border-gray-200 pt-4">
			<button
				type="submit"
				class="rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
			>
				{m.save_settings()}
			</button>
		</div>
	</form>
</div>
