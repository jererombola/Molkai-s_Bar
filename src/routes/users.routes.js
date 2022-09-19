const {Router} = require('express')
const route = Router();
const controller = require("../controllers/user.controller")
const isLogged = require("../middlewares/isLogged")

const validaciones = require("../validations/register")
const validatorLogin = require("../validations/login")


route.get("/login",controller.login)
route.post("/access", validatorLogin ,controller.access)
route.get("/register",controller.register)
route.post("/register/save", validaciones,controller.save)
route.delete("/borraruser", controller.remove)
route.get('/logout', controller.logout)

route.get("/usersList",controller.index)
route.get("/userProfile/:id",[isLogged],controller.show)
route.put("/actualizar",controller.update)
route.get('/:id',controller.edit)

module.exports = route