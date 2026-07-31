import { prisma } from "@/lib/prisma";
import { PropertyInput } from "@/types/property";

export async function registerProperty(data: PropertyInput) {
  return prisma.property.create({
    data: {
      propertyId: data.propertyId,
      title: data.title,
      description: data.description,
      propertyType: data.propertyType,
      size: parseFloat(data.size),
      location: data.location,
      ownerName: data.ownerName,
      ownerEmail: data.ownerEmail,
      ownerPhone: data.ownerPhone,
      ownerWallet: data.ownerWallet,
      transactionHash: data.transactionHash,
      metadataHash: data.metadataHash,
    },
  });
}