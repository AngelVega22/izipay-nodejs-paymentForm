const express = require("express");
const router = express.Router();

const checkoutController = require("../controllers/checkoutController");

router.get("/", checkoutController.home)
router.post("/paid", checkoutController.paid);
router.post("/checkout", checkoutController.checkout)
router.post("/ipn", checkoutController.ipn)


//API
const API = '/api'
router.post(`${API}/checkout`, checkoutController.apiCheckout)
router.post(`${API}/validate`, checkoutController.apiValidate)


module.exports = router;
