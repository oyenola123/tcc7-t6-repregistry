import { NextRequest } from "next/server";
import { propertySchema } from "@/lib/validations/propertyValidation";
import { registerProperty } from "@/services/property.service";
import {
  successResponse,
  errorResponse,
} from "@/lib/utils/apiResponse";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validatedData = propertySchema.parse(body);

    const property = await registerProperty(validatedData);

    return successResponse(
      "Property registered successfully.",
      property
    );
  } catch (error) {
  console.log(error);
  return errorResponse(
    error instanceof Error ? error.message : "Failed to register property."
  );
}
}
