import { Router }  from 'express';
import { authorization } from '../middleware/authorization.js';
import { passportCall } from '../utils.js';
import { getAllFront, getAll, getById, create, updateCart, updateCartProduct, 
        removeProductFromCart, removeAllProductsFromCart } from '../controllers/cart_controller.js';
import { ticketCreate } from '../controllers/ticket_controller.js';

const router = Router();

router.post('/:cid/purchase', passportCall('jwt'), ticketCreate);

router.get('/carts', passportCall('jwt'), authorization("admin"), getAllFront);

router.get('/', getAll);

router.get('/:cid', getById);

router.post('/', create);

router.put('/:cid/products/:pid', passportCall('jwt'), authorization("user"), updateCartProduct);

router.put('/:cid', passportCall('jwt'), authorization("admin"), updateCart);

router.delete('/:cid', passportCall('jwt'), authorization("admin"), removeAllProductsFromCart);

router.delete('/:cid/products/:pid', passportCall('jwt'), authorization("admin"), removeProductFromCart);

export default router;