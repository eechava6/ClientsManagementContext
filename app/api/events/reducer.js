const eventNames = require("./eventNames");
const Product = require("../product/product");

const reduce = async productEvent => {
  console.log(`Trying to apply ${productEvent.type}`);
  console.log("--------------------------");

  if (productEvent.type === eventNames.CreateProduct) {
  // create
    const product = new Product({ cc: productEvent.cc, name: productEvent.data.name });
    await productEvent.save();
    const savedProduct = await product.save();
    console.log(`Applied ${productEvent.type} successfully`);
    console.log("--------------------------");
    return savedProduct;

  } else if (productEvent.type === eventNames.UpdateProductCC) {
  //update cc
    const product = await Product.findOne({ cc: productEvent.cc });
    product.cc = productEvent.data.new_cc;
    await productEvent.save();
    const savedProduct = await product.save();

    console.log(`Applied ${productEvent.type} successfully`);
    console.log("--------------------------");
    return savedProduct;

  } else if (productEvent.type === eventNames.UpdateProductName) {
  // update name
    const product = await Product.findOne({ cc: productEvent.cc });
    product.name = productEvent.data.name
    await productEvent.save();
    const savedProduct = await product.save();

    console.log(`Applied ${productEvent.type} successfully`);
    console.log("--------------------------");
    return savedProduct;

  } else {
  // Delete
    const output = await Product.deleteOne({cc: productEvent.cc });
    await productEvent.save();
    console.log(`Applied ${productEvent.type} successfully`);
    console.log("--------------------------");

    return output

  }
};

module.exports = async events => {
  let product;

  // why not a map or forEach???
  // because we want each event to be synchronously applied
  for (const e of events) {
    product = await reduce(e);
  }

  return product;
};
