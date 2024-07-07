// src/controllers/userController.ts
import { Request, Response } from "express";

import User from "../models/user";
import userService from "../services/userService";
import { LoginDTO, UserDTO } from "../types";

class UserController {
	public async createUser(req: Request<unknown, unknown, UserDTO>, res: Response): Promise<void> {
		try {
			const user: User = await userService.createUser(req.body);

			res.status(201).json({
				code: 201,
				status: "success",
				message: "Usuario creado correctamente",
				id: user.dataValues.id,
			});
		} catch (error) {
			res.status(400).json({
				code: 400,
				status: "error",
				message: "Hubo un problema al intentar crear el usuario",
			});
		}
	}

	public async loginUser(req: Request<unknown, unknown, LoginDTO>, res: Response): Promise<void> {
		try {
			const user = await userService.loginUser(req.body.email, req.body.password);

			if (!user) {
				res.status(400).json({
					code: 400,
					status: "error",
					message:
						"La combinación de correo electrónico y contraseña proporcionada no coincide con ningún usuario en la base de datos",
				});

				return;
			}

			res.status(200).json({
				code: 200,
				status: "success",
				message: "Inició sesión correctamente",
			});
		} catch (error) {
			res.status(400).json({
				code: 400,
				status: "error",
				message:
					"La combinación de correo electrónico y contraseña proporcionada no coincide con ningún usuario en la base de datos",
			});
		}
	}

	public async deleteUser(req: Request, res: Response): Promise<void> {
		try {
			const result = await userService.deleteUser(Number(req.params.id));

			if (!result) {
				res.status(404).json({
					code: 404,
					status: "error",
					message: "Usuario no encontrado",
				});

				return;
			}

			res.status(200).json({
				code: 200,
				status: "success",
				message: "Usuario eliminado correctamente",
			});
		} catch (error) {
			res.status(400).json({
				code: 400,
				status: "error",
				message: "Hubo un problema al intentar eliminar al Usuario",
			});
		}
	}
}

export default new UserController();
