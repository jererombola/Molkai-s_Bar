const { send } = require("express/lib/response")

let middleware = (req,res,next) => {
    if (req.session && req.session.user) {

      return next()
    }

    res.redirect("/")
}


module.exports = middleware