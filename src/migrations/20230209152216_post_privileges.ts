import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("post_privileges", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().references("users.id");
    table.integer("post_id").unsigned().references("posts.id");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("post_privileges");
}