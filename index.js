console.log("Current Directory:", __dirname);
console.log("Files in models directory:", fs.readdirSync(path.join(__dirname, 'models')));

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const env = require("dotenv")
const userRoute = require("./Routes/user")
const authRoute = require("./Routes/auth")
const productRoute = require("./Routes/Products")
const CartRoute = require("./Routes/Carts")
const OrderRoute = require("./Routes/Order")
const cors = require("cors")
const stripeRoute = require("./Routes/stripe")
const multer = require("multer");

env.config()

mongoose.connect(process.env.DB_URL)
.then(()=>{console.log("successful")}).catch((err)=>{console.log(err)});

app.use(express.json({ limit: "50mb" }));
app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/products", productRoute)
app.use("/api/Cart", CartRoute)
app.use("/api/Order", OrderRoute)
app.use("/api/payment", stripeRoute)


app.listen(5000, ()=>{
    console.log("listening on port 5000")
})
