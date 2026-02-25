import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { correspondence, category, correspondent } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
	const [item] = await db
		.select()
		.from(correspondence)
		.where(eq(correspondence.id, params.id));

	if (!item) return error(404);

	const categories = await db.select().from(category);
	const correspondents = await db.select().from(correspondent);

	return {
		correspondence: item,
		categories,
		correspondents
	};
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const formData = await request.formData();
		const subject = formData.get('subject')?.toString() ?? '';
		const type = formData.get('type')?.toString() ?? '';
		const scope = formData.get('scope')?.toString() ?? '';
		const referenceNumber = formData.get('referenceNumber')?.toString() || null;
		const correspondenceDate = formData.get('correspondenceDate')?.toString() ?? '';
		const receivedSentDate = formData.get('receivedSentDate')?.toString() || null;
		const categoryId = formData.get('categoryId')?.toString() || null;
		const correspondentId = formData.get('correspondentId')?.toString() || null;
		const notes = formData.get('notes')?.toString() || null;
		const academicYear = formData.get('academicYear')?.toString() ?? '2024/2025';

		if (!subject || !type || !scope || !correspondenceDate) {
			return fail(400, { message: 'Missing required fields' });
		}

		await db
			.update(correspondence)
			.set({
				subject,
				type: type as 'incoming' | 'outgoing',
				scope: scope as 'internal' | 'external',
				referenceNumber,
				correspondenceDate,
				receivedSentDate,
				categoryId,
				correspondentId,
				notes,
				academicYear,
				updatedAt: new Date().toISOString()
			})
			.where(eq(correspondence.id, params.id));

		return redirect(302, `/app/correspondences/${params.id}`);
	}
};
