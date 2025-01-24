import UserDTO from "../dao/DTOs/user_dto.js";

export default class UserRepository {
    constructor(dao){
        this.dao = dao;
    }

    getUserByMail = async (email) => {
        let result = await this.dao.getUserByMail(email);
        return result;
    }

    saveUser = async (user) => {
        let result = await this.dao.saveUser(user);
        return result;
    }

    loginUser = async (email, password) => {
        return this.dao.loginUser(email, password); 
    }

    currentUser = async (user) => {
        const userDTO = new UserDTO(user);
        return userDTO; 
    }
}