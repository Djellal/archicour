import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { correspondence, transfer } from '$lib/server/db/schema';
import { eq, sql, gte } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const now = new Date();
	const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
	const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();

	const [totalResult] = await db
		.select({ count: sql<number>`count(*)` })
		.from(correspondence);

	const [incomingResult] = await db
		.select({ count: sql<number>`count(*)` })
		.from(correspondence)
		.where(eq(correspondence.type, 'incoming'));

	const [outgoingResult] = await db
		.select({ count: sql<number>`count(*)` })
		.from(correspondence)
		.where(eq(correspondence.type, 'outgoing'));

	const [monthResult] = await db
		.select({ count: sql<number>`count(*)` })
		.from(correspondence)
		.where(gte(correspondence.createdAt, startOfMonth));

	const [todayResult] = await db
		.select({ count: sql<number>`count(*)` })
		.from(correspondence)
		.where(gte(correspondence.createdAt, startOfDay));

	const [pendingResult] = await db
		.select({ count: sql<number>`count(*)` })
		.from(transfer)
		.where(eq(transfer.status, 'pending'));

	const recentCorrespondences = await db
		.select()
		.from(correspondence)
		.orderBy(sql`${correspondence.createdAt} DESC`)
		.limit(10);

	return {
		stats: {
			total: totalResult.count,
			incoming: incomingResult.count,
			outgoing: outgoingResult.count,
			thisMonth: monthResult.count,
			today: todayResult.count,
			pendingTransfers: pendingResult.count
		},
		recentCorrespondences
	};
};
