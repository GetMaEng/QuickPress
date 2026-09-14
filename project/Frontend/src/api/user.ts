import { Axios } from "../axiosInstance";

const createUser = async (username: string, email: string, password: string ) => {
    try {
        await Axios.post("/users", {username: username, email: email, password: password});
    } catch (e) {
        console.log(e);
        return {
            success: false,
            data: null
        }
    }
}

const loginUser = async (email: string, password: string) => {
    try {
        const response = await Axios.post("/users/login", {email: email,password:password});
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

const editUsername = async (id: number, username: string) => {
    try {
        await Axios.patch(`/users/${id}`, {id: id, username: username});
    } catch (e) {
        console.log(e);
        return {
            success: false,
            data: null
        }
    }
}

const editScore = async (id: number, highestScore: number) => {
    try {
        await Axios.patch(`/users/score/${id}`, {id: id, highestScore: highestScore});
    } catch (e) {
        console.log(e);
        return {
            success: false,
            data: null
        }
    }
}

const editCombo = async (id: number, highestCombo: number) => {
    try {
        await Axios.patch(`/users/combo/${id}`, {id: id, highestCombo: highestCombo});
    } catch (e) {
        console.log(e);
        return {
            success: false,
            data: null
        }
    }
}

const getInfoUser = async (id: number) => {
    try {
        const response = await Axios.get(`/users/${id}`);
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

const getAllInfoUser = async () => {
    try {
        const response = await Axios.get(`/users`);
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

export { createUser, editUsername, loginUser, getInfoUser, getAllInfoUser, editScore, editCombo }