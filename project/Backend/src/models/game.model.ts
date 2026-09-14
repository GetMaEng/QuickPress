import { prisma } from "../lib/prisma.js";

const createGame = async (day: number, month: number, year: number, score: number, combo: number, userId: number) => {
    const game = await prisma.game.create({
        data: {
            day: day,
            month: month,
            year: year,
            score: score,
            combo: combo,
            userId: userId
        }
    })
    return game;
}

const deleteGame = async (id: number) => {
    const game = await prisma.game.delete({
        where: {
            id: id
        }
    })
    return game;
}

const getAllGame = async (userId: number) => {
    const game = await prisma.game.findMany({
        where: {
            userId: userId
        }
    })
    return game;
}

export { createGame, deleteGame, getAllGame }