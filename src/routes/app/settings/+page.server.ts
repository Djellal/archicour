import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { tenantSettings } from '$lib/server/db/schema';
import { sql } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const [settings] = await db.select().from(tenantSettings).limit(1);

	return {
		settings: settings ?? {
			currentAcademicYear: '2024/2025',
			deleteGracePeriodHours: 24
		}
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const currentAcademicYear = formData.get('currentAcademicYear')?.toString() ?? '2024/2025';
		const deleteGracePeriodHours = parseInt(
			formData.get('deleteGracePeriodHours')?.toString() ?? '24'
		);

		const [existing] = await db.select().from(tenantSettings).limit(1);

		if (existing) {
			await db
				.update(tenantSettings)
				.set({
					currentAcademicYear,
					deleteGracePeriodHours,
					updatedAt: new Date().toISOString()
				})
				.where(sql`${tenantSettings.id} = ${existing.id}`);
		} else {
			await db.insert(tenantSettings).values({
				currentAcademicYear,
				deleteGracePeriodHours
			});
		}

		return { success: true };
	}
};
