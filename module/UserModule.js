const mongoose = require ('mongoose');
const encrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema({
    name : {
        type : String ,
        required :  [ true , "name is required"]
    },
    phone : [String],
    email : {
        type : String ,
        required : [ true , "email is required"],
        unique : [ true , "email is unique"]
    },
    profile : String,
    password : {
        type : String ,
        required : [ true , "password is required"],
        minlength : [8 , "password is shorter than 8 characters"],
    },
    changePasswordAt : Date,
    role : {
        type : String ,
        enum : [ "admin", "user"],
        default : "user",
    },
    card:{
        type : mongoose.Schema.ObjectId,
        ref: "cart"
    },
    addresses:[
        {
            type : mongoose.Schema.ObjectId,
            ref : "address"
        }
    ]
},{ timestamps : true });

UserSchema.pre("save",  async function (next){
    this.password = await encrypt.hash(this.password , 12 );
    next();
});

const UserModule =  mongoose.model("user", UserSchema);

module.exports = UserModule ;