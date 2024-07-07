import { Request, Response } from "express";

import UserController from "../../src/controllers/userController";
import userService from "../../src/services/userService";
import { LoginDTO, UserDTO } from "../../src/types";

jest.mock("../../src/services/userService");

describe("UserController", () => {
	let req: Partial<Request>;
	let res: Partial<Response>;
	let statusMock: jest.Mock;
	let jsonMock: jest.Mock;

	beforeEach(() => {
		req = {};
		res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn().mockReturnThis(),
		};
		statusMock = res.status as jest.Mock;
		jsonMock = res.json as jest.Mock;
	});

	describe("createUser", () => {
		it("should create a user successfully", async () => {
			const mockUser = {
				dataValues: {
					id: 1,
				},
			};
			(userService.createUser as jest.Mock).mockResolvedValue(mockUser);

			req.body = { email: "test@example.com", password: "password" } as UserDTO;

			await UserController.createUser(req as Request<unknown, unknown, UserDTO>, res as Response);

			expect(statusMock).toHaveBeenCalledWith(201);
			expect(jsonMock).toHaveBeenCalledWith({
				code: 201,
				status: "success",
				message: "Usuario creado correctamente",
				id: mockUser.dataValues.id,
			});
		});

		it("should handle errors when creating a user", async () => {
			(userService.createUser as jest.Mock).mockRejectedValue(new Error("Error"));

			req.body = { email: "test@example.com", password: "password" } as UserDTO;

			await UserController.createUser(req as Request<unknown, unknown, UserDTO>, res as Response);

			expect(statusMock).toHaveBeenCalledWith(400);
			expect(jsonMock).toHaveBeenCalledWith({
				code: 400,
				status: "error",
				message: "Hubo un problema al intentar crear el usuario",
			});
		});
	});

	describe("loginUser", () => {
		it("should login a user successfully", async () => {
			const mockUser = { id: 1 };
			(userService.loginUser as jest.Mock).mockResolvedValue(mockUser);

			req.body = { email: "test@example.com", password: "password" } as LoginDTO;

			await UserController.loginUser(req as Request<unknown, unknown, LoginDTO>, res as Response);

			expect(statusMock).toHaveBeenCalledWith(200);
			expect(jsonMock).toHaveBeenCalledWith({
				code: 200,
				status: "success",
				message: "Inició sesión correctamente",
			});
		});

		it("should handle invalid login credentials", async () => {
			(userService.loginUser as jest.Mock).mockResolvedValue(null);

			req.body = { email: "test@example.com", password: "password" } as LoginDTO;

			await UserController.loginUser(req as Request<unknown, unknown, LoginDTO>, res as Response);

			expect(statusMock).toHaveBeenCalledWith(400);
			expect(jsonMock).toHaveBeenCalledWith({
				code: 400,
				status: "error",
				message:
					"La combinación de correo electrónico y contraseña proporcionada no coincide con ningún usuario en la base de datos",
			});
		});

		it("should handle errors during login", async () => {
			(userService.loginUser as jest.Mock).mockRejectedValue(new Error("Error"));

			req.body = { email: "test@example.com", password: "password" } as LoginDTO;

			await UserController.loginUser(req as Request<unknown, unknown, LoginDTO>, res as Response);

			expect(statusMock).toHaveBeenCalledWith(400);
			expect(jsonMock).toHaveBeenCalledWith({
				code: 400,
				status: "error",
				message:
					"La combinación de correo electrónico y contraseña proporcionada no coincide con ningún usuario en la base de datos",
			});
		});
	});

	describe("deleteUser", () => {
		it("should delete a user successfully", async () => {
			(userService.deleteUser as jest.Mock).mockResolvedValue(true);

			req.params = { id: "1" };

			await UserController.deleteUser(req as Request, res as Response);

			expect(statusMock).toHaveBeenCalledWith(200);
			expect(jsonMock).toHaveBeenCalledWith({
				code: 200,
				status: "success",
				message: "Usuario eliminado correctamente",
			});
		});

		it("should handle user not found", async () => {
			(userService.deleteUser as jest.Mock).mockResolvedValue(false);

			req.params = { id: "1" };

			await UserController.deleteUser(req as Request, res as Response);

			expect(statusMock).toHaveBeenCalledWith(404);
			expect(jsonMock).toHaveBeenCalledWith({
				code: 404,
				status: "error",
				message: "Usuario no encontrado",
			});
		});

		it("should handle errors during user deletion", async () => {
			(userService.deleteUser as jest.Mock).mockRejectedValue(new Error("Error"));

			req.params = { id: "1" };

			await UserController.deleteUser(req as Request, res as Response);

			expect(statusMock).toHaveBeenCalledWith(400);
			expect(jsonMock).toHaveBeenCalledWith({
				code: 400,
				status: "error",
				message: "Hubo un problema al intentar eliminar al Usuario",
			});
		});
	});
});
