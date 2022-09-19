const express = require('express');
const methodOverride = require('method-override');
const server = express();
const {join} = require('path');
const{port,start} = require("./modules/server")
const session = require("cookie-session")
const cookie = require("cookie-parser")

server.listen(port,start());

server.set('views', join(__dirname,'./views'))
server.set('view engine', 'ejs')


const static = require('./modules/static')
server.use(static(join(__dirname,"../public")))
server.use(express.urlencoded({extended:true}))
server.use(methodOverride("m"))

server.use(session({
    secret:"Molokai",
    resave: true,
    saveUninitialized: true
}))

server.use(cookie())


server.use(require("./middlewares/user"))

const moloRoutes = require("./routes/menu.routes"); 
const usersRoutes = require("./routes/users.routes")

server.use(moloRoutes)
server.use(usersRoutes)