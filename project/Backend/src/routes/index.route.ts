import { Hono } from "hono";
import { userRouter } from "./user.route.js";
import { gameRouter } from "./game.route.js";

const mainRouter = new Hono();

mainRouter.route("/users", userRouter);
mainRouter.route("/games", gameRouter);

export { mainRouter };