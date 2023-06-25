const request = require("supertest");
const app = require("../../server");
const { disconnectDB } = require("../../databases/db");

describe("Customer Routes", () => {
  it("should get all customers", async () => {
    const res = await request(app).get("/customers");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
  });

  it("should get customer by ID", async () => {
    const res = await request(app).get("/customers/:id");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
  });

  it("should add a new customer", async () => {
    const newCustomer = {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
    };

    const res = await request(app).post("/customers").send(newCustomer);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeDefined();
    expect(res.body.name).toEqual(newCustomer.name);
    expect(res.body.email).toEqual(newCustomer.email);
    expect(res.body.phone).toEqual(newCustomer.phone);
  });

  it("should update a customer", async () => {
    const updatedCustomer = {
      name: "Updated Name",
      email: "updated@example.com",
      phone: "9876543210",
    };
    const res = await request(app)
      .patch("/customers/:id")
      .send(updatedCustomer);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body.name).toEqual(updatedCustomer.name);
    expect(res.body.email).toEqual(updatedCustomer.email);
    expect(res.body.phone).toEqual(updatedCustomer.phone);
  });

  it("should delete a customer", async () => {
    const res = await request(app).delete("/customers/:id");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body.message).toEqual("Customer deleted successfully");
  });
});

afterAll(async () => {
  await disconnectDB();
});
