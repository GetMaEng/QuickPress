import type { MiddlewareHandler } from "hono";
import jwt from "jsonwebtoken";
import { getCookie } from "hono/cookie";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const token = getCookie(c,'token');
  if (!token) return c.json({ message: "Unauthorized" }, 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    c.set("user", decoded);
    await next();
  } catch {
    return c.json({ message: "Invalid token" }, 401);
  }
};