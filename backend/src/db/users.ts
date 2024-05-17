import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function insertUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  const res = await prisma.user.create({
    data: {
      email,
      password,
      firstName,
      lastName,
    },
  });
  return res;
}
// export async function insertUser(
//   firstName: string,
//   lastName: string,
//   email: string,
//   password: string
// ) {
//   const res = await prisma.user.create({
//     data: {
//       email,
//       password,
//       firstName,
//       lastName,
//     },
//   });
//   return res;
// }

export async function findExistingUser(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
}
export async function findUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
      password: password,
    },
  });

  return user;
}
export async function getUserProfile(userId: string) {
  const id = Number(userId);
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}
