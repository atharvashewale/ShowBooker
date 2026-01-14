const {
  makePayment,
  bookShow,
  getAllBookings,
} = require("../controllers/bookingController");

const router = require("express").Router();

router.post("/makePayment", makePayment);
router.post("/bookShow", bookShow);
router.get("/getAllBookings/:userId", getAllBookings);

module.exports = router;