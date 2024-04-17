const express = require('express');
const cors = require('cors')
const app = express();
const stripe = require('stripe')('sk_test_51NzuH0SGp41m30vUyUGsnRbqECRBQNafiv6juEhUsYHSpm5CHnQVg8y0jEBSlmr0X9gcyzwwMCJgJsBcxW7hjhgV00Tmfduf8T')

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors())


app.get('/',cors(),(req,res)=>{
    res.send("welcome")
})

app.post('/api/create-checkout-session',async(req,res)=>{
    const {products}= req.body;
    const ProductItems = products.map((ddd)=>({
        price_data:{
            currency:'inr',
            product_data:{
                name:ddd.name,
            },
            unit_amount:ddd.Price * 100,
        },
        quantity:ddd.count
    }))
    const session = await stripe.checkout.sessions.create({

        payment_method_types:["card"],
        line_items: ProductItems,
        mode: 'payment',
        success_url:"http://localhost:10000/sucess",
        cancel_url:"http://localhost:10000/cancel",
          });

      res.json({id:session.id})
      

})
app.listen(10000,()=>{
    console.log("port connected");
})