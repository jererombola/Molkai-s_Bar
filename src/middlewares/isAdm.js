let middleware = (req,res,next) => {
    if (req.session.user.categoria == "Administrador") {

        next()
    }
    
    res.redirect("/")
}


module.exports = middleware