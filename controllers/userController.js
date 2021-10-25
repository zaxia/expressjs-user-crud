const {
	user,
	item,
	Sequelize
} = require("./../models");

const bcrypt = require('bcryptjs');

const Op = Sequelize.Op;

let self = {};

const init_cache = async () => {
	if(cache["users"] == undefined){
		// cache["users"] = await user.findAll({
		// 	attributes:["login","password","firstname","lastname","createdAt","updatedAt"]
		// });
		//autre possibilité, pour un accès plus rapide
		users = await user.findAll({
			attributes:["login","password","firstname","lastname","createdAt","updatedAt"]
		});
		cache["users"] = {};
		// console.log(users);
		// users.array.forEach(element => {
		// 	console.log(element);
		// 	cache["users"][element.login] = element;
		// });
		for(let i=0; i<users.length; i++){
			cache["users"][users[i].login] = users[i];
		}
	}
}

self.login = async (req,res) => {
	await init_cache();
	try{
		let login = req.body.login;
		data = cache["users"][login];
		if(data==null){
			return res.json({
				status:"error",
				data:"user_not_found"
			})
		}
		if(bcrypt.compareSync(req.body.password, data.password)){
			req.session.user = data;
			connected_users[data.login] = data;
			return res.json({
				status:"ok",
				data:data
			})
		}
		return res.json({
			status:"error",
			data:"wrong_password"
		})
	}catch(error){
		res.status(500).json({
			status:"error",
			data:error
		})
	}
}

self.disconnect = async (req,res) => {
	delete connected_users[req.body.login];
	req.session.destroy();
	return res.redirect("login");
}

self.list = (req,res) => {
	if(req.session.user==null)
		return res.redirect("/login");
	console.log(cache);
	return res.render("user/list", {user: req.session.user, nav: "/user/list"});
}

self.getAll = async (req,res) => {
	try{
		let data = cache["users"];
		// if (data ==  undefined){
		// 	data = await user.findAll({
		// 		attributes:["login","password","firstname","lastname","createdAt","updatedAt"]
		// 	});
		// 	cache["users"] = data;
		// }
		return res.json({
			status:"ok",
			data:data
		})
	}catch(error){
		res.status(500).json({
			status:"error",
			data:error
		})
	}
}

self.get = async (req,res) => {
	try{
		let login = req.params.login;
		// let data = await user.findOne({
		// 	attributes:["login","password","firstname","lastname"],
		// 	where:{
		// 		login:login
		// 	}
		// });
		let data = cache["users"][login];
		return res.json({
			status:"ok",
			data:data
		})
	}catch(error){
		console.log("error catched");
		console.log(error);
		res.status(500).json({
			status:"error",
			data:error
		})
	}
}

self.search = async (req,res) => {
	try{
		let text = req.query.text;
		// let data = await user.findAll({
		// 	attributes:["login","password","firstname","lastname","createdAt","updatedAt"],
		// 	where:{
        //         [Op.or]: [
        //             {login:{
        //                 [Op.like]:"%"+text+"%"
        //             }},
        //             {firstname:{
        //                 [Op.like]:"%"+text+"%"
        //             }},
        //             {lastname:{
        //                 [Op.like]:"%"+text+"%"
        //             }},
        //         ]
		// 	}
		// });
		let users = cache["users"];
		let data = new Array();
		for (let login in users){
			if(login.includes(text) || users[login].firstname.includes(text) || users[login].lastname.includes(text)){
				data.push(users[login]);
			}
		}
		return res.json({
			status:"ok",
			data:data
		})
	}catch(error){
		res.status(500).json({
			status:"error",
			data:error
		})
	}
}

self.save = async (req,res) => {
	try{
		let body = req.body;
		body.password = bcrypt.hashSync(body.password, 10);
		let data = await user.create(body);
		cache["users"][data.login] = data;
		return res.json({
			status:"ok",
			data:data
		})
	}catch(error){
		res.status(500).json({
			status:"error",
			data:error
		})
	}
}

self.update = async (req,res) => {
	try{
		let login = req.params.login;
		let body = req.body;
		let data = cache["users"][login];
		data.update(body);
		delete cache["users"][login];
		cache["users"][data.login] = data;
		if(req.session.user.login == login){
			req.session.user = data;
		}
		return res.json({
			status:"ok",
			data:data
		})
	}catch(error){
		res.status(500).json({
			status:"error",
			data:error
		})
	}
}

self.delete = async (req,res) => {
	try{
		let login = req.params.login;
		let data = await user.destroy({
			where:{
				login:login
			}
		});
		delete cache["users"][login];
		return res.json({
			status:"ok",
			data:data
		})
	}catch(error){
		res.status(500).json({
			status:"error",
			data:error
		})
	}
}

self.checkUsername = async (req,res) => {
	try{
		let login = req.query.login;
		// let data = await user.findOne({
		// 	attributes:["login"],
		// 	where:{
		// 		login:login
		// 	}
		// });
		let data = cache["users"][login];
		return res.json({
			status:"ok",
			data: data
		})
	}catch(error){
		res.status(500).json({
			status:"error",
			data:error
		})
	}
}

module.exports = self;