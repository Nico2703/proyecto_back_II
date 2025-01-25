import { Router } from "express";
import { passportCall } from '../utils.js';
import { authorization } from '../middleware/authorization.js';
import { getAllFront, getAll, getById, create, update, remove } from '../controllers/product_controller.js';

const router = Router();

router.get('/products', getAllFront);

router.get('/', getAll);

router.get('/:pid', getById);

router.post('/', passportCall('jwt'), authorization("admin"), create);

router.put('/:pid', passportCall('jwt'), authorization("admin"), update);

router.delete('/:pid', passportCall('jwt'), authorization("admin"), remove);

export default router;