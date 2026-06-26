import dbConnect from "../../../db/connect";
import Post from "../../../db/models/Post";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const session = await getServerSession(request, response, authOptions);
      const posts = await Post.find().sort({ createdAt: -1 }).lean();

      const safePosts = posts.map((post) => {
        const isOwner = session ? post.userEmail === session.user.email : false;

        const { userEmail, ...cleanPost } = post;
        return {
          ...cleanPost,
          isOwner: isOwner,
        };
      });
      return response.status(200).json(posts);
    } catch (error) {
      return response.status(500).json({ error: "Failed to fetch posts" });
    }
  }

  if (request.method === "POST") {
    try {
      const session = await getServerSession(request, response, authOptions);

      if (!session) {
        return response
          .status(401)
          .json({ error: "Unauthorized. Please sign in to create posts." });
      }
      const { text, image } = request.body;

      if (!text || text.trim().length === 0) {
        return response
          .status(400)
          .json({ error: "Post text cannot be empty." });
      }

      const newPost = await Post.create({
        text,
        image,
        userEmail: session.user.email,

        userImage: session.user.image,
        userName: session.user.name,
      });
      return response.status(201).json(newPost);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Failed to save post to database." });
    }
  }
  return response.status(405).json({ message: "Method not allowed" });
}
