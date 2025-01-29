import { cartService, productService } from '../repositories/index.js';
import Ticket from '../models/ticket_model.js';

export const getAllFront = async (req, res, next) => {
    try {
        const response = await cartService.getAll();
        const carts = response.map(cart => {
            const total = cart.products.reduce((acc, product) => {
                const productTotal = product._id.price * product.quantity;  
                return acc + productTotal; 
            }, 0);  

            const products = cart.products.map(product => {
                return {
                    title: product._id.title,    
                    description: product._id.description,
                    price: product._id.price,
                    quantity: product.quantity,
                };
            });

            return {
                _id: cart._id,
                products: products, 
                amount: total,
            };
        });
        res.render('carts', { carts });
    } catch (error) {
        next(error);  
    }
};

export const getAll = async (req, res, next) => {
    try {
        const response = await cartService.getAll();
        res.json(response);
    } catch (error) {
        next(error);  
    }
};

export const getById = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await cartService.getById(cid);
        res.json(cart);
    } catch (error) {
        next(error);
    }
};

export const create = async (req, res, next) => {
    try {
        const newCart = await cartService.create(req.body);
        res.json(newCart);
    } catch (error) {
        next(error);
    }
};

export const updateCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const { limit } = req.query;
        const cartUpdated = await cartService.updateCart(cid, limit);
        res.json(cartUpdated);
    } catch (error) {
        next(error);
    }
};

export const updateCartProduct = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const { pid } = req.params;
        const cartUpdated = await cartService.updateCartProduct(cid, pid, req.body);
        res.json(cartUpdated);
    } catch (error) {
        next(error);
    }
};

export const removeProductFromCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const { pid } = req.params;
        const cartDel = await cartService.removeProductFromCart(cid, pid);
        res.json(cartDel);
    } catch (error) {
        next(error);
    }
};

export const removeAllProductsFromCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cartDel = await cartService.removeAllProductsFromCart(cid);
        res.json(cartDel);
    } catch (error) {
        next(error);
    }
};

export const ticketCreate = async (req, res) => {
    const { cid } = req.params;
    const purchaserEmail = req.user.user.email;
    try {
        const cart = await cartService.getById(cid);

        if (!cart) {
            return res.render('messages&error', { message: 'Carrito no encontrado' });
        }
    
        const noStockProducts = [];
        let totalAmount = 0;

        for (const product of cart.products) {
            const productInStock = await productService.getById(product._id); 
            
            if (productInStock.stock >= product.quantity) {
                productInStock.stock -= product.quantity;
                await productInStock.save();

                totalAmount += productInStock.price * product.quantity;
            } else {
                noStockProducts.push(product._id);
            }
        }

        if (noStockProducts.length > 0) {
            return res.json({ message: `Productos no procesados por falta de stock: ${noStockProducts.join(', ')}` });
        }

        const newTicket = new Ticket({ 
            amount: totalAmount,
            purchaser: purchaserEmail,
        });
        await newTicket.save();

        res.render('messages&error', { messageOK: 'Ticket creado correctamente' });
    } catch (error) {
        return res.render('messages&error', { message: 'Error al crear el ticket de compra' });
    }
}
