let mysql=require('mysql');
let bodyparser=require('body-parser')
let express = require('express');

let app=express()
app.use(bodyparser.json())

let con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Yadav@123',
    database:'restful_db',
});
// connected to database
con.connect(function(err){
    if (err) throw err;

    console.log('Connected!!')

    // con.query('select * from product',function(err,result,fields){
    //     if(err) throw err;
    //     console.log(result);
    // })
    
});
app.get('/',(req,res)=>{
    res.send('<h1>My RestAPI </h1>');
    
})
app.get('/api/product',(req,res)=>{
    let sql="Select * from product";
    con.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({'Status':200,"Error":null,"Response":result}));
    })
})
app.get('/api/product/:id',(req,res)=>{
    let sql= "Select* from product Where product_id="+req.params.id;
    con.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({"Status":200,"Error":null,"Response":result }));
    })
})
app.post('/api/product',(req,res)=>{
    let data= {product_name:req.body.product_name,product_price:req.body.product_price};
    let sql="Insert into product set ?";
    con.query(sql,data,(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({"Status":200,"Error":null,"Response":result }));
    })
})
app.put('/api/product/:id',(req,res)=>{
    let sql="Update product SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"'Where product_id="+req.params.id;
    con.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({"Status":200,"Error":null,"Response":result }));
    }) 
})
app.delete('/api/product/:id',(req,res)=>{
    let sql ='Delete from product where product_id='+req.params.id;
    con.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({"Status":200,"Error":null,"Response":result}));
    })
})
let port= process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Listing port is ${port}`);
})