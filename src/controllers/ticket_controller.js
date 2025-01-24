import Ticket from '../models/ticket_model.js';

export const ticketCreate = async (req, res) => {
    const { amount } = req.body;
    const purchaserEmail = req.user.user.email;
    try {
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
