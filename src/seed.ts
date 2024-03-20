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

async function createUserWithProfile(
  data: Prisma.UserCreateInput & { bio: string }
) {
  const result = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      Profile: {
        create: {
          bio: data.bio,
        },
      },
    },
  });
}

const createUserWithProfilePayload = {
  email: "duck@mail.com",
  name: "Duck",
  bio: "I am a duck",
};
// console.log(createUserWithProfile(createUserWithProfilePayload));

async function createProfileWithUser() {
  const result = await prisma.profile.create({
    data: {
      bio: "I am a CR!",
      User: {
        connect: {
          email: "dupchuwangmo@prisma.io",
        },
      },
    },
  });
}
// console.log(createProfileWithUser());

// 3. CREATE POST

async function createPostFromUser() {
  const result = await prisma.post.create({
    data: {
      title: "Web Class is boring",
      content: "I am sleepy, i want to join sonam and the 3 boys and sleep",
      User: {
        connect: {
          email: "dupchuwangmo@prisma.io",
        },
      },
    },
  });
}
// console.log(createPostFromUser());

// 4. READ A USER PROFILE

async function getUserProfile() {
  const result = await prisma.user.findUnique({
    where: {
      email: "dupchuwangmo@prisma.io",
    },
    select: {
      email: true,
      name: true,
    },
  });
  return result;
}
console.log(getUserProfile());

// 5. READ ALL POSTS (FEED)

async function getAllPosts() {
  const result = await prisma.post.findMany({});
  return result;
}
console.log(getAllPosts());

// 6. READ A SPECIFIC POST

async function getAPost() {
  const result = await prisma.post.findUnique({
    where: {
      id: 1,
    },
    select: {
      title: true,
      content: true,
    },
  });
  return result;
}
console.log(getAPost());

// 7. UPDATE USER PROFILE

async function updateUserProfile() {
  const updateUser = await prisma.user.update({
    where: {
      email: "dupchuwangmo@prisma.io",
    },
    data: {
      name: 'Dupchu the Magnificent',
    },
  })
}
console.log(updateUserProfile())

// 8. UPDATE A SPECIFIC POST

async function updatePost() {
  const updateUser = await prisma.post.update({
    where: {
      id: 1,
    },
    data: {
      title: 'Dupchu the Sleepy',
    },
  })
}
console.log(updatePost())

// 9. DELETE A SPECIFIC POST

async function deleteAPost() {
  const result = await prisma.post.delete({
    where: {
      id: 1,
    },
  });
  return result;
}
console.log(deleteAPost());
