import dbConnect from "../../../db/connect";
import Post from "../../../db/models/Post";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  const session = await getServerSession(request, response, authOptions);

  if (request.method === "PUT") {
    try {
      if (!session) {
        return response
          .status(401)
          .json({ error: "Unauthorized. Please sign in." });
      }

      const post = await Post.findById(id);
      if (!post) {
        return response.status(404).json({ error: "Post not found." });
      }

      if (post.userEmail !== session.user.email) {
        return response
          .status(403)
          .json({ error: "Forbidden. You can only edit your own posts." });
      }

      const postData = request.body;
      if (!postData.text || postData.text.trim().length === 0) {
        return response
          .status(400)
          .json({ error: "Post text cannot be empty." });
      }

      await Post.findByIdAndUpdate(id, { text: postData.text });
      return response.status(200).json({ status: `Post ${id} updated!` });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      if (!session) {
        return response
          .status(401)
          .json({ error: "Unauthorized. Please sign in." });
      }

      const post = await Post.findById(id);
      if (!post) {
        return response.status(404).json({ error: "Post not found." });
      }

      if (post.userEmail !== session.user.email) {
        return response
          .status(403)
          .json({ error: "Forbidden. You can only delete your own posts." });
      }

      await Post.findByIdAndDelete(id);
      return response
        .status(200)
        .json({ status: `Post ${id} successfully deleted.` });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  return response.status(405).json({ message: "Method not allowed" });
}
