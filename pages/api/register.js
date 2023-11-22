import { mongooseConnect } from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";


export default async function handler(req, res) {
  // le pedimos que traiga toda la info que solicito , con req y lo  
  const { method } = req;
  await mongooseConnect();

  if (method === 'POST') {
    const { name, email, password } = req.body;
    try {
      // Revisando q el email sea unico
      let userfind = await User.findOne({ email });
      if (userfind) {
        return res.status(400).send('Ya existe cuenta con este Email');
      }

      // nuevos usuarios, hacemos que todos los logeados sean user comunes
      const bodyUser = { ...req.body };

      // nuevo usuario
      let user = new User(bodyUser);

      //hashear el password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //guardar usuario
      await user.save();

      //mensaje de exito
      res.send("Usuario Creado Correctamente");

    } catch (error) {
      console.log(error);
      res.status(400).send("Hubo un error");
    }

  }

  if (method === 'PUT') {
    const { name, picture, _id } = req.body;
    await User.updateOne({ _id }, { picture, name });
    res.json(true);
  }

}