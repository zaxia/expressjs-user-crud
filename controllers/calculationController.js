const {
	user,
	item,
	Sequelize
} = require("../models");

const Op = Sequelize.Op;

let self = {};

self.page = (req,res) => {
    if(req.session.user==null)
        return res.redirect("/login");
    return res.render("calculation/calculation", {user: req.session.user, nav: "/calculation"});
}

self.test = async (req,res) => {
	try{
		// let data = {sums: [], times: [], divs: [], ellapsed_time: 0};
		let ellapsed_times = new Array();
        let min_time;
        let max_time;
        for(let j=0; j<100; j++){
            let start_time = Date.now();
            for(let i=0; i<1000000; i++){
                let var1 =(Math.random() * 1000000) / 100.0;
                let var2 =(Math.random() * 1000000) / 100.0;
                // data.sums.push(var1 + var2);
                // data.times.push(var1 * var2);
                // data.divs.push(var1 / var2);
                let sum = var1 + var2;
                let time = var1 * var2;
                let div = var1 / var2;
            }
            let end_time = Date.now();
            let ellapsed_time = end_time - start_time;
            if(min_time==undefined || ellapsed_time<min_time) min_time = ellapsed_time;
            if(max_time==undefined || ellapsed_time>max_time) max_time = ellapsed_time;
            ellapsed_times.push(ellapsed_time);
        }

        const sum = ellapsed_times.reduce((a, b) => a + b, 0);
        const avg = (sum / ellapsed_times.length) || 0;
        
        // if(cache["calcul_results"] == undefined){
        //     cache["calcul_results"] = new Array();
        // }
        // cache["calcul_results"].push(data);
        return res.json({
            status:"ok",
            data:{min_time, max_time, avg}
        })
	}catch(error){
        console.log(error);
		res.status(500).json({
			status:"error",
			data:error
		})
	}
}


module.exports = self;