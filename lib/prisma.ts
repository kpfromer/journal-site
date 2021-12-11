import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

function getClient(): PrismaClient {
  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
  } else {
    if (!(global as any).prisma) {
      (global as any).prisma = new PrismaClient();
    }
    prisma = (global as any).prisma;
  }

  return prisma;
}

export default getClient;
