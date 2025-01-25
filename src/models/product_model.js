import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    status: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, index: true },
    thumbnails: { type: [String] },
}, { versionKey: false });

ProductSchema.plugin(mongoosePaginate);

const productModel = mongoose.model('productos', ProductSchema);
export default productModel;