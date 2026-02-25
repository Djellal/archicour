import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { correspondence, category, correspondent } from '$lib/server/db/schema';
import { eq, like, and, sql, desc } from 'drizzle-orm';

export const load: PageServerLoad = async ({ url }) => {
	const search = url.searchParams.get('q') ?? '';
	const typeFilter = url.searchParams.get('type') ?? '';
	const scopeFilter = url.searchParams.get('scope') ?? '';
	const page = parseInt(url.searchParams.get('page') ?? '1');
	const perPage = 20;

	const conditions = [];

	if (search) {
		conditions.push(
			like(correspondence.subject, `%${search}%`)
		);
	}
	if (typeFilter === 'incoming' || typeFilter === 'outgoing') {
		conditions.push(eq(correspondence.type, typeFilter));
	}
	if (scopeFilter === 'internal' || scopeFilter === 'external') {
		conditions.push(eq(correspondence.scope, scopeFilter));
	}

	const where = conditions.length > 0 ? and(...conditions) : undefined;

	const [countResult] = await db
		.select({ count: sql<number>`count(*)` })
		.from(correspondence)
		.where(where);

	const items = await db
		.select()
		.from(correspondence)
		.where(where)
		.orderBy(desc(correspondence.createdAt))
		.limit(perPage)
		.offset((page - 1) * perPage);

	const categories = await db.select().from(category);

	return {
		correspondences: items,
		categories,
		total: countResult.count,
		page,
		perPage,
		search,
		typeFilter,
		scopeFilter
	};
};
