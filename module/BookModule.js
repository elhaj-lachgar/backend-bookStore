const mongoose = require ('mongoose');

const BookSchema = new mongoose.Schema({
    title : {
        type : String ,
        required : [ true , "title of book is required"]
    },
    description : String,
    image : String ,
    category : {
        type : mongoose.Schema.ObjectId ,
        ref : "category",
        required : [ true , "book must have category"]
    },
    author : String,
    publishedAt : Date,
    filename:String,
    price :{
        currency : String ,
        value : Number,
    }
} ,{ timestamps : true});


BookSchema.pre(/^find/ , function (next){
    this.populate({path:"category"});
    next();
})


const BookModule = mongoose.model("book" , BookSchema);


module.exports = BookModule ;

