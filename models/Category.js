import mongoose, { Schema, models } from "mongoose";

const CategorySchema = new Schema({
  name: {
    type: String,
    require: true
  },
  parent: {
    type: mongoose.Types.ObjectId,
    ref: 'Category'
  },
});

const Category = models.Category || mongoose.model("Category", CategorySchema);
export default Category;