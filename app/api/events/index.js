const ProductEvent = require("./ProductEvent");
const saveEvents = require("./reducer");
const eventNames = require("./eventNames");

const makeProductEvent = type => (data = {}) => {
  const { cc, something } = data;
  const tmp = Object.assign({}, data);

  delete tmp.cc;

  return new ProductEvent({
    type,
    cc,
    data: tmp
  });
};

const CreateProduct = makeProductEvent(eventNames.CreateProduct);
const UpdateProductCC = makeProductEvent(eventNames.UpdateProductCC);
const UpdateProductName = makeProductEvent(eventNames.UpdateProductName);
const DeleteProduct = makeProductEvent(eventNames.DeleteProduct);

module.exports = {
  CreateProduct,
  UpdateProductCC,
  UpdateProductName,
  DeleteProduct,
  ProductEvent,
  eventNames,
  saveEvents
};