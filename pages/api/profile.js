import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import Post from "@/models/Post";


export default async function handler(req, res) {

    const { method } = req;
    await mongooseConnect();
    const session = await getServerSession(req, res, authOptions);

    if (method === 'GET') {
        try {
            const posts = await Post.find({author:session?.user.email})
            res.json({
                posts,
            });
        } catch (error) {
            console.log(error);
            res.status(400).send('Hubo un error');
        }
    }
}