const userRouter = require("express").Router(); //for handling user routes
const auth = require("../middlewares/authMiddleware");

const { register, login, current, forgetPassword, resetPassword } = require('../controllers/userController');

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/current", auth, current);
userRouter.post("/forgetPassword", forgetPassword);
userRouter.post("/resetPassword", resetPassword);

module.exports = userRouter;