import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { PrismaClient, Prisma } from "@prisma/client";
import { createUser } from "./dbService";

const app = new Hono();

const prisma = new PrismaClient();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// POST CREATE USER
app.use("/*", cors());

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

app.post("/v2/user/create", async (c) => {
  const data = await c.req.json();
  // console.log(data["email"], data["name"]);
  const payload = { email: data["email"], name: data["name"] };
  const result = await createUser(payload);
  return c.json({ result: result });
});

//  DEFINE THE PORT OF SERVER
const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
