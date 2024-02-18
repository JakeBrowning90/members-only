const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: {},
    body: {},
    timestamp: {},
    user: { type: Schema.Types.ObjectId, ref:"User", required: true },
});

module.exports = mongoose.model("Message", MessageSchema)