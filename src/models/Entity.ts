import knex from "knex";
import connection from "../../db";

abstract class Entity {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  public async create(data: any) {
    const ids = await connection(this.tableName).insert(data, 'id');
    return ids[0].id;
  }

  public async getById(id: number) {
    return await connection(this.tableName).where({ id }).first();
  }

  public async update(id: number, data: any) {
    return await connection(this.tableName).where({ id }).update(data);
  }

  public async delete(id: number) {
    return await connection(this.tableName).where({ id }).del();
  }

  public async findBy(key: string, value: any) {
    return await connection(this.tableName)
      .where({ [key]: value })
      .first();
  }
}

export default Entity;
