const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: { type: String, required: true, maxLength: 30 },
    body: { type: String,  required: true, maxLength: 500 },
    timestamp: { type: Date, default: Date.now, required: true,},
    user: { type: Schema.Types.ObjectId, ref:"User", },
});

MessageSchema.virtual("url").get(function () {
    return`/messages/${this._id}`;
});

module.exports = mongoose.model("Message", MessageSchema)