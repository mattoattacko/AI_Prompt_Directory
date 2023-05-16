import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (request) => {
  try {
    await connectToDB(); // connect to the database

    const prompts = await Prompt.find({}).populate('creator'); // find all the prompts (all posts)

    return new Response(JSON.stringify(prompts), {
      status: 200
    })
  } catch (error) {
    return new Response('Failed to fetch prompts', { status: 500 })
  }
};