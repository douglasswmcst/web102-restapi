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
const createUserPayload = { email: "duck@mail.com", name: "Duck" };
// console.log(createUser(createUserPayload));

// 2. CREATE USER PROFILE

async function createUserWithProfile(data: Prisma.UserCreateInput & { bio: string }) {
  const result = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      Profile: {
        create: {
          bio: data.bio,
        },
      }
  }});
}

const createUserWithProfilePayload = { email: "duck@mail.com", name: "Duck", bio: "I am a duck"};
console.log(createUserWithProfile(createUserWithProfilePayload));

// 3. CREATE POST

// 4. READ USER PROFILE

// 5. READ ALL POSTS (FEED)

// 6. READ A SPECIFIC POST

// 7. UPDATE USER PROFILE

// 8. UPDATE A SPECIFIC POST

// 9. DELETE A SPECIFIC POST
