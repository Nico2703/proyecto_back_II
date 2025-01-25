import productModel from "../models/product_model.js";

export default class Product{

    getAll = async (limit = 3, page = 1, category, sort) => {
        try{
            const filter = category ? { 'category': category } : {};
            let sortOrder = {};
            if(sort) sortOrder.price = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null;
            return await productModel.paginate(filter, { page, limit, sort: sortOrder });
        } catch (error){
            throw new Error (error);
        }
    }

    create = async (obj) => {
        try{
            return await productModel.create(obj);
        } catch (error){
            throw new Error(error);
        }
    }

    getById = async (pid) => {
        try{
            return await productModel.findById(pid);
        } catch (error){
            throw new Error(error);
        }
    }

    update = async (id, obj) => {
        try{
            return await productModel.findByIdAndUpdate(id, obj, { new: true });  
        } catch (error){
            throw new Error(error);
        }
    }

    delete = async (pid) => {
        try{
            const product = await productModel.findByIdAndDelete(pid);
            if (!product) return null;
            return product;
        } catch (error){
            throw new Error(error);
        }
    }
}

