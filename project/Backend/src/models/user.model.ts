import { prisma } from "../lib/prisma.ts";

const isDuplicate = async( username: string, email: string ) => {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
            { username: username },
            { email: email },
  ],
},
});
return user;
}

const createUser = async( username: string, email: string, password: string ) => {
    const user = await prisma.user.create({
        data: {
            username: username,
            email: email,
            password: password,
        },
    });
    return user;
}

const loginUser = async ( email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })
    return user;
}

const getAllInfoUser = async () => {
  const user = await prisma.user.findMany()
  return user;
}

const getInfoUser = async (id: number) => {
  const user = await prisma.user.findFirst({
    where: {
        id: id
    }
  })
  return user;
}

const editUsername = async ( id: number, username: string) => {
    const user = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            username: username
        }
    })
    return user;
}

const editScore = async (id: number, highestScore: number) => {
    const user = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            highestScore: highestScore,
        }
    })
    return user;
}

const editCombo = async (id: number, highestCombo: number) => {
    const user = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            highestCombo: highestCombo
        }
    })
    return user;
}

export { isDuplicate, createUser, getInfoUser, loginUser, getAllInfoUser, editUsername, editScore, editCombo }