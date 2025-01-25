import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
    products: [
        { 
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'productos' }, 
        quantity: { type: Number, required: true, default: 1 } 
        },
    ]
}, { versionKey: false });

CartSchema.pre('find', function(){
    this.populate('products');
});

const cartModel = mongoose.model('carritos', CartSchema);
export default cartModel;