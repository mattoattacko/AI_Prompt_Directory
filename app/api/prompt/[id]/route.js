import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

// These are all endpoints we can call from the front end.

// GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB(); // connect to the database

    const prompt = await Prompt.findById(params.id).populate('creator'); // find prompt by ID

    if (!prompt) return new Response('Failed to find prompt', { status: 404 });

    return new Response(JSON.stringify(prompt), {
      status: 200
    })
  } catch (error) {
    return new Response('Failed to fetch prompts', { status: 500 })
  }
};

// PATCH (update)
export const PATCH = async (request, { params }) => {
  // get the data we passed for the update
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id)

    if (!existingPrompt) return new Response('Failed to find prompt', { status: 404 })

    // update the prompt & tag
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    //once we have updated the prompt, save it
    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), {
      status: 200
    })

  } catch (error) {
    return new Response('Failed to update prompt', { status: 500 })
  }
}

// DELETE
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(params.id);

    return new Response('Prompt deleted', { status: 200 })
  } catch (error) {
    return new Response('Failed to delete prompt', { status: 500 })
  }
}