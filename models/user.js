const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: { type: String, maxLength: 30 },
    last_name: { type: String, maxLength: 30 },
    email: { type: String, maxLength: 30 },
    password: { type: String, maxLength: 30 },
    is_member: {type: Boolean },
    is_admin: {type: Boolean }
});

UserSchema.virtual("full_name").get(function () {
    let full_name = `${this.first_name} ${this.last_name}`;
    return full_name;
});

module.exports = mongoose.model("User", UserSchema);