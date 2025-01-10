const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    age: { type: Number, required: true }
});

module.exports = mongoose.model("UserCRUD", userSchema);
