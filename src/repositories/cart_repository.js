
export default class CartRepository {
    constructor(dao){
        this.dao = dao;
    }

    getAll = async () => {
        let result = await this.dao.getAll();
        return result;
    }

    create = async (obj) => {
        let result = await this.dao.create(obj);
        return result;
    }

    getById = async (cid) => {
        let result = await this.dao.getById(cid);
        return result;
    }

    updateCart = async (cid, limit) => {
        let result = await this.dao.updateCart(cid, limit);
        return result;
    }
    
    updateCartProduct = async (cid, pid, obj) => {
        let result = await this.dao.updateCartProduct(cid, pid, obj);
        return result;
    }
    
    removeProductFromCart = async (cid, pid) => {
        let result = await this.dao.deleteProductFromCart(cid, pid);
        return result;
    }
    
    removeAllProductsFromCart = async (cid) => {
        let result = await this.dao.deleteAllProductsFromCart(cid);
        return result;
    }
}