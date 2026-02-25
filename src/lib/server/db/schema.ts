import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const tenant = sqliteTable('tenant', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	slug: text('slug').notNull().unique(),
	createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
	updatedAt: text('updated_at').$defaultFn(() => new Date().toISOString())
});

export const userTenantRole = sqliteTable('user_tenant_role', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: text('user_id').notNull(),
	tenantId: text('tenant_id')
		.notNull()
		.references(() => tenant.id),
	role: text('role', { enum: ['super_admin', 'admin', 'user', 'viewer'] }).default('user'),
	createdAt: text('created_at').$defaultFn(() => new Date().toISOString())
});

export const category = sqliteTable('category', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	tenantId: text('tenant_id').references(() => tenant.id),
	name: text('name').notNull(),
	description: text('description'),
	createdAt: text('created_at').$defaultFn(() => new Date().toISOString())
});

export const correspondent = sqliteTable('correspondent', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	tenantId: text('tenant_id').references(() => tenant.id),
	name: text('name').notNull(),
	type: text('type', { enum: ['internal', 'external'] }).default('internal'),
	createdAt: text('created_at').$defaultFn(() => new Date().toISOString())
});

export const correspondence = sqliteTable('correspondence', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	tenantId: text('tenant_id').references(() => tenant.id),
	sequenceNumber: integer('sequence_number').notNull(),
	referenceNumber: text('reference_number'),
	academicYear: text('academic_year').notNull(),
	subject: text('subject').notNull(),
	type: text('type', { enum: ['incoming', 'outgoing'] }).notNull(),
	scope: text('scope', { enum: ['internal', 'external'] }).notNull(),
	correspondentId: text('correspondent_id').references(() => correspondent.id),
	categoryId: text('category_id').references(() => category.id),
	correspondenceDate: text('correspondence_date').notNull(),
	receivedSentDate: text('received_sent_date'),
	notes: text('notes'),
	createdBy: text('created_by').notNull(),
	createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
	updatedAt: text('updated_at').$defaultFn(() => new Date().toISOString())
});

export const attachment = sqliteTable('attachment', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	correspondenceId: text('correspondence_id').references(() => correspondence.id, {
		onDelete: 'cascade'
	}),
	filename: text('filename').notNull(),
	filepath: text('filepath').notNull(),
	mimetype: text('mimetype').default('application/pdf'),
	size: integer('size').default(0),
	createdAt: text('created_at').$defaultFn(() => new Date().toISOString())
});

export const correspondenceLink = sqliteTable('correspondence_link', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	correspondenceId: text('correspondence_id').references(() => correspondence.id, {
		onDelete: 'cascade'
	}),
	linkedCorrespondenceId: text('linked_correspondence_id').references(() => correspondence.id, {
		onDelete: 'cascade'
	}),
	createdAt: text('created_at').$defaultFn(() => new Date().toISOString())
});

export const transfer = sqliteTable('transfer', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	correspondenceId: text('correspondence_id').references(() => correspondence.id),
	fromUserId: text('from_user_id').notNull(),
	toUserId: text('to_user_id').notNull(),
	note: text('note'),
	status: text('status', { enum: ['pending', 'viewed', 'cancelled'] }).default('pending'),
	createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
	viewedAt: text('viewed_at')
});

export const tenantSettings = sqliteTable('tenant_settings', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	tenantId: text('tenant_id')
		.references(() => tenant.id)
		.unique(),
	currentAcademicYear: text('current_academic_year').default('2024/2025'),
	deleteGracePeriodHours: integer('delete_grace_period_hours').default(24),
	createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
	updatedAt: text('updated_at').$defaultFn(() => new Date().toISOString())
});

export const auditLog = sqliteTable('audit_log', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	tenantId: text('tenant_id').references(() => tenant.id),
	userId: text('user_id').notNull(),
	action: text('action', { enum: ['create', 'update', 'delete', 'view'] }),
	entityType: text('entity_type').notNull(),
	entityId: text('entity_id').notNull(),
	details: text('details'),
	createdAt: text('created_at').$defaultFn(() => new Date().toISOString())
});

export * from './auth.schema';
