import Ticket from '../models/ticket_model.js';
import Cart from '../models/cart_model.js';

export const ticketCreate = async (req, res) => {
    const { cid } = req.params;
    const purchaserEmail = req.user.user.email;
    try {
        const cart = await Cart.findById(cid)
        .populate('products._id', {code: 0, thumbnails: 0, stock: 0, status: 0});

        if (!cart) {
            return res.render('messages&error', { message: 'Carrito no encontrado' });
        }
        
        const amount = cart.products.reduce((acc, product) => {
            const productTotal = product._id.price * product.quantity;  
            return acc + productTotal; 
        }, 0); 

        const newTicket = new Ticket({ 
            amount,
            purchaser: purchaserEmail,
        });
        await newTicket.save();

        res.render('messages&error', { messageOK: 'Ticket creado correctamente' });
    } catch (error) {
        return res.render('messages&error', { message: 'Error al crear el ticket de compra' });
    }
}
