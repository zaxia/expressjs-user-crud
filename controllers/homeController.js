const {
	user,
	item,
	Sequelize
} = require("./../models");

var nodemailer = require('nodemailer');

const Op = Sequelize.Op;

let self = {};

self.index = (req,res) => {
    if(req.session.user==null)
        return res.redirect("/login");
    return res.render("home/index", {user: req.session.user, nav: "/"});
}

self.login = (req,res) => {
    if(req.session.user!=null)
        return res.redirect("/");
    return res.render("home/login");
}


module.exports = self;