import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

// Params will get populated if we pass dynamic variables into the URL.
// eg: fetch(`api/users/${session?.user.id}/posts`)
// We have [id] as the dynamic parameter.
// this gives us access to "params.id".
export const GET = async (request, { params }) => {
  try {
    await connectToDB(); // connect to the database

    const prompts = await Prompt.find({
      creator: params.id
    }).populate('creator'); // find all the prompts from a specific creator.

    return new Response(JSON.stringify(prompts), {
      status: 200
    })
  } catch (error) {
    return new Response('Failed to fetch prompts', { status: 500 })
  }
};