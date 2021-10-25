const {
	user,
	item,
	Sequelize
} = require("./../models");

const Op = Sequelize.Op;

let self = {};

self.chat = (req,res) => {
    if(req.session.user==null)
        return res.redirect("/login");
    return res.render("chat/chat", {user: req.session.user, nav: "/chat"});
}

module.exports = self;