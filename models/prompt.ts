import mongoose, { Model, Schema, model, models } from "mongoose";

export interface IPrompt {
  creator: Schema.Types.ObjectId;
  prompt: string;
  tag: string;
}

interface IPromptMethods {
  //   correctPassword(password1: string, password2: string): boolean;
}

type PromptModel = Model<IPrompt, {}, IPromptMethods>;

const promptSchema = new Schema<IPrompt, PromptModel, IPromptMethods>({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

const Prompt =
  models.Prompt || model<IPrompt, PromptModel>("Prompt", promptSchema);

export default Prompt;
