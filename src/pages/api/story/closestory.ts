import { NextApiRequest, NextApiResponse } from "next"
import { db } from "@vercel/postgres"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await db.connect()

  const uid = req.body.uid

  try {
    await client.sql`
      UPDATE novels 
      SET isopen = false WHERE uid = ${uid};
    `
    return res.status(200)
  } catch (error) {
    return res.status(500).json({ error })
  } finally {
    client.release()
  }
}
