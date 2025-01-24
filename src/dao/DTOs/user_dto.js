export default class UserDTO{

    constructor(contact){
        this.first_name = contact.first_name;
        this.last_name = contact.last_name;
        this.email = contact.email; 
        this.age = contact.age;
        this.role = contact.role;
    }
}