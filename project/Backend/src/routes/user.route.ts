import { Hono } from "hono";
import * as userController from "../controllers/user.controller.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts"
const userRouter = new Hono();

userRouter.post("/", userController.createUser);
userRouter.post("/login", userController.loginUser);
userRouter.post("/logout", userController.logOut);
userRouter.get("/", userController.getAllInfoUser);
userRouter.get("/:id", userController.getInfoUser);
userRouter.patch("/:id", userController.editUsername);
userRouter.patch("/score/:id", userController.editScore);
userRouter.patch("/combo/:id", userController.editCombo);

userRouter.get("/me", authMiddleware, userController.getMe);
userRouter.get("/", authMiddleware, userController.getAllInfoUser);
userRouter.get("/:id", authMiddleware, userController.getInfoUser);
userRouter.patch("/:id", authMiddleware, userController.editUsername);

export { userRouter };