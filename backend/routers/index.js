const express = require("express");
const Controller = require("../controllers");
const router = express.Router();

router.post("/validate-card-details", Controller.validateCreditCard);
module.exports = router;
