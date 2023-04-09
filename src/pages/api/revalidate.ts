import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    await res.revalidate("/works/foo");
    return res.json({ revalidated: true });
  } catch (error) {
    return res.status(500).json({ message: "Error revalidating" });
  }
}
