import { Router } from "express";

import userController from "../controllers/userController";

// Añadir el tipo explícito Router a la constante router
const router: Router = Router();

router.post("/auth", userController.loginUser);
router.post("/users", userController.createUser);
router.delete("/users/:id", userController.deleteUser);

export default router;
