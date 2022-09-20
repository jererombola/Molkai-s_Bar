const {all,one, generate, write} = require("../models/users.model")
const {unlinkSync} = require("fs");
const {resolve} = require('path');
const {hashSync} = require("bcrypt");
const {validationResult} = require("express-validator");

const userController = {
    index: (req,res) => {
        let usuarios = all()
        return res.render('UsuariosusersList',{usuarios})
    },
    register: (req,res) => {
        return res.render("Usuariosregister")
        
    },
    login: (req,res) => {
        return res.render("Usuarios/login")
    },
    show: (req,res) =>{
         let user = one(req.params.id)
         if(user){
             return res.render('Usuarios/userProfile',{user})     
         }
    },
    edit: (req,res) => {
        let user = one(req.params.id)
        return res.render("Usuarios/userEdit", {user})  
    },
    save: (req,res) => {
        // control de las validaciones 
        const result = validationResult(req)
        if(!result.isEmpty()) {
            let errores = result.mapped();
            return res.render("Usuarios/register",{ 
                errores: errores,
                data: req.body
            })
        }
        req.body.clave = hashSync(req.body.clave,10)
        let nuevo = generate(req.body)
        let todos = all()
        todos.push(nuevo)
        write(todos)
        return res.redirect("/login")
    },
    access : (req,res) => {
        const result = validationResult(req)
        if(!result.isEmpty()) {
            let errores = result.mapped();
            return res.render("Usuarios/login",{
                errores: errores,
                data: req.body
            })
        }
        if(req.body.check != undefined){
            res.cookie("user",req.body.email, {maxAge: 1000 * 60 * 3 })
            
        }
        
        let todos = all()
        req.session.user = todos.find(user => user.email == req.body.email)
       
        return res.redirect("/MenuEdicionMolokai")

    },
    logout : (req,res) => {
        delete req.session.user
        res.cookie("user", null, {maxAge: -1})
        res.redirect("/login")
    },  
    update: (req,res) => {
        let todos = all();
        let actualizados = todos.map(elemento => {
            if(elemento.id == req.body.id){
                elemento.nombre = req.body.nombre;
                elemento.apellido = req.body.apellido
                elemento.email = req.body.email
                elemento.categoria = req.body.email.includes("@futbolxi") ? "Administrador" : "Cliente";
                
            }
            return elemento
        })
        write(actualizados)
        return res.redirect("/usersList")
    },
    remove : (req,res) => {
        let user = one(req.body.id)
        let todos = all();
        let noEliminados = todos.filter(elemento => elemento.id != req.body.id);
        write(noEliminados)
        return res.redirect("/usersList")
    }
}

module.exports = userController