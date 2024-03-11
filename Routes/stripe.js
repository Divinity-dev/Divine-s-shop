
Stripe_key = "sk_test_51NlyZwGdxUlG0jGDsUnRx6ufR6R3CUwYIHzYTxbpSjipy3kggk6i6Lh7qcxakLeKjK9nfkblcPO76vIKRYw4R1M400B4dJdcKT"
const router = require("express").Router()
const stripe = require("stripe")(Stripe_key)

router.post("/checkout", (req, res)=>{
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd"
    },
    (stripeErr, stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr)
        }else{
            res.status(200).json(stripeRes)
        }
    }
    )
})




module.exports = router; 