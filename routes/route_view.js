
module.exports = function(express) {
	const route = express.Router();

	route.get("/",(req,res) => {
		console.log(req.session.user);
		if(req.session.user==null)
			return res.redirect("/login");
		return res.render("index", {username: req.session.user.login});
	});

	route.get("/login",(req,res) => {
		if(req.session.user!=null)
			return res.redirect("/");
		return res.render("login");
	});
	route.get("/user/list",(req,res) => {
		if(req.session.user==null)
			return res.redirect("/login");
		return res.render("user/list");
	});
	
	return route;
};