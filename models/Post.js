import mongoose, { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
  content: {
    type: String,
  },
  cover: [{ type: String }],
  category: {
    type: mongoose.Types.ObjectId,
    ref:'Category',
  },
  author: {
    type: String,
  },
},
  {
    timestamps: true,
  });

const Post = models.Post || model("Post", PostSchema);
export default Post;
