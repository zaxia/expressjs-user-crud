const {
	user,
	item,
	Sequelize
} = require("./../models");

const Op = Sequelize.Op;

let self = {};

let total_request = 0;
let total_errors = 0;

self.page = (req,res) => {
    if(req.session.user==null)
        return res.redirect("/login");
    return res.render("solidity/solidity", {user: req.session.user, nav: "/"});
}

self.test = async (req,res) => {
    total_request++
	try{
        let data = await user.findAll({
            attributes:["login","password","firstname","lastname","createdAt","updatedAt"]
        });
        return res.json({
            status:"ok",
            data:data
        })
	}catch(error){
        total_errors++;
        console.log(error);
		res.status(500).json({
			status:"error",
			data:error
		})
	}
}

self.get_total_request = async (req,res) => {
    return res.json({
        status:"ok",
        data:{total_request, total_errors}
    })
}


module.exports = self;