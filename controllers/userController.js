const {
	user,
	item,
	Sequelize
} = require("./../models");

const bcrypt = require('bcryptjs');

const Op = Sequelize.Op;

let self = {};

self.login = async (req,res) => {
	// console.log(req.body);
	// console.log(req.session);
	try{
		let login = req.body.login;
		// console.log(login);
		let data = await user.findOne({
			attributes:["login","password","firstname","lastname","createdAt","updatedAt"],
			where:{
				login:login
			}
		});
		if(data==null){
			return res.json({
				status:"error",
				data:"user_not_found"
			})
		}
		// console.log(data);
		if(bcrypt.compareSync(req.body.password, data.password)){
			req.session.user = data;
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

self.getAll = async (req,res) => {
	try{
		let data = await user.findAll({
			attributes:["login","password","firstname","lastname","createdAt","updatedAt"]
		});
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
		let data = await user.findOne({
			attributes:["login","password","firstname","lastname"],
			where:{
				login:login
			}
		});
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
		let data = await user.findAll({
			attributes:["login","password","firstname","lastname","createdAt","updatedAt"],
			where:{
                [Op.or]: [
                    {login:{
                        [Op.like]:"%"+text+"%"
                    }},
                    {firstname:{
                        [Op.like]:"%"+text+"%"
                    }},
                    {lastname:{
                        [Op.like]:"%"+text+"%"
                    }},
                ]
			}
		});
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
		let data = await user.update(body,{
			where:{
				login:login
			}
		});
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
		let data = await user.findOne({
			attributes:["login"],
			where:{
				login:login
			}
		});
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