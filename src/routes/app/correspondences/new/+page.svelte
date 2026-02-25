<script lang="ts">
	import { enhance } from '$app/forms';
	import * as m from '$lib/paraglide/messages';
	import type { PageServerData, ActionData } from './$types';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();
</script>

<div class="mx-auto max-w-3xl space-y-6">
	<div class="flex items-center gap-4">
		<a href="/app/correspondences" class="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100" aria-label={m.back()}>
			<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
			</svg>
		</a>
		<h1 class="text-2xl font-bold text-gray-900">{m.add()} {m.correspondences()}</h1>
	</div>

	{#if form?.message}
		<div class="rounded-lg bg-red-50 p-4 text-sm text-red-600">{form.message}</div>
	{/if}

	<form method="post" use:enhance class="space-y-6 rounded-xl bg-white p-6 shadow-sm">
		<!-- Type and Scope -->
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<label for="type" class="block text-sm font-medium text-gray-700">{m.type()} *</label>
				<select
					id="type"
					name="type"
					required
					class="mt-1 block w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
				>
					<option value="incoming">{m.incoming()}</option>
					<option value="outgoing">{m.outgoing()}</option>
				</select>
			</div>
			<div>
				<label for="scope" class="block text-sm font-medium text-gray-700">{m.scope()} *</label>
				<select
					id="scope"
					name="scope"
					required
					class="mt-1 block w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
				>
					<option value="internal">{m.internal()}</option>
					<option value="external">{m.external()}</option>
				</select>
			</div>
		</div>

		<!-- Subject -->
		<div>
			<label for="subject" class="block text-sm font-medium text-gray-700">{m.subject()} *</label>
			<input
				id="subject"
				type="text"
				name="subject"
				required
				class="mt-1 block w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
			/>
		</div>

		<!-- Reference Number and Academic Year -->
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<label for="referenceNumber" class="block text-sm font-medium text-gray-700">{m.reference_number()}</label>
				<input
					id="referenceNumber"
					type="text"
					name="referenceNumber"
					class="mt-1 block w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
				/>
			</div>
			<div>
				<label for="academicYear" class="block text-sm font-medium text-gray-700">{m.academic_year()}</label>
				<input
					id="academicYear"
					type="text"
					name="academicYear"
					value={data.academicYear}
					class="mt-1 block w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
				/>
			</div>
		</div>

		<!-- Dates -->
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<label for="correspondenceDate" class="block text-sm font-medium text-gray-700">{m.correspondence_date()} *</label>
				<input
					id="correspondenceDate"
					type="date"
					name="correspondenceDate"
					required
					class="mt-1 block w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
				/>
			</div>
			<div>
				<label for="receivedSentDate" class="block text-sm font-medium text-gray-700">{m.received_date()} / {m.sent_date()}</label>
				<input
					id="receivedSentDate"
					type="date"
					name="receivedSentDate"
					class="mt-1 block w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
				/>
			</div>
		</div>

		<!-- Category and Correspondent -->
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<label for="categoryId" class="block text-sm font-medium text-gray-700">{m.category()}</label>
				<select
					id="categoryId"
					name="categoryId"
					class="mt-1 block w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
				>
					<option value="">—</option>
					{#each data.categories as cat}
						<option value={cat.id}>{cat.name}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="correspondentId" class="block text-sm font-medium text-gray-700">{m.sender()} / {m.recipient()}</label>
				<select
					id="correspondentId"
					name="correspondentId"
					class="mt-1 block w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
				>
					<option value="">—</option>
					{#each data.correspondents as corr}
						<option value={corr.id}>{corr.name}</option>
					{/each}
				</select>
			</div>
		</div>

		<!-- Notes -->
		<div>
			<label for="notes" class="block text-sm font-medium text-gray-700">{m.notes()}</label>
			<textarea
				id="notes"
				name="notes"
				rows="3"
				class="mt-1 block w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
			></textarea>
		</div>

		<!-- Actions -->
		<div class="flex items-center justify-end gap-3 border-t border-gray-200 pt-4">
			<a
				href="/app/correspondences"
				class="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
			>
				{m.cancel()}
			</a>
			<button
				type="submit"
				class="rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
			>
				{m.save()}
			</button>
		</div>
	</form>
</div>
