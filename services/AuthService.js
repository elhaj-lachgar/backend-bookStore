const asynchandler = require("express-async-handler");
const UserModule = require("../module/UserModule");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorForm");
const encrypt = require("bcryptjs");
const CustomeAuthResponse = require("../middleware/CustomeAuthRes");
const {GetElements} = require ('./FactoryHandler')
const { CloudImage } = require("../utils/Cloudinary");
const fs = require("fs");
const path = require("path");

exports.Clouding = (folder) => asynchandler(async (req, res, next) => {
  const image = req.body.image;
  let profile;
  if (image) {
    const uploader = async (file) => CloudImage(file, folder);
    let newPath;
    try {
      newPath = await uploader(
        path.join(__dirname, `../upload/${folder}/${image}`)
      );
    } catch (err) {
      console.log(err);
    }
    fs.unlinkSync(path.join(__dirname, `../upload/${folder}/${image}`));
    if (!newPath.url) return next(new ErrorHandler("upload field"));
    else {
      profile = newPath.url;
      if(folder=="profile")
      req.body.profile = profile;
      if(folder=="image" )
      req.body.image = profile;
    }
  }
  return next();
});

exports.AuthService = asynchandler(async (req, res, next) => {
  if (!req.headers.authorization)
    return next(new ErrorHandler("unauthorized", 403));

  const token = req.headers.authorization.split(" ")[1];

  const IsValid = jwt.verify(token, process.env.SECRUT_JWT);

  if (!IsValid) return next(new ErrorHandler("unauthorized", 403));

  const user = await UserModule.findOne({ _id: IsValid.userId });

  if (!user) return next(new ErrorHandler("user not found", 404));

  if (!IsValid) return next(new ErrorHandler("unauthorized", 403));

  if (user.changePasswordAt) {
    const dure = Math.floor(user.changePasswordAt / 1000);
    if (dure > IsValid.iat)
      return next(new ErrorHandler("please login again", 400));
  }

  req.user = user;
  return next();
});

exports.SignedInService = asynchandler(async (req, res, next) => {
  const user = await UserModule.findOne({ email: req.body.email });

  if (!user) return next(new ErrorHandler("User not found", 404));

  const IsValid = await encrypt.compare(req.body.password, user.password);

  if (!IsValid)
    return next(new ErrorHandler("password or email not corrected", 403));

  const token = jwt.sign({ userId: user._id }, process.env.SECRUT_JWT, {
    expiresIn: process.env.EXPRID_JWT,
  });
  CustomeAuthResponse(res, user, token);
});

exports.SignedUpService = asynchandler(async (req, res, next) => {
  const user = await UserModule.create(req.body);
  const token = jwt.sign({ userId: user._id }, process.env.SECRUT_JWT, {
    expiresIn: process.env.EXPRID_JWT,
  });
  CustomeAuthResponse(res, user, token);
});

exports.Allowed = (...roles) =>
  asynchandler(async (req, res, next) => {
    const IsValid = roles.includes(req.user.role);
    if (!IsValid) return next(new ErrorHandler("Invalid role", 403));
    return next();
  });

exports.UpdateUserProfile = asynchandler(async (req, res, next) => {
  const user = await UserModule.findOneAndUpdate(
    { _id: req.user._id },
    req.body,
    { new: true }
  );

  if (!user) return next(new ErrorHandler("Couldn't find user", 404));

  let ObjRes = user;
  ObjRes.password = undefined;
  ObjRes.ChangePasswordAt = undefined;
  return res.status(200).json({ data: ObjRes });
});



exports.ChangePasswordOfUser = asynchandler ( async ( req , res , next ) => {
  const user = await UserModule.findOne({_id : req.user._id});
  const isValid = encrypt.compareSync(req.body.currentpassword,user.password);

  if( !isValid ) return next(new ErrorHandler("password mismatch" , 404) );
  user.password = req.body.newpassword;
  user.changePasswordAt = Date.now();
  await user.save();
  return res.status(200).json({message:"password is changed please login"});
}) 


exports.GetUsersService = GetElements(UserModule);