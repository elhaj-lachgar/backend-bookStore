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

router.get("/all-users", AuthService, Allowed("admin"), GetOrdersService);

router
  .route("/:id")
  .delete(
    AuthService,
    Allowed("admin"),
    DeleteOrderValidator,
    DeleteOrderService
  )
  .put(
    AuthService,
    Allowed("admin"),
    UpdateStatusOfDelaiverdValidator,
    UpdateStatusOfDelaivered
  )


router.get("/" , AuthService , Allowed("user") , GetUserOrderService);

module.exports = router;
