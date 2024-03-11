const mongoose = require("mongoose")

const Userschema = new mongoose.Schema(
  {
    username: {type: String, unique:true, required: true},
    email: {type: String, unique:true, required: true},
    password: {type: String, required: true},
    isAdmin: {
        type:Boolean,
        default:false
    },
    Img:{type:String}
  },
  {timestamps: true}
)

module.exports = mongoose.model("User", Userschema);