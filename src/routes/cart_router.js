import { Router }  from 'express';
import { authorization } from '../middleware/authorization.js';
import { passportCall } from '../utils.js';

const router = Router();

router.get('/:cid/purchase', async (req, res) => {
    res.render('purchase');
})

router.get('/purchaseRegister', passportCall('jwt'), authorization("user"), async (req, res) => {
    res.render('purchaseRegister');
})

router.get('/products', passportCall('jwt'), authorization("admin"), async (req, res) => {
    res.render('products');
})

export default router;