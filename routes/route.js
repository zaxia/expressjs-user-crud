const userController = require("./../controllers/userController");

module.exports = function(express) {
	const route = express.Router();

	//users route
	// route.get("/login",userController.login);
	route.post("/login",userController.login);
	route.get("/user/list",userController.getAll);
	route.get("/user/get/:login",userController.get);
	route.get("/user/search",userController.search);
	route.post("/user/add",userController.save);
	route.put("/user/edit/:login",userController.update);
	route.delete("/user/delete/:login",userController.delete);
	route.get("/user/checkUsername",userController.checkUsername);
	return route;
};