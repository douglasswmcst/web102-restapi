import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// 1. CREATE USER
async function createUser(_email, _name) {
  await prisma.user.create({
    data: {
      email: _email,
      name: _name,
    },
  });
}
// console.log(createUser("douglas@gmail.com", "Douglas"));

// 2. CREATE USER PROFILE

async function createUserWithProfile(_email, _name, _bio) {
  const result = await prisma.user.create({
    data: {
      email: _email,
      name: _name,
      Profile: {
        create: {
          bio: _bio,
        },
      }
  }});
}
console.log(createUserWithProfile("dev@gmail.com", "Dev","I'm a developer"));

// 3. CREATE POST

// 4. READ USER PROFILE

// 5. READ ALL POSTS (FEED)

// 6. READ A SPECIFIC POST

// 7. UPDATE USER PROFILE

// 8. UPDATE A SPECIFIC POST

// 9. DELETE A SPECIFIC POST
