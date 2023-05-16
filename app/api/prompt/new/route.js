import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const POST = async (req) => {
  // first we want to extract the data we passed through the POST request
  const { userId, prompt, tag } = await req.json();

  // connect to the database
  try {
    await connectToDB(); //need to connect to DB each time because its a lambda function and will die once it does its job. 
    const newPrompt = new Prompt({
      creator: userId, tag, prompt
    })

    await newPrompt.save(); // save the new prompt to the database

    return new Response(JSON.stringify(newPrompt), {
      status: 201
    })
  } catch (error) {
    return new Response('Failed to create new prompt', { status: 500 })
  }
}

// goes over this in video at ~2:10:00