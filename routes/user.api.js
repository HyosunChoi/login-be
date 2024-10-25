const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controllser");

//1.회원가입 endpoint
router.post("/", userController.createUser);
router.post("/login", userController.loginWithEmail);

//토큰을 통해 유저 ID확인하고 => 그 아이디로 유저객체 찾아서 보내주기
router.get("/me", authController.authenticate, userController.getUser);

module.exports = router;

