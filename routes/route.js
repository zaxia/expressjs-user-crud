const userController = require("./../controllers/userController");
const emailController = require("./../controllers/emailController");
const calculationController = require("./../controllers/calculationController");
const solidityController = require("./../controllers/solidityController");

module.exports = function(express) {
	const route = express.Router();

	//Calculation routes
	route.get("/calculation/test",calculationController.test);

	//Solidity routes
	route.get("/solidity/test",solidityController.test);
	route.get("/solidity/total_request",solidityController.get_total_request);

	//users route
	route.post("/login",userController.login);
	route.get("/user/list",userController.getAll);
	route.get("/user/get/:login",userController.get);
	route.get("/user/search",userController.search);
	route.post("/user/add",userController.save);
	route.put("/user/edit/:login",userController.update);
	route.delete("/user/delete/:login",userController.delete);
	route.get("/user/checkUsername",userController.checkUsername);

	//Email routes
	route.post("/email/send",emailController.send);


	return route;
};