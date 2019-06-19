

module.exports = {

reduceEvents:function(type,payload,functions){
var req = {body:{}}
console.log(type)
switch(type){
    case "createdProduct":
        req.body.type = payload.type
        req.body.cc = payload.cc
        functions.addProduct(req,null)
        break;
}
}   
}