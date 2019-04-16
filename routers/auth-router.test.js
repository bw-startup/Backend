const request = require("supertest");
const authRouter = require("../server.js");
const resetTestingDB = require("../helpers/resetTestingDB.js");

const endpointPath = "/api/auth";
const userObj = { email: "hello@test.com", password: "123456...." };
const invalidFieldsObj = { field: "incorrect", malicious_field: "not accepted" };

resetTestingDB(); // Add this before each test file that uses the test database

describe("Auth Router", () => {
  describe("[POST] /register Endpoint", () => {
    it("should accept object with required fields", () => {
      return request(authRouter)
        .post(`${endpointPath}/register`)
        .send(userObj)
        .expect(201);
    });

    it("should respond with an object on successful register", () => {
     return request(authRouter)
       .post(`${endpointPath}/register`)
       .send(userObj)
       .expect(201)
       .expect(/\{.+\}/g);
   });

    it("should respond with success message on successful creation", () => {
      return request(authRouter)
        .post(`${endpointPath}/register`)
        .send(userObj)
        .then(res => {
          expect(res.body.message.match(/successfully/i)).toBeTruthy()
        });
    });

    it("should respond with 406 if email already exists", () => {
      return request(authRouter)
        .post(`${endpointPath}/register`)
        .send(userObj)
        .then(res => {
          return request(authRouter)
            .post(`${endpointPath}/register`)
            .send(userObj)
            .expect(406);
        });
    });

    it("should respond with 401 if provided incorrect fields", () => {
      return request(authRouter)
        .post(`${endpointPath}/register`)
        .send(invalidFieldsObj)
        .expect(401);
    });
  });

  describe("[POST] /login Endpoint", () => {
    it("should accept object with required fields", () => {
      return request(authRouter)
        .post(`${endpointPath}/register`)
        .send(userObj)
        .then(res => {
          return request(authRouter)
            .post(`${endpointPath}/login`)
            .send(userObj)
            .expect(200);
        });
    });

    it("should respond with an object on successful login", () => {
      return request(authRouter)
        .post(`${endpointPath}/register`)
        .send(userObj)
        .then(res => {
          return request(authRouter)
            .post(`${endpointPath}/login`)
            .send(userObj)
            .expect(/\{.+\}/g);
        });
    });

    it("should respond with \"welcome\" message on successful login", () => {
      return request(authRouter)
        .post(`${endpointPath}/register`)
        .send(userObj)
        .then(res => {
          return request(authRouter)
            .post(`${endpointPath}/login`)
            .send(userObj)
            .then(res => {
              expect(res.body.message.match(/welcome/i)).toBeTruthy();
            });
        });
    });

    it("should respond with 406 on invalid login credentials", () => {
      return request(authRouter)
        .post(`${endpointPath}/register`)
        .send(userObj)
        .then(res => {
          const invalidUserObj = { ...userObj, email: "different@email.com" };
          return request(authRouter)
            .post(`${endpointPath}/login`)
            .send(invalidUserObj)
            .expect(406);
        });
    });

    it("should respond with 401 if provided incorrect fields", () => {
      return request(authRouter)
        .post(`${endpointPath}/register`)
        .send(userObj)
        .then(res => {
          return request(authRouter)
            .post(`${endpointPath}/login`)
            .send(invalidFieldsObj)
            .expect(401);
        });
    });
  });
  describe("[GET] /verify", () => {
    it("should always respond with 200", () => {
      return request(authRouter)
        .get(`${endpointPath}/verify`)
        .expect(200);
    });

    it("should always respond with an object", () => {
      return request(authRouter)
        .get(`${endpointPath}/verify`)
        .expect(/\{.+\}/);
    });

    it("should always respond with a boolean value", () => {
      return request(authRouter)
        .get(`${endpointPath}/verify`)
        .then(res => {
          expect(typeof res.body.currentUserIsVerified).toBe("boolean");
        });
    });
  });
});
