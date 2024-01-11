const mongoose = require('mongoose');

const OrderSchema  = new mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId,
        ref : "user",
        required : [ true , "user is required"]
    },
    card : {
        type : mongoose.Schema.ObjectId,
        ref : "card",
        required : [ true , "card is required"]
    },
    TotalPrice  :  {
        value : Number,
        currency : {
            type : String ,
            enum : ["USD", "EUR", "MAD"]
        },
    },
    isDelaivered : {
        type : Boolean,
        default : false,
    },
    DelaiveredAt : Date,
    address : {
        type : mongoose.Schema.ObjectId,
        ref : "address",
        required : [ true , "address is required"]
    },
},{timestamps:true});


const OrderModule  = mongoose.model("order", OrderSchema);


module.exports = OrderModule;