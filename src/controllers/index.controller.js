const {all,one,generate,write} = require('../models/products.model');
const controller = {

    index: (req,res) =>{

        let products = all()

        if(req.params.ids){
            products = products.filter(e => e.id == req.params.ids)
            return res.render('index',{products})
        }

        return res.render('index',{products})
    }
}
module.exports = controller;