import { z } from "zod";

const AuditSchema = z.object({
  url: z.string().url().startsWith("https://"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validated = AuditSchema.parse(body);

    return Response.json({
      ok: true,
      runId: crypto.randomUUID(),
      receivedAt: new Date().toISOString(),
      url: validated.url,
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: "Invalid URL",
      },
      {
        status: 400,
      }
    );
  }
}