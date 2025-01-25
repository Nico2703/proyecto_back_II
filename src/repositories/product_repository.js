export default class ProductRepository {
    constructor(dao){
        this.dao = dao;
    }

    getAll = async (limit, page, category, sort) => {
        let result = await this.dao.getAll(limit, page, category, sort);
        return result;
    }

    getById = async (pid) => {
        let result = await this.dao.getById(pid);
        return result;
    }
    
    create = async (obj) => {
        let result = await this.dao.create(obj);
        return result;
    }
    
    update = async (pid, obj) => {
        let result = await this.dao.update(pid, obj);
        return result;
    }
    
    remove = async (pid) => {
        let result = await this.dao.delete(pid);
        return result;
    }
}