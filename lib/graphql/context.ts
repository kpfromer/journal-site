import { PrismaClient } from "@prisma/client";
import getClient from "../prisma";

export type Context = {
  prisma: PrismaClient;
  headers: Record<string, string>;
};

export function createContext(headers: Record<string, string>) {
  return {
    headers,
    prisma: getClient(),
  };
}
