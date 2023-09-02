const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
  {
    UserId: {type: String, unique:true, required: true},
    Products: [
        {
            ProductId: { type:String},
            quantity: {type: Number, default: 0}
        },
       
    ] ,
    amount: {type: Number},
    address: {type: Object, required: true},
    status: {type: String, completed: "pending"}
  },

  {timestamps: true}
)

module.exports = mongoose.model("Order", OrderSchema);