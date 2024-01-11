const asynchandler = require("express-async-handler");
const CartModule = require("../module/CartModule");
const ErroFrom = require("../utils/ErrorForm");
const AddresseModule = require("../module/AddressModule");
const stripe = require("stripe")(
  "sk_test_51O6sv8IinyIfdiTyHPMoHjr0KY2zMBDyO2MrOo9hRpA3bZjHQtZkgUjriez5HOpZ1NVq3gYO9mPHQZMSGrnJW9t500IHoLkkD3"
);

const OrderModule = require ('../module/OrderModule');


exports.CreateLineItems = asynchandler(async (req, res, next) => {
  const card = await CartModule.findOne({
    _id: req.body.card,
    userId: req.user._id.toString(),
  });
  if (!card) return next(new ErroFrom("cart not found", 404));
  const line_items = (await card.populate("Books.book")).Books.map((ele) => {
    return {
      price_data: {
        currency: ele.price.currency,
        product_data: {
          name: ele.book.title,
          images: [ele.book.image],
          metadata: { product_id: ele.book._id },
        },
        unit_amount: parseInt(ele.price.value * 100),
      },
      quantity: ele.quantity,
    };
  });

  req.body.line_items = line_items;
  req.body.cardId = card._id;
  return next();
});

exports.CheckoutService = asynchandler(async (req, res, next) => {
  console.log(req.body);
  const location = await AddresseModule.findOne({
    _id: req.body.address,
  });

  if (!location) return next(new ErroFrom("address not found", 404));

  let session;
  try {
    session = await stripe.checkout.sessions.create({
      success_url: "http://localhost:3000/profile/myorder",
      mode: "payment",
      payment_method_types: ["card"],
      cancel_url: "http://localhost:3000/",
      customer_email: req.user.email,
      client_reference_id: req.body.cardId.toString(),
      metadata: {
         address : location._id,
      },
      line_items: req.body.line_items,
    });
  } catch (err) {
    return next(new ErroFrom(err.message || err, 400));
  }
  return res.status(200).json({ url: session.url });
});

exports.webHookService = asynchandler(async (req, res, next) => {

  
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent( req.body, sig, process.env.END_POINT);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if(event.type === "checkout.session.completed"){
    console.log("order createion")
    return res.status(201).json({success : true}) ;
  }
  return res.status(201).json({success : false}) ;
});
