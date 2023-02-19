const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    date: {type: Date, default: Date.now}   
});

// method to encrypt the password
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

// function nos permite acceder a las propiedades con this.
UserSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);