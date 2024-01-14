const OrderModule = require('../module/OrderModule');
const asynchandler = require('express-async-handler');
const {GetElements} = require('./FactoryHandler');
const ErroFrom = require('../utils/ErrorForm');
const UserModule = require('../module/UserModule')


exports.GetOrdersService=GetElements(OrderModule , "order")


exports.GetUserOrderService = asynchandler ( async ( req , res , next ) => {
    const orders  =  await OrderModule.find({user:req.user._id}).populate("address cardItems.book");
    res.status(200).json({data:orders});
})

exports.UpdateStatusOfDelaivered = asynchandler ( async ( req , res , next ) => {
    const order = await OrderModule.findOne({_id:req.params.id});
    if(!order) return next( new ErroFrom("order not found",404));
    const user = await UserModule.findOne({_id:order.user});
    let arr = order.cardItems.map(ele => ele.book);
    user.ReviewBook = arr ;
    order.isDelaivered = true;
    order.DelaiveredAt = req.body.date;
    await order.save();
    await user.save();
    return res.status(201).json({data:order});
});


exports.DeleteOrderService = asynchandler ( async ( req , res , next ) => {
    const order = await OrderModule.findOne({_id:req.params.id});
    if(!order) return next( new ErroFrom("order not found",404));
    if(!order.isDelaivered) return next( new ErroFrom("order not delaiverd yet"));
    await order.deleteOne();
    return res.status(201).json({success : true ,message : "order deleted successfully"});
})