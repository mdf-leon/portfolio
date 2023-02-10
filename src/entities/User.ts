import Entity from "./Entity";
import bcrypt from "bcrypt";
import connection from "../../db";

class User extends Entity {
  id: number;
  username: string;
  email: string;
  password: string;

  constructor() {
    super("users");
  }

  async create(data: any) {
    const tempData = { ...data };
    tempData.password = await bcrypt.hash(tempData.password, 10);
    return super.create(tempData);
  }

  async getPosts() {
    const posts = await connection("posts")
      .select("*")
      .where({ user_id: this.id });

    return posts;
  }

  async getFollowers() {
    const followers = await connection("followers")
      .select("users.*")
      .join("users", "followers.follower_id", "=", "users.id")
      .where({ user_id: this.id });

    return followers;
  }

  async getFollowings() {
    const followings = await connection("followers")
      .select("users.*")
      .join("users", "followers.user_id", "=", "users.id")
      .where({ follower_id: this.id });

    return followings;
  }
}

export default new User();
