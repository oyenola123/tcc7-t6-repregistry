import { prisma } from "@/lib/prisma";
import { PropertyInput } from "@/types/property";

export async function registerProperty(data: PropertyInput) {
  return await prisma.property.create({
    data,
  });
}
