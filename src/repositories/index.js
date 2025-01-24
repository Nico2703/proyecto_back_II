import UserDAO from '../dao/user_dao.js';

import UserRepository from '../repositories/user_repository.js';

export const userService = new UserRepository(new UserDAO());
