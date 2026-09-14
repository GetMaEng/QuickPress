import { Axios } from "../axiosInstance";

const createGame = async (day: string, month: string, year: string, score: number, combo: number, userId: number) => {
    try {
        const response = await Axios.post("/games", {day: day, month: month, year: year, score: score, combo: combo, userId: userId});
        return {
            success: true,
            data: response.data
        }
    } catch (e) {
        console.log(e);
        return {
            success: false,
            data: null
        }
    }
}

const deleteGame = async (id: number) => {
    try {
        await Axios.delete(`/games/${id}`);
    } catch (e) {
        console.log(e);
        return {
            success: false,
            data: null
        }
    }
}

const getAllGame = async (userId: number) => {
    try {
        const response = await Axios.get(`/games/${userId}`);
        return {
            success: true,
            data: response.data
        }
    } catch (e) {
        console.log(e);
        return {
            success: false,
            data: null
        }
    }
}

export { createGame, deleteGame, getAllGame }