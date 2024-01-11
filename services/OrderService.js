const OrderModule = require('../module/OrderModule');
const asynchandler = require('express-async-handler');
const {GetElements} = require('./FactoryHandler');



exports.GetOrdersService=asynchandler( async ( req , res , next ) => {
    const orders  =  await OrderModule.find({}).populate("address cardItems.book");
    res.status(200).json({data:orders});
});