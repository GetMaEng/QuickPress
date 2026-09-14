import { Hono } from "hono";
import * as gameController from "../controllers/game.controller.ts";

const gameRouter = new Hono();

gameRouter.post("/", gameController.createGame);
gameRouter.get("/:userId", gameController.getAllGame);
gameRouter.delete("/:id", gameController.deleteGame);

export { gameRouter }