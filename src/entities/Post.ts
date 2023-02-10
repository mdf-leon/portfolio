import connection from "../../db";
import Entity from "./Entity";

class Post extends Entity {
  id: number;
  user_id: number;
  title: string;
  content: string;
  is_private: boolean;

  constructor() {
    super("posts");
  }

  async getUser() {
    const user = await connection("users")
      .select("*")
      .where({ id: this.user_id })
      .first();

    return user;
  }

  async getPostPrivileges() {
    const postPrivileges = await connection("post_privileges")
      .select("*")
      .where({ post_id: this.id });

    return postPrivileges;
  }
}

export default new Post();
