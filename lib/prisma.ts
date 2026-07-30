import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "./generated/prisma/client";

const possibleRoots = [
  process.cwd(),
  path.resolve(process.cwd(), "tcc7-t6-repregistry"),
  path.resolve(process.cwd(), "..", "tcc7-t6-repregistry"),
];

const projectRoot =
  possibleRoots.find((root) => fs.existsSync(path.join(root, "prisma", "schema.prisma"))) ?? process.cwd();

const sqlitePath = path.resolve(projectRoot, "prisma", "dev.db");
const sqliteUrl = `file:${sqlitePath.replace(/\\/g, "/")}`;

if (!process.env.DATABASE_URL || process.env.DATABASE_URL.startsWith("file:")) {
  process.env.DATABASE_URL = sqliteUrl;
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;