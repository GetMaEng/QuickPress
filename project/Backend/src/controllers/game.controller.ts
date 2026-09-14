import type { Context } from "hono";
import * as gameModel from "../models/game.model.ts";

const createGame = async (c: Context) => {
    try {
        const { day, month, year, score, combo, userId } = await c.req.json();
        const game = await gameModel.createGame(day, month, year, score, combo, userId);
        return c.json({
            success: true,
            data: game,
            msg: "Create a new game score !!"
        })
    } catch (e) {
        return c.json(
            {
                success: false,
                data: null,
                msg: `${e}`,
            },
            500
        );
    }
}

const deleteGame = async (c: Context) => {
    try {
        const id = Number(c.req.param("id"));
        const game = await gameModel.deleteGame(id);
        return c.json({
            success: true,
            data: game,
            msg: "This game score is deleted !!"
        })
    } catch (e) {
        return c.json(
            {
                success: false,
                data: null,
                msg: `${e}`,
            },
            500
        );
    }
}

const getAllGame = async (c: Context) => {
    try {
        const userId = Number(c.req.param("userId"));
        const game = await gameModel.getAllGame(userId);
        return c.json({
            success: true,
            data: game,
            msg: "This game score is deleted !!"
        })
    } catch (e) {
        return c.json(
            {
                success: false,
                data: null,
                msg: `${e}`,
            },
            500
        );
    }
}

export { createGame, deleteGame, getAllGame }