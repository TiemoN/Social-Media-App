import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please provide content for your post."],
      maxlength: [280, "Post cannot be more than 280 characters."],
    },
    likes: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: "",
    },
    userEmail: {
      type: String,
      default: "",
    },
    userImage: { type: String, default: "" },

    userName: { type: String, default: "" },
  },

  {
    timestamps: true,
  }
);
mongoose.models = {};
export default mongoose.models.Post || mongoose.model("Post", PostSchema);
