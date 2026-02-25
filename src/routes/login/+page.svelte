<script lang="ts">
	import { enhance } from '$app/forms';
	import * as m from '$lib/paraglide/messages';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 px-4">
	<div class="w-full max-w-md">
		<div class="rounded-2xl bg-white p-8 shadow-2xl">
			<!-- Header -->
			<div class="mb-8 text-center">
				<h2 class="text-sm font-medium tracking-wide text-blue-600">
					{m.university_name()}
				</h2>
				<h1 class="mt-3 text-3xl font-bold text-gray-900">
					{m.app_name()}
				</h1>
				<p class="mt-1 text-sm text-gray-500">
					{m.app_title()}
				</p>
			</div>

			<!-- Login title -->
			<div class="mb-6 text-center">
				<h3 class="text-lg font-semibold text-gray-800">
					{m.login_title()}
				</h3>
				<p class="mt-1 text-sm text-gray-500">
					{m.login_subtitle()}
				</p>
			</div>

			<!-- Error message -->
			{#if form?.message}
				<div class="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
					{form.message}
				</div>
			{/if}

			<!-- Form -->
			<form method="post" use:enhance class="space-y-5">
				<div>
					<label for="email" class="mb-1 block text-sm font-medium text-gray-700">
						{m.email()}
					</label>
					<input
						id="email"
						type="email"
						name="email"
						required
						class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
					/>
				</div>

				<div>
					<label for="password" class="mb-1 block text-sm font-medium text-gray-700">
						{m.password()}
					</label>
					<input
						id="password"
						type="password"
						name="password"
						required
						class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
					/>
				</div>

				<button
					type="submit"
					class="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white shadow-sm transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:bg-blue-800"
				>
					{m.login()}
				</button>
			</form>
		</div>

		<!-- Footer -->
		<p class="mt-6 text-center text-xs text-blue-200">
			{m.app_name()} &copy; {new Date().getFullYear()}
		</p>
	</div>
</div>
