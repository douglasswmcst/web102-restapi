import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { PrismaClient, Prisma } from "@prisma/client";

const app = new Hono();

const prisma = new PrismaClient();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// POST CREATE USER

app.post("/user/create", async (c) => {
  const data = await c.req.json();
  console.log(data["email"], data["name"]);
  const result = await prisma.user.create({
    data: {
      email: data["email"],
      name: data["name"],
    },
    select: {
      email: true,
      name: true,
      id: true,
      Post: true,
      Profile: true,
    },
  });
  return c.json({ result: result });
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
