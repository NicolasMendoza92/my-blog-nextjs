import mongoose, { Schema, models } from "mongoose";

 const OwnPostsSchema = new Schema({
    userEmail: {
      type:String, 
      require:true
   },
   //  uso ref, para que el modelo de los wish list, me traiga todos los datos del producto seleccionado como deseado, con solo el ID
    posts: {
      type: Schema.Types.ObjectId, 
      ref:'Post',
   },
 });

 const OwnPosts = models.OwnPosts || mongoose.model("OwnPosts", OwnPostsSchema);
 export default OwnPosts;