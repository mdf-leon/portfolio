import Entity from "./Entity";

class Email extends Entity {
  id: number;
  email: string;

  constructor() {
    super("emails");
  }
}

export default new Email();
