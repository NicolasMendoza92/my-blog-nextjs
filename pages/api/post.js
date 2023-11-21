import { mongooseConnect } from "@/lib/mongoose";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import User from "@/models/User";


export default async function handler(req, res) {

    const { method } = req;
    await mongooseConnect();
    const session = await getServerSession(req, res, authOptions);

    if (method === 'POST') {
        try {
            const { title, summary, content, cover, author } = req.body;
            let userfind = await User.findOne({ email: author });
            console.log(userfind._id)
            const newPost = await Post.create({ title, summary, content, cover, author })
            res.json(newPost)
        } catch (error) {
            console.log(error)
        }

    }

    if (method === 'GET') {
        try {
            if (req.query?.id) {
                res.json(await Post.findOne({ _id: req.query.id }));
            } else {
                const posts = await Post.find({}, null, { sort: { '_id': -1 } })
                res.json({
                    posts,
                });
            }
        } catch (error) {
            console.log(error);
            res.status(400).send('Hubo un error');
        }
    }

    if (method === 'PUT') {
        const { title, summary, content, cover, author,_id } = req.body;
        // los nombres de las propiedades son las mismas que las vbles, ahi ponogo lo que quiere actualizar (definimos dos parametros, el ID (identifica) y las prop que queremos cambiar)
        await Post.updateOne({ _id }, { title, summary, content, cover, author });
        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Post.deleteOne({ _id: req.query?.id });
            res.json(true);
        }
    }
}