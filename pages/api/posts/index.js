import dbConnect from "../../../db/connect";
import Post from "../../../db/models/Post";

export default async function handler(request, response) {
  await dbConnect();

  
  if (request.method === "GET") {
    try {
      const posts = await Post.find().sort({ createdAt: -1 });
      return response.status(200).json(posts);
    } catch (error) {
      return response.status(500).json({ error: "Failed to fetch posts" });
    }
  }

 
  if (request.method === "POST") {
    try {
      const postData = request.body; 
      
      
      await Post.create(postData); 
      
      
      return response.status(201).json({ status: "Post created successfully" });
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error: error.message });
    }
  }

  return response.status(405).json({ message: "Method not allowed" });
}
