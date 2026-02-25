import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { correspondence, category, correspondent, tenantSettings } from '$lib/server/db/schema';
import { sql, eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const categories = await db.select().from(category);
	const correspondents = await db.select().from(correspondent);

	const [nextSeq] = await db
		.select({ max: sql<number>`coalesce(max(${correspondence.sequenceNumber}), 0) + 1` })
		.from(correspondence);

	return {
		categories,
		correspondents,
		nextSequenceNumber: nextSeq.max,
		academicYear: '2024/2025'
	};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) return fail(401);

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

		const [nextSeq] = await db
			.select({ max: sql<number>`coalesce(max(${correspondence.sequenceNumber}), 0) + 1` })
			.from(correspondence);

		const [created] = await db
			.insert(correspondence)
			.values({
				sequenceNumber: nextSeq.max,
				referenceNumber,
				academicYear,
				subject,
				type: type as 'incoming' | 'outgoing',
				scope: scope as 'internal' | 'external',
				correspondentId,
				categoryId,
				correspondenceDate,
				receivedSentDate,
				notes,
				createdBy: locals.user.id
			})
			.returning();

		return redirect(302, `/app/correspondences/${created.id}`);
	}
};
