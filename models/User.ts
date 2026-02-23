import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      default: null,
    },

    githubId: {
      type: String,
      unique: true,
      sparse: true,
    },

    username: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },

    avatar: {
      type: String,
      default: "/avatar.png",
    },

    bio: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    website: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isNew || this.username) return;
  let username = this.name.toLowerCase().replace(/\s+/g, "") + Math.floor(Math.random() * 10000);
  while (await mongoose.models.User.findOne({ username })) {
    username = this.name.toLowerCase().replace(/\s+/g, "") + Math.floor(Math.random() * 10000);
  }

  this.username = username;
});

export default models.User || model("User", UserSchema);

