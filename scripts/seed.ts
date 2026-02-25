import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { user, account } from '../src/lib/server/db/auth.schema';
import { tenant, userTenantRole, category, tenantSettings } from '../src/lib/server/db/schema';
import { hashPassword } from 'better-auth/crypto';

const DATABASE_URL = process.env.DATABASE_URL ?? 'file:local.db';
const client = createClient({ url: DATABASE_URL });
const db = drizzle(client);

async function seed() {
	console.log('🌱 Seeding database...');

	const now = new Date();
	const userId = crypto.randomUUID();
	const accountId = crypto.randomUUID();
	const tenantId = crypto.randomUUID();

	// Create admin user
	await db.insert(user).values({
		id: userId,
		name: 'المسؤول',
		email: 'admin@univ-setif.dz',
		emailVerified: true,
		createdAt: now,
		updatedAt: now
	});
	console.log('✅ User created: admin@univ-setif.dz');

	// Create account with password using better-auth's scrypt hashing
	const hashedPassword = await hashPassword('admin123');
	await db.insert(account).values({
		id: accountId,
		accountId: userId,
		providerId: 'credential',
		userId: userId,
		password: hashedPassword,
		createdAt: now,
		updatedAt: now
	});
	console.log('✅ Account created with password');

	// Create default tenant
	await db.insert(tenant).values({
		id: tenantId,
		name: 'الأمانة العامة',
		slug: 'secretariat-general'
	});
	console.log('✅ Tenant created: الأمانة العامة');

	// Assign super_admin role
	await db.insert(userTenantRole).values({
		userId: userId,
		tenantId: tenantId,
		role: 'super_admin'
	});
	console.log('✅ Role assigned: super_admin');

	// Create default settings
	await db.insert(tenantSettings).values({
		tenantId: tenantId,
		currentAcademicYear: '2024/2025',
		deleteGracePeriodHours: 24
	});
	console.log('✅ Tenant settings created');

	// Create default categories
	const defaultCategories = [
		{ name: 'مراسلات عامة', description: 'المراسلات العامة والإدارية' },
		{ name: 'شهادات', description: 'الشهادات الإدارية والأكاديمية' },
		{ name: 'مقررات إدارية', description: 'المقررات والقرارات الإدارية' },
		{ name: 'قرارات', description: 'القرارات الرسمية' },
		{ name: 'تقارير', description: 'التقارير الإدارية والدورية' }
	];

	for (const cat of defaultCategories) {
		await db.insert(category).values({
			tenantId: tenantId,
			name: cat.name,
			description: cat.description
		});
	}
	console.log('✅ Default categories created');

	console.log('\n🎉 Seed complete!');
	console.log('📧 Email: admin@univ-setif.dz');
	console.log('🔑 Password: admin123');
}

seed()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error('❌ Seed failed:', err);
		process.exit(1);
	});
