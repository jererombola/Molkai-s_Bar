const express = require('express');

const methodOverride = require('method-override');
const server = express();
const {join} = require('path');
const{port,start} = require("./modules/server")
server.listen(port,start());

server.set('views', join(__dirname,'./views'))
server.set('view engine', 'ejs')


const static = require('./modules/static')
server.use(static(join(__dirname,"../public")))
server.use(express.urlencoded({extended:true}))
server.use(methodOverride("m"))

const moloRoutes = require("./routes/menu.routes"); 

server.use( moloRoutes)