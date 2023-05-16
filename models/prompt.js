import { Schema, model, models } from "mongoose";
// ObjectId = the creator is going to be a document in the DB. Specifically the user type.
// User is a one-to-many relationship. One user can have many prompts.


const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  }
});

//prompt is either = the prompt that already exists on the {models} object. Or if it doesn't exist, create a new model called Prompt, based on the prompt schema.
const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;