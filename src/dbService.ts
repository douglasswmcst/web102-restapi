import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// 1. CREATE USER
async function createUser(data: Prisma.UserCreateInput) {
  await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
    },
  });
}

export { createUser };