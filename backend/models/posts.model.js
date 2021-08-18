const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user_id : { type: mongoose.Schema.ObjectId, ref: "user" },
    text    : { type : String, required : true },
    hashtag : { type : String, required : false },
    date    : { type : Date, default : Date.now() },
});

const post = mongoose.model("post",  postSchema);

module.exports = post;
