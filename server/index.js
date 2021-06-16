const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');
const app = express(); 
const MainItem = require('./models/db');
const SubItem = require('./models/subdb');
app.use(express.urlencoded({limit: '50mb', extended: true,parameterLimit: 1000000}));
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/ecommerce",{useUnifiedTopology: true})



// function getSequenceNextValue(seqName) {
//     var seqDoc = CountDb.findAndModify({
//       query: { _id: seqName },
//       update: { $inc: { seqValue: 1 } },
//       new: true
//     });
  
//     return seqDoc.seqValue;
//   }


// post data to main db
app.post('/insert',async(req,res)=>{

    const id= req.body.id;
    const name = req.body.item;
    const pid = req.body.pid;
    const item= new MainItem({id:id,Name:name,pid:pid});
    try{

        const v= await item.save();
        if (v){
            res.status("200").json({Response:"success",v});
        }
    }
    catch(err){
        console.log(err);

    }

})

// post data to Sub db
app.post('/items',async(req,res)=>{

    const id= req.body.id;
    const name = req.body.item;
    const iid=req.body.iid;
    const item= new SubItem({id:id,item:name,Iid:iid});
    try{

        const v= await item.save();
        if (v){
            res.status("200").json({Response:"success",v});
        }
    }
    catch(err){
        console.log(err);

    }

})

// fetch sub data for electronics list
app.get('/readElectronics',async(req,res)=>{
    var lid = req.query.id;
    console.log("hi",lid);
    MainItem.find({id:lid},(err, result)=> {  
    if (err) throw err;  
        console.log(result); 
        res.send(result); 

    });  
})

// fetch sub data for grocery list
app.get('/readGrocery',async(req,res)=>{
    var lid = req.query.id;
    console.log("hi",lid);
    MainItem.find({id:lid},(err, result)=> {  
    if (err) throw err;  
        console.log(result); 
        res.send(result); 

    });
})

// fetch items for electronics sub data
app.get('/itemsElectronics',async(req,res)=>{
    var lid = req.query.id;
    console.log("hi",lid);
    SubItem.find({id:lid},(err, result)=> {  
    if (err) throw err;  
        console.log(result); 
        res.send(result); 

    });  
})

// fetch items for grocery sub data
app.get('/itemsGrocery',async(req,res)=>{
    var lid = req.query.id;
    console.log("hi",lid);
    SubItem.find({id:lid},(err, result)=> {  
    if (err) throw err;  
        console.log(result); 
        res.send(result); 

    });  
})

// update the draggable id data in db
app.put('/update/:dragItem' ,async(req,res)=>{
    const itemId = req.params.dragItem;
    const id=req.body.id;
    console.log('id',id);
    console.log('item',itemId);
    SubItem.updateOne({ Iid: itemId }, { id: id }, function(
        err,
        result
      ) {
        if (err) {
          res.send(err);
        } else {
          res.json(result);
        }
      });
})


// MainItem.find({},(err,result)=>{
//     if(err){
//         res.send(err)
//     }
//     res.send(result);
// })


app.listen('3006',()=>{
    console.log('server running at port 3005')
})

