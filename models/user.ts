import mongoose, { Model, Schema, model, models } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  image: string;
}

interface IUserMethods {
  //   correctPassword(password1: string, password2: string): boolean;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  username: {
    type: String,
    required: [true, "admin must have a name"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  image: {
    type: String,
  },
});

// the "models" object is provided by yhe Mongoose library and stores all thr registered models.

// if a model named "User" already exits in the "models" object it assigns that existing model to the User variable

// this prevents redefining the model and ensures that the existing model is reused

// if a model named "User" does't exist in the "models" object the "model" function from mongoose is called to create a new model

// the newly created model is then assigned to the "User" variable

const User = models.User || model<IUser, UserModel>("User", userSchema);

export default User;
