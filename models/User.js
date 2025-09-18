import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id:{ type: String, required:true},
    name: { type: String, required:true },
    email: { type: String, required:true, unique: true },
    imageUrl : { type: String, required:ture },
    cartItem : { type: Object, default: [] },
}, { minimaize: false})

const User = monngoose.models.user || mongoose.model('User', userSchema)

export default User