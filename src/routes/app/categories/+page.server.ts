import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { category } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const categories = await db.select().from(category);
	return { categories };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString() ?? '';
		const description = formData.get('description')?.toString() || null;

		if (!name) return fail(400, { message: 'Name is required' });

		await db.insert(category).values({ name, description });
		return { success: true };
	},
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id')?.toString() ?? '';
		if (!id) return fail(400);

		await db.delete(category).where(eq(category.id, id));
		return { success: true };
	}
};
