import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB();
    const newPrompt = Prompt.create({
      creator: userId,
      tag,
      prompt,
    });
    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
