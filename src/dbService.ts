import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// 1. CREATE USER
async function createUser(data: Prisma.UserCreateInput) {
  const result = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
    },
    select: {
      email: true,
      name: true,
      id: true,
      Post: true,
      Profile: true,
    },
  });
  return result
}

export { createUser };
