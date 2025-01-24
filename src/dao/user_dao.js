import userModel from "../models/user_model.js";

export default class User {

    getUserByMail = async (email) => {
        try{
            let user = await userModel.findOne({email: email});
            return user;
        }catch(error){
            console.log(error);
            return null;
        }
    }

    saveUser = async (user) => {
        try{
            let result = await userModel.create(user);
            return result;
        }catch(error){
            console.log(error);
            return null;
        }
    }
}