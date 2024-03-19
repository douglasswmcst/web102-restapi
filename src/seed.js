import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient()

const user = await prisma.user.create({
  data: {
    email: "elsa@prisma.io",
    name: "Elsa Prisma",
  },
});
