const asynchandler = require("express-async-handler");
const AddressModule = require("../module/AddressModule");
const UserModule = require("../module/UserModule");
const ErroFrom = require("../utils/ErrorForm");

exports.CreateAddressService = asynchandler(async (req, res, next) => {
  const address = await AddressModule.create(req.body);
  const user = await UserModule.findOne({ _id: req.user._id });
  user.addresses.push({ _id: address._id });
  await user.save();
  return res.status(201).json({ data: address});
});

exports.DeleteAddressService = asynchandler(async (req, res, next) => {
  const address = await AddressModule.findOne({
    user: req.user._id,
    _id: req.params.id,
  });
  if (!address) return next(new ErroFrom("address not found ", 404));
  const user = await UserModule.findOne({ _id: req.user._id });
  const index = user.addresses.findIndex((ele) => ele._id == address._id);
  user.addresses.splice(index, 1);
  await user.save();
  await address.deleteOne();
  return res.status(203).json({ message: "address deleted" });
});

exports.GetUserAddressService = asynchandler(async (req, res, next) => {
  const user = await UserModule.findOne({ _id: req.user._id });
  let arr = (await user.populate({ path: "addresses" })).addresses.map(
    (address) => address
  );
  return res.status(200).json({ data: arr });
});
