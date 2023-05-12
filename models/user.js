// User Schema
import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists'], //if fails, says email already exists
    required: [true, 'Please add an email'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  }  
});

// our route is only running when it is called, so we need to check if the model exists first.
// if we were using a regular Express server, we would do this:
// this would be for if our BE server was always running.
// const User = model('User', UserSchema);

// export default User;

//  The "models" object is provided by the Mongoose library and stores all the registered models. This is the "models" in our mongoose import.
//  If a model named "User" already exists in the "models" object, it assigns that existing model to the "User" variable.
// This prevents redefining the model and ensures that the existing model is reused. 

// If a model named "User" does not already exist in the "models" object, the "model" function from Mongoose is called to create a new Model. It creates a new model named "User" and assigns it to the "User" variable.

// we first look in to the 'models.User' and see if its there. Only if its not there do we create a new model.
// We do this because the route gets called every time and a connection is established from scratch every time.
const User = models.User || model('User', UserSchema);

export default User;