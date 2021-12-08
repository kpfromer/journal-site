import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type Context = {
  prisma: PrismaClient;
  headers: Record<string, string>;
};

export function createContext(headers: Record<string, string>) {
  return {
    headers,
    prisma,
  };
}
