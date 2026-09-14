import { Hono } from "hono";
import { userRouter } from "./user.route.ts";
import { gameRouter } from "./game.route.ts";

const mainRouter = new Hono();

mainRouter.route("/users", userRouter);
mainRouter.route("/games", gameRouter);

export { mainRouter };