import cartModel from "../models/cart_model.js";
import productModel from "../models/product_model.js";

export default class Cart{

    getAll = async () => {
        try{
            return await cartModel.find({})
            .populate('products._id', {code: 0, thumbnails: 0, stock: 0, status: 0});
        } catch (error){
            throw new Error (error);
        }
    }

    create = async (obj) => {
        try{
            return await cartModel.create(obj);
        } catch (error){
            throw new Error();
        }
    }

    getById = async (cid) => {
        try{
            return await cartModel.findById(cid)
            .populate('products._id', {code: 0, thumbnails: 0, stock: 0, status: 0});
        } catch (error){
            throw new Error(error);
        }
    }

    updateCart = async (cid, limit) => {
        try{    
            const products = await productModel.getAll(limit);

            return await cartModel.findByIdAndUpdate(
                cid, 
                { $addToSet: { products: { $each: products.docs } } },
                { new : true }
            );
        } catch (error){
            throw new Error(error);
        }
    }

    updateCartProduct = async (cid, pid, obj) => {
        try{    
            let cart = await cartModel.findById(cid);

            const quantityToAdd = obj.quantity ? Number(obj.quantity) : 1;
            
            const existingProduct = cart.products.findIndex(p => p._id.toString() === pid.toString());

            if (existingProduct !== -1) cart.products[existingProduct].quantity += quantityToAdd; 
            else cart.products.push({ _id: pid, quantity: quantityToAdd });

            return await cartModel.findByIdAndUpdate(cid, { products: cart.products });
        } catch (error){
            throw new Error(error);
        }
    }

    deleteProductFromCart = async (cid, pid) => {
        try{
            return await cartModel.findByIdAndUpdate(
                cid, 
                { $pull: { products: {_id: pid } } }, 
                { new: true }
            );
        } catch (error){
            throw new Error(error);
        }
    }

    deleteAllProductsFromCart = async (cid) => {
        try{
            return await cartModel.findByIdAndUpdate(cid, { products: [] }, { new: true });
        } catch (error){
            throw new Error(error);
        }
    }
}
