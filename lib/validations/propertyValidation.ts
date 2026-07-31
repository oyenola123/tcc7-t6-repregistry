import { z } from "zod";

export const propertySchema = z.object({
  propertyId: z.string().min(3),
  title: z.string().min(3),
  description: z.string().min(10),
  propertyType: z.string().min(2),
  size: z.string().min(1),
  location: z.string().min(3),
  ownerName: z.string().min(3),
  ownerEmail: z.string().email(),
  ownerPhone: z.string().min(10),
  ownerWallet: z.string().length(42),
  transactionHash:z.string().min(10),
  metadataHash: z.string().min(10),
});