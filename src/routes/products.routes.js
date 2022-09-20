const {Router} = require('express')
const route = Router()
const controller = require('../controllers/product.controller')
const isLogged = require("../middlewares/isLogged")
const isAdm = require("../middlewares/isAdm")


route.get("/MenuEdicionMolokai",[isLogged],[isAdm], controller.index)

route.get('/MenuEdicionMolokai/producto/:id',[isLogged],[isAdm],controller.edit)
route.get("/nuevo",[isLogged], controller.create)
route.post("/crear",[isLogged],[isAdm],controller.save)

route.put("/actualizar",[isLogged],[isAdm], controller.update)

route.delete("/borrar",[isLogged],[isAdm],controller.remove)
module.exports = route