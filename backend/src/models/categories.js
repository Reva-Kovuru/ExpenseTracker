import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema(
    {
        user: { 
            type: Schema.Types.ObjectId, 
            ref: 'userAuth', 
            required: true,
            index: true, 
        },
        category: {
            type: String,
            required: true,
        },
    }
)

const Categories = mongoose.models.categories || mongoose.model('categories', CategoriesSchema);

export default Categories;
