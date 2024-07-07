import bodyParser from "body-parser";
import express from "express";
import request from "supertest";

import sequelize from "../../src/config/database";
import User from "../../src/models/user";
import userRoutes from "../../src/routes/userRoutes";
import { AuthResponse, UserResponse } from "../../src/types";

const app = express();
app.use(bodyParser.json());
app.use("/api/v1", userRoutes);

beforeAll(async () => {
	await sequelize.sync();
});

afterAll(async () => {
	await sequelize.close();
});

afterEach(async () => {
	await User.destroy({ where: {}, truncate: true });
});

describe("UserRoutes", () => {
	it("should create a new user", async () => {
		const response = await request(app).post("/api/v1/users").send({
			email: "test@example.com",
			password: "password",
			name: "Test",
			lastName: "User",
		});

		const body = response.body as UserResponse;

		expect(response.status).toBe(201);
		expect(body.id).toBeGreaterThan(0);
	});

	it("should login a user", async () => {
		await request(app).post("/api/v1/users").send({
			email: "login@example.com",
			password: "password",
			name: "Login",
			lastName: "User",
		});

		const response = await request(app).post("/api/v1/auth").send({
			email: "login@example.com",
			password: "password",
		});

		const body = response.body as AuthResponse;

		expect(response.status).toBe(200);
		expect(body.message).toBe("Inició sesión correctamente");
	});

	it("should delete a user", async () => {
		const userResponse = await request(app).post("/api/v1/users").send({
			email: "delete@example.com",
			password: "password",
			name: "Delete",
			lastName: "User",
		});

		const user = userResponse.body as UserResponse;

		const response = await request(app).delete(`/api/v1/users/${user.id}`);

		const body = response.body as { message: string };

		expect(response.status).toBe(200);
		expect(body.message).toBe("Usuario eliminado correctamente");
	});
});
