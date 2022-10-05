const express = require('express');
const cors = require('cors');
const dbOperation = require('./DB/DBOperation');
const dbLaptop = require('./DB/Laptops');
const bodyParser = require('body-parser');

const API_PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
let client;
let session;
app.use(cors());

/* dbOperation.getProducts().then(res=>{
    console.log(res.recordset);
}); */

app.post('/byQueryId',async(req,res) => {
    const prodData = await dbOperation.getQueryById(req.body.queryId).then(async res=>{
        let query = res.recordset[0].queryStr;
        let data;
        if(query){
           data= await dbOperation.getDataByQuery(query).then(res=>{
             return res.recordsets[0];        
           });
        }
        return data;
    });
    res.send({result:prodData});
});

app.get('/laptopById/:npid',async(req,res)=>{
    let npid = req.params.npid;  
    const laptop = await dbLaptop.getLaptopById(npid).then(async res=>{
        return res.recordsets[0];
    });
    
    res.send({result:laptop});
});

app.get('/laptopGalleryById/:npid',async(req,res) => {
    let npid =  req.params.npid;
    const gallery = await dbLaptop.getLaptopGalleryById(npid).then(async res=>{
        return res.recordsets[0];
    });

    res.send({result:gallery});
});

app.get('/laptopSimilarLinks/:linkid',async(req,res) => {
    let linkid =  req.params.linkid;
    const links = await dbLaptop.getSimilarLinksBylinkId(linkid).then(async res=>{
        return res.recordsets[0];
    });

    res.send({result:links});
});

app.get('/laptopSpecifications/:npid',async(req,res) => {
    let npid = req.params.npid
    const specs = await dbLaptop.getSpecifications(npid).then(async res =>{
        return res.recordsets[0];
    });

    res.send({result:specs});
});


/* dbOperation.getQueryById(177).then(res=>{
    let query = res.recordset[0].queryStr;
    let data;
    if(query){
       data= dbOperation.getDataByQuery(query).then(res=>{
         console.log(res.recordset);
         return res.recordset[0];        
       });
    }
    console.log(data);
}) */


app.listen(API_PORT,()=>{ console.log(`listening on port ${API_PORT}`)});

