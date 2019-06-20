

module.exports = {

reduceEvents:function(type,payload,functions){

var req = {body:{}}
switch(type){
    case "createdProduct":
        req.body.type = payload.type
        req.body.cc = payload.cc
        functions.addProduct(req,null)
        break;
    case "deletedProduct":
        req.body.type = payload.type
        req.body.cc = payload.cc
        functions.deleteProduct(req,null)
        break;
    case "updatedProduct":
        req.body.type = payload.type
        req.body.cc = payload.cc
        req.body.oldType = payload.oldType
        functions.updateProduct(req,null)
}
}   
}