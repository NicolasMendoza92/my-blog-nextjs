import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import Category from "@/models/Category";


export default async function handler(req, res) {

    const { method } = req;
    await mongooseConnect();
    const session = await getServerSession(req, res, authOptions);

    if (method === 'POST') {
        try {
            const { name, parent } = req.body;
            const newCateg = await Category.create({ name, parent })
            res.json(newCateg)
        } catch (error) {
            console.log(error)
        }

    }

    if (method === 'GET') {
        try {
            if (req.query?.id) {
                res.json(await Category.findOne({ _id: req.query.id }));
            } else {
                const categs = await Category.find({}, null, { sort: { '_id': -1 } })
                res.json({
                    categs,
                });
            }
        } catch (error) {
            console.log(error);
            res.status(400).send('Hubo un error');
        }
    }

    if (method === 'PUT') {
        const { name, parent,_id } = req.body;
        // los nombres de las propiedades son las mismas que las vbles, ahi ponogo lo que quiere actualizar (definimos dos parametros, el ID (identifica) y las prop que queremos cambiar)
        await Category.updateOne({ _id }, { name, parent });
        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Category.deleteOne({ _id: req.query?.id });
            res.json(true);
        }
    }
}