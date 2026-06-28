import dbConnect from "../../../../db/connect";
import Post from "../../../../db/models/Post";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "PATCH") {
    try {
      const { userId } = request.body;

      if (!userId) {
        return response.status(400).json({ error: "User ID is required." });
      }

      const post = await Post.findById(id);
      if (!post) {
        return response.status(404).json({ error: "Post not found." });
      }

      const hasLiked = post.likes.includes(userId);

      if (hasLiked) {
        post.likes = post.likes.filter((uid) => uid !== userId);
      } else {
        post.likes.push(userId);
      }

      await post.save({ timestamps: false });
      return response.status(200).json(post);
    } catch (error) {
      return response.status(500).json({ error: "Failed to toggle like." });
    }
  }

  return response.status(405).json({ message: "Method not allowed" });
}
