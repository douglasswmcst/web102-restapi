import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { PrismaClient, Prisma } from "@prisma/client";
import { createUser } from "./dbService";
import { HTTPException } from "hono/http-exception";

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
  try {
    const data = await c.req.json();
    // console.log(data["email"], data["name"]);
    const payload = { email: data["email"], name: data["name"] };
    const result = await createUser(payload);
    return c.json({ result: result }, 200);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(e); // e.g. P2002
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        throw new HTTPException(500, {
          message:
            "There is a unique constraint violation, a new user cannot be created with this email",
        });
      }
    }
    throw e;
  }
});

//  DEFINE THE PORT OF SERVER
const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
