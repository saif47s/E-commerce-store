import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260222082624 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "storefront_page" drop constraint if exists "storefront_page_handle_unique";`);
    this.addSql(`create table if not exists "storefront_page" ("id" text not null, "handle" text not null, "title" text not null, "content" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "storefront_page_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_storefront_page_handle_unique" ON "storefront_page" ("handle") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_storefront_page_deleted_at" ON "storefront_page" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "storefront_page" cascade;`);
  }

}
