import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import {
	correspondence,
	category,
	correspondent,
	correspondenceLink,
	attachment
} from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
	const [item] = await db
		.select()
		.from(correspondence)
		.where(eq(correspondence.id, params.id));

	if (!item) return error(404);

	const attachments = await db
		.select()
		.from(attachment)
		.where(eq(attachment.correspondenceId, params.id));

	const links = await db
		.select()
		.from(correspondenceLink)
		.where(eq(correspondenceLink.correspondenceId, params.id));

	let linkedItems: (typeof item)[] = [];
	if (links.length > 0) {
		linkedItems = await db
			.select()
			.from(correspondence)
			.where(
				eq(
					correspondence.id,
					links[0].linkedCorrespondenceId!
				)
			);
	}

	let cat = null;
	if (item.categoryId) {
		const [c] = await db.select().from(category).where(eq(category.id, item.categoryId));
		cat = c ?? null;
	}

	let corr = null;
	if (item.correspondentId) {
		const [c] = await db
			.select()
			.from(correspondent)
			.where(eq(correspondent.id, item.correspondentId));
		corr = c ?? null;
	}

	return {
		correspondence: item,
		attachments,
		linkedCorrespondences: linkedItems,
		category: cat,
		correspondent: corr
	};
};

export const actions: Actions = {
	delete: async ({ params }) => {
		await db.delete(correspondence).where(eq(correspondence.id, params.id));
		return redirect(302, '/app/correspondences');
	}
};
