import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

interface Nurse {
  id: string;
  name: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const filePath = path.join(process.cwd(), "public", "nurses.txt");
    const data = fs.readFileSync(filePath, "utf8");
    const names = data.split("\n").filter(Boolean);

    const nurses: Nurse[] = names.map((name, index) => ({
      id: `nurse-${index}`,
      name,
    }));

    res.status(200).json({ nurses });
  } catch (error) {
    res.status(500).json({ error: "Failed to read nurse data" });
  }
}
