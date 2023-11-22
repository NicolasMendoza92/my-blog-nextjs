import { mongooseConnect } from "@/lib/mongoose";
import User from "@/models/User";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";


export default async function handler(req, res) {

    const { method } = req;
    await mongooseConnect();
    const session = await getServerSession(req, res, authOptions);

    if (method === 'GET') {
        try {
            const user = await User.find({email:session?.user.email})
            res.json({
                user,
            });
        } catch (error) {
            console.log(error);
            res.status(400).send('Hubo un error');
        }
    }
}