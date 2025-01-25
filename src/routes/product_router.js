import { Router } from "express";
import { authorization } from '../middleware/authorization.js';
import { passportCall } from '../utils.js';
import { getAll, getById, create, update, remove } from '../controllers/product_controller.js';

const router = Router();

router.get('/products', passportCall('jwt'), authorization("admin"), getAll);

router.get('/:pid', getById);

router.post('/', create);

router.put('/:pid', update);

router.delete('/:pid', remove);

export default router;