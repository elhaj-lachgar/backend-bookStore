const express = require("express");
const router = express.Router();

const {
  GetOrdersService,
  DeleteOrderService,
  UpdateStatusOfDelaivered,
  GetUserOrderService
} = require("../services/OrderService");

const {
  DeleteOrderValidator,
  UpdateStatusOfDelaiverdValidator,
} = require("../utils/validator/OrderValidator");
const { Allowed, AuthService } = require("../services/AuthService");

router.get("/all-users", GetOrdersService);

router
  .route("/:id")
  .delete(
    DeleteOrderValidator,
    DeleteOrderService
  )
  .put(
    UpdateStatusOfDelaiverdValidator,
    UpdateStatusOfDelaivered
  )



router.get("/" , AuthService , Allowed("user") , GetUserOrderService);

module.exports = router;
