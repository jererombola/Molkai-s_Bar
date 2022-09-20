let middleware = (req,res,next) => {
    if (req.session.user.categoria == "Administrador") {

     return next()
    }
    
    res.redirect("/")
}


module.exports = middleware