const {Router} = require('express')
const route = Router()
const controller = require('../controllers/menu.controller')

route.get('/',controller.index)

route.get("/MenuEdicionMolokai", controller.edicion)

route.get('/MenuEdicionMolokai/editar/:id',controller.edit)
route.get("/nuevo", controller.create)
route.post("/crear",controller.save)

route.put("/actualizar", controller.update)

module.exports = route