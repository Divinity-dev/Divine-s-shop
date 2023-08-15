// const mongoose = require("mongoose")

// const Cartschema = new mongoose.Schema(
//   {
//     UserId: {type: String, unique:true, required: true},
//     Products: [
//         {
//             ProductId: { type:string},
//             quantity: {type: Number, default: 1}
//         },
       
//     ] ,
//     amount: {type: Number},
//     address: {type: Object, required: true},
//     status: {type: string, completed: "pending"}
//   },

//   {timestamps: true}
// )

// module.exports = mongoose.model("Carts", Cartschema);