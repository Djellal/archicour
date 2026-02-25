import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { transfer, correspondence } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) return { transfers: [] };

	const transfers = await db
		.select({
			transfer: transfer,
			correspondence: correspondence
		})
		.from(transfer)
		.leftJoin(correspondence, eq(transfer.correspondenceId, correspondence.id))
		.where(eq(transfer.toUserId, locals.user.id))
		.orderBy(desc(transfer.createdAt));

	return { transfers };
};
