import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { correspondent } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const correspondents = await db.select().from(correspondent);
	return { correspondents };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString() ?? '';
		const type = formData.get('type')?.toString() ?? 'internal';

		if (!name) return fail(400, { message: 'Name is required' });

		await db.insert(correspondent).values({
			name,
			type: type as 'internal' | 'external'
		});
		return { success: true };
	},
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id')?.toString() ?? '';
		if (!id) return fail(400);

		await db.delete(correspondent).where(eq(correspondent.id, id));
		return { success: true };
	}
};
