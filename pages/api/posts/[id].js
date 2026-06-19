import dbConnect from "../../../db/connect";
import Post from "../../../db/models/Post";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query; 

  
  if (request.method === "PUT") {
    try {
      const postData = request.body; 

      
      if (!postData.text || postData.text.trim().length === 0) {
        return response.status(400).json({ error: "Post text cannot be empty." });
      }

      
      await Post.findByIdAndUpdate(id, postData);
      
      return response.status(200).json({ status: `Post ${id} updated!` });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  return response.status(405).json({ message: "Method not allowed" });
}