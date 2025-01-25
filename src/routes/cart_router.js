import { Router }  from 'express';
import { authorization } from '../middleware/authorization.js';
import { passportCall } from '../utils.js';
import { getAll, getById, create, updateCart, updateCartProduct, 
        removeProductFromCart, removeAllProductsFromCart } from '../controllers/cart_controller.js';

const router = Router();

router.get('/:cid/purchase', async (req, res) => {
    res.render('purchase');
})

router.get('/purchaseRegister', passportCall('jwt'), authorization("user"), async (req, res) => {
    res.render('purchaseRegister');
})

router.get('/', passportCall('jwt'), authorization("admin"), getAll);

router.get('/:cid', getById);

router.post('/', create);

router.put('/:cid/products/:pid', updateCartProduct);

router.put('/:cid', updateCart);

router.delete('/:cid', removeAllProductsFromCart);

router.delete('/:cid/products/:pid', removeProductFromCart);

export default router;