import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("posts", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("body").notNullable();
    table.boolean("private").defaultTo(false);
    table.integer("user_id").unsigned().references("users.id");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("posts");
}