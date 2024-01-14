const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'user',
        required : [true , "user is required"]
    },
    content : {
        type : String , 
        required :[true , "content is required"]
    },
    rating : {
        type : Number , 
        required : [true , "rating is required"]
    },
    book : {
        type : mongoose.Schema.ObjectId,
        ref : "book",
        required : [ true , "book is required"]
    },
},{timestamps : true});

const ReviewModule = mongoose.model("review" , ReviewSchema);

module.exports = ReviewModule;