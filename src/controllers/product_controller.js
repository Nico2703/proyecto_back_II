import { productService } from '../repositories/index.js';

export const getAllFront = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 3;
        const page = parseInt(req.query.page) || 1;
        const category = req.query.category || null;
    
        const prodPag = await productService.getAll(limit, page, category);
        const products = prodPag.docs.map(product => {
            return {
                _id: product._id,
                title: product.title,
                description: product.description,
                code: product.code,
                price: product.price,
                category: product.category,
            };
        });
        res.render('products', { products, prodPag });
    } catch (error) {
        next(error);  
    }
};

export const getAll = async (req, res, next) => {
    try {
        const { limit, page, category, sort } = req.query;
        const response = await productService.getAll(limit, page, category, sort);
        res.json({
            status: response.status,
            payload: response.docs,
            totalPages: response.totalPages,
            prevPage: response.prevPage,
            nextPage: response.nextPage,
            page: response.page,
            hasPrevPage: response.hasPrevPage,
            hasNextPage: response.hasNextPage,
            prevLink: response.hasPrevPage ? `http://localhost:8080/api/products?limit=${response.limit}&page=${response.prevPage}` : null,
            nextLink: response.hasNextPage ? `http://localhost:8080/api/products?limit=${response.limit}&page=${response.nextPage}` : null,
        });
    } catch (error) {
        next(error);  
    }
};

export const getById = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const product = await productService.getById(pid);
        res.json(product);
    } catch (error) {
        next(error);
    }
};

export const create = async (req, res, next) => {
    try {
        const newProduct = await productService.create(req.body);
        res.json(newProduct);
    } catch (error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const productUpdated = await productService.update(pid, req.body);
        res.json(productUpdated);
    } catch (error) {
        next(error);
    }
};

export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodDel = await productService.remove(id);
        res.json(prodDel);
    } catch (error) {
        next(error);
    }
};
