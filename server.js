// dependencies
const express = require("express");
const color = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
// coded
const ErrorRoute = require("./middleware/ErrorRoute");
const ErrorHandler = require ("./utils/ErrorForm");
const BookRoute = require ('./api/BookRoute');
const CategoryRoute = require('./api/CategoryRoute');
const AuthRoute = require('./api/AuthRoute');
const CardRoute = require('./api/CardRoute');
const ConnectDB = require('./config/ConnetedDB');
const AddressRoute = require('./api/AddressRoute');
const PaymentRoute = require('./api/PayementRoute');
const { webHookService } = require("./services/PayementService");



// application
const app = express();



//config 
dotenv.config({ path: path.join(__dirname, "config.env")});

ConnectDB()
app.use(cors());
app.use(morgan("dev"))


app.post("/api/v1/webhook" , express.raw({type: 'application/json'}),webHookService);


app.use(express.json());




//routes
app.use('/api/v1/books' , BookRoute);
app.use('/api/v1/categorys' , CategoryRoute);
app.use('/api/v1/auth', AuthRoute);
app.use("/api/v1/card", CardRoute);
app.use("/api/v1/address",AddressRoute);
app.use("/api/v1/payment", PaymentRoute);


app.all("*",(req, res , next ) => {
  return next( new ErrorHandler("route not found" , 404) );
})


app.use(ErrorRoute);


// listen on port
const server = app.listen(process.env.PORT);


// unhandlerRejection 
process.on("unhandledRejection", (err) => {
  console.log(color.red(err));
  server.close(() => {
    console.log(color.red("shut down"));
    process.exit(0);
  });
});
