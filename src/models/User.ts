import Entity from "./Entity";
import bcrypt from "bcrypt";

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
}

export default new User();
