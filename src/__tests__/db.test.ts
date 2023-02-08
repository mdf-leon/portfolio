import { App } from "../index";
import connection from "../../db";

describe("App database connection", () => {
  let app: App;

  beforeAll(async () => {
    app = new App();
  });

  afterAll(async () => { 
    await app.closeApp();
  });

  it("should establish a database connection", async () => { 
    try {
      const result = await connection.raw("SELECT 1");
      expect(result.rows.length).toBeGreaterThan(0);
    } finally {
      connection.destroy();
    }
  });
});
