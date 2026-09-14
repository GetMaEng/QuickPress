import type { Context } from "hono";
import * as userModel from "../models/user.model.ts";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

type createUserBody = {
	username: string;
	email: string;
    password: string;
};

const createUser = async (c: Context) => {
	try {
		const body = await c.req.json<createUserBody>();
		const hashedPassword = await bcrypt.hash(body.password, 10);
		if (!body.username || !body.email || !body.password){
			return c.json(
				{
					success: false,
					data: null,
					msg: "Missing required fields",
				},
				400
			);
		}
		if (await userModel.isDuplicate(body.username, body.email)) {
			return c.json({
				success: false,
				data: null,
				msg: "Username or Email is duplicated",
			});
		}
		const newUser = await userModel.createUser(
			body.username,
            body.email,
            hashedPassword
		);
		return c.json({
			success: true,
			data: newUser,
			msg: "Created new User!",
		});
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
};

const getAllInfoUser = async (c: Context) => {
     try {
 		const user = await userModel.getAllInfoUser();
         return c.json({
  			success: true,
  			data: user,
	});

		 
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

 const getInfoUser = async (c: Context) => {
	try {
		const id = Number(c.req.param("id"));
		const user = await userModel.getInfoUser(id);
        return c.json(
            {
                success: true,
                data: user
            }
        );
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

const loginUser = async (c: Context) => {
  try {
    const { email, password } = await c.req.json();
    const user = await userModel.loginUser(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return c.json({ success: false, msg: "Invalid credentials" }, 401);
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    c.header("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=604800`);
    c.set("user", user);

    return c.json({ 
		success: true,
		 msg: "Logged in",
		 data: { id: user.id, username: user.username } 
		});
  } catch (e) {
    return c.json({ success: false, msg: `${e}` }, 500);
  }
};

const getMe = async (c: Context) => {
  const user = c.get("user"); // มาจาก middleware
  return c.json({ success: true, data: user });
};

const logOut = (c: Context) => {
  c.header("Set-Cookie", `token=; HttpOnly; Path=/; Max-Age=0`);
  return c.json({ success: true, msg: "Logged out" });
};

const editUsername = async (c: Context) => {
	try {
		const id = Number(c.req.param("id"));
		const { username } = await c.req.json();
		const user = await userModel.editUsername(id, username);
        return c.json(
            {
                success: true,
                data: user,
				msg: `Your username have changed to ${username}`
            }
        );
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

const editScore = async (c: Context) => {
	try {
		const id = Number(c.req.param("id"));
		const { highestScore } = await c.req.json();
		const user = await userModel.editScore(id, highestScore);
        return c.json(
            {
                success: true,
                data: user,
				msg: `Your score have changed`
            }
        );
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

const editCombo = async (c: Context) => {
	try {
		const id = Number(c.req.param("id"));
		const { highestCombo } = await c.req.json();
		const user = await userModel.editCombo(id, highestCombo);
        return c.json(
            {
                success: true,
                data: user,
				msg: `Your combo have changed`
            }
        );
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

export { createUser, getInfoUser, loginUser, getAllInfoUser, editUsername,getMe,logOut, editScore, editCombo }