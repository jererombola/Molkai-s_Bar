const {all,one,generate,write} = require('../models/products.model');
const controller = {

    index: (req,res) =>{

        let products = all()

        if(req.params.ids){
            products = products.filter(e => e.id == req.params.ids)
            return res.render('Productos/editList',{products})
        }

        return res.render('Productos/editList',{products})
    },
    create: (req,res) => {
        return res.render("Productos/productCreate")
    },
    
    edit: (req,res) => {
      let product = one(req.params.id)
      return res.render("Productos/productEdit",{product})
  },
    save: (req,res) => {
    let nuevo = generate(req.body)
    let todos = all()
    todos.push(nuevo)
    write(todos)
    return res.redirect("/menuEdit")
  },
    
    update:(req,res)=>{ 
      let todos= all()
      let actualizados = todos.map(elemento => {
          if (elemento.id == req.body.id){
              elemento.nombre = req.body.nombre;
              elemento.precio = parseInt(req.body.precio);
              elemento.ingredientes = req.body.ingredientes;
          }
          return elemento
      })
     
      write(actualizados)

      return res.redirect("/menuEdit")
      },

      
    remove:(req,res) =>{
          let product = one(req.body.id)
          
          let todos = all()
          let noEliminados = todos.filter(elemento => elemento.id != req.body.id)
          write(noEliminados)
          return res.redirect("/menuEdit")

      }
}



module.exports = controller