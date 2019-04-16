const request = require("supertest");
const serverRoot = require("./server.js");

describe("Server Root", () => {
  it("should be running in \"testing\" environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("[GET] / Endpoint", () => {
    it("should respond with status code of 200", () => {
      return request(serverRoot)
        .get("/")
        .expect(200);
    });

    it("should have CORS enabled", () => {
      return request(serverRoot)
        .get("/")
        .expect("Access-Control-Allow-Origin", "*");
    });

    it("should respond with message as string", () => {
      return request(serverRoot)
        .get("/")
        .expect("Content-Type", /text\/html/g);
    });
  });
});
