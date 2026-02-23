import mongoose, { Schema, models, model } from "mongoose";

const PostSchema = new Schema({

  
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 200
  },

  content: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 10000
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

}, { timestamps: true });


export default models.Post || model("Post", PostSchema);
