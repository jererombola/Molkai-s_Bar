const {Router} = require('express')
const route = Router()
const controller = require('../controllers/product.controller')
const isLogged = require("../middlewares/isLogged")
const isAdm = require("../middlewares/isAdm")


route.get("/menuEdit",[isLogged],[isAdm], controller.index)

route.get('/menuEdit/product/:id?',[isLogged],[isAdm],controller.edit)
route.get("/newProduct",[isLogged],[isAdm], controller.create)
route.post("/createProduct",[isLogged],[isAdm],controller.save)

route.put("/productUpdate",[isLogged],[isAdm], controller.update)

route.delete("/deleteProduct",[isLogged],[isAdm],controller.remove)
module.exports = route