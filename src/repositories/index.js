import UserDAO from '../dao/user_dao.js';
import ProductDAO from '../dao/product_dao.js';
import CartDAO from '../dao/cart_dao.js';

import UserRepository from '../repositories/user_repository.js';
import ProductRepository from '../repositories/product_repository.js';
import CartRepository from '../repositories/cart_repository.js';

export const userService = new UserRepository(new UserDAO());
export const productService = new ProductRepository(new ProductDAO());
export const cartService = new CartRepository(new CartDAO());
