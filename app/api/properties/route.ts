import { promises as fs } from "node:fs";
import path from "node:path";
import { NextRequest } from "next/server";

type PropertyRecord = {
  id: string;
  title: string;
  owner: string;
  location: string;
  area: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

const propertiesFilePath = path.join(process.cwd(), "data", "properties.json");

async function readProperties(): Promise<PropertyRecord[]> {
  try {
    const content = await fs.readFile(propertiesFilePath, "utf8");
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function writeProperties(properties: PropertyRecord[]) {
  await fs.mkdir(path.dirname(propertiesFilePath), { recursive: true });
  await fs.writeFile(propertiesFilePath, JSON.stringify(properties, null, 2));
}

export async function GET() {
  const properties = await readProperties();
  return Response.json(properties);
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Please submit valid property details." }, { status: 400 });
  }

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const owner = typeof body.owner === "string" ? body.owner.trim() : "";
  const location = typeof body.location === "string" ? body.location.trim() : "";
  const area = typeof body.area === "string" && body.area.trim() ? body.area.trim() : "620 sqm";
  const status = typeof body.status === "string" && body.status.trim() ? body.status.trim() : "Pending review";

  if (!title || !owner || !location) {
    return Response.json(
      { error: "Please provide a title, owner name, and location before submitting." },
      { status: 400 }
    );
  }

  const now = new Date().toISOString();
  const property: PropertyRecord = {
    id: crypto.randomUUID(),
    title,
    owner,
    location,
    area,
    status,
    createdAt: now,
    updatedAt: now,
  };

  const existing = await readProperties();
  const updated = [property, ...existing];
  await writeProperties(updated);

  return Response.json(property, { status: 201 });
}
