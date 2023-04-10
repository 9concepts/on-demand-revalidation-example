import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const Body = z.object({
  id: z.string(),
  secret: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const body = Body.parse(JSON.parse(req.body));

  if (body.secret !== process.env.NEXT_PUBLIC_REVALIDATE_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    await res.revalidate(`/works/${body.id}`);
    return res.json({ revalidated: true });
  } catch (error) {
    return res.status(500).json({ message: "Error revalidating" });
  }
}
