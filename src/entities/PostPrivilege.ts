import Entity from "./Entity";

class PostPrivilege extends Entity {
  id: number;
  user_id: number;
  post_id: number;
  can_edit: boolean;

  constructor() {
    super("post_privileges");
  }

  async getUserPrivilege(userId: number, postId: number) {
    const privilege = await this.findOne({ user_id: userId, post_id: postId });
    return privilege ? privilege.can_edit : false;
  }
}

export default new PostPrivilege();
