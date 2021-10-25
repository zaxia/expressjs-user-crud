const userController = require("./../controllers/userController");
const homeController = require("./../controllers/homeController");
const emailController = require("./../controllers/emailController");
const chatController = require("./../controllers/chatController");
const calculationController = require("./../controllers/calculationController");
const solidityController = require("./../controllers/solidityController");

module.exports = function(express) {
	const route = express.Router();

	route.get("/",homeController.index);
	route.get("/login",homeController.login);
	route.get("/user/list",userController.list);
	route.get("/chat",chatController.chat);
	route.get("/email",emailController.email);
	route.get("/calculation",calculationController.page);
	route.get("/solidity",solidityController.page);
	
	return route;
};