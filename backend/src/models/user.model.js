import mongoose from "mongoose";

// Create a schema for the user model
const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['Individual', 'Organization'] }, // You can extend roles
});

// Create the User model based on the schema
export const User = mongoose.model('User', userSchema);


