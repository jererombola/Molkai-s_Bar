const {resolve} = require('path')
const fs = require('fs')


let model = {
    all: function(){
        let file = resolve(__dirname,'../data','tragos.json')
        let data = fs.readFileSync(file)
        return JSON.parse(data)
    },
    one: function (id){
        let all = model.all();
        return all.find(e => e.id == id)
    },
    
    generate: function(data){
        //Genera un Objeto con la info que nosotros necesitamos para generar un nuevo producto
        let all = model.all()
        let last = all.pop()
        let product = {}

        product.id = last.id + 1
        product.nombre = data.nombre
        product.ingredientes = data.ingredientes
        product.precio = parseInt(data.precio)
        
        
        return product;
        
    },
    write: function(data){
        let file = resolve(__dirname,'../data','tragos.json')
        let json = JSON.stringify(data,null,2)
        return fs.writeFileSync(file,json)
    }
}

module.exports = model