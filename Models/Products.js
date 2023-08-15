const mongoose = require("mongoose")

const Productschema = new mongoose.Schema(
  {
    Tittle: {type: String, unique:true, required: true},
    Desc: {type: String, unique:true, required: true},
    Img: {type: String},
    categories: {type: Array, required: true},
    color: {type: Array},
    size: {type: Array},
    Price: {type: Number, required: true},
    
  },
  {timestamps: true}
)

module.exports = mongoose.model("Product", Productschema);