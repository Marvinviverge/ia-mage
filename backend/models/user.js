import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const ModelUser = new mongoose.Schema({
    email:{ type: String, required: true, unique: true},
    password:{ type: String, required: true},
    hasFreeTrial:{type: Boolean, default: true},
    role:{type: String, default:'user'}   
},
    { timestamps: true })
ModelUser.plugin(uniqueValidator);

const UserSchema = mongoose.model('User', ModelUser)

export default UserSchema