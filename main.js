const express = require("express")
const mysql=require("mysql")
// rr

// hetha mta3 el communication bin el base wil server :)
const con =require('./conf/connect');

const app=express()
app.use(express.json())

const userFunctions= require('./models/user');
const categFunctions= require('./models/categ');
const materFunctions= require('./models/materiel');
const actionFunctions= require('./models/action');
const transFunctions= require('./models/transaction');

app.post('/createUser', (req, res) => {
    const nom=req.body.nom;
    const role=req.body.role;
    const num_cart=req.body.num_cart; 
    const date_creation=new Date();
    userFunctions.createUser(nom,role,num_cart,date_creation,res);
});
app.delete('/deletUser', (req, res) => {
    const idu = req.body.idu;
    userFunctions.deletUser(idu,res);
  });
app.put('/updatUser', (req, res) => {
    const idu = req.body.idu;
    const newName = req.body.newName;
    const newCart = req.body.newCart;
    userFunctions.updatUser(idu,newName,newCart,res);
  });

app.get('/getUserById', (req, res) => {
    const idu = req.body.idu;
    userFunctions.getUserById(idu, res);
  });
app.get('/getAllUser', (req, res) => {
    userFunctions.getAllUser(res);
  });
//categ ;)
app.post('/createCateg', (req, res) => {
    const nom=req.body.nom;
    const date_creation=new Date();
    categFunctions.createCateg(nom,date_creation,res);
});
app.delete('/deletCateg', (req, res) => {
  const idcat = req.body.idcat;
  categFunctions.deletCateg(idcat,res);
});
app.put('/updatCateg', (req, res) => {
  const id = req.body.id;
  const newName = req.body.newName;
  categFunctions.updatCateg(id,newName,res);
});
app.get('/getCategrById', (req, res) => {
  const idcat = req.body.idcat;
  categFunctions.getCategrById(idcat, res);
});
app.get('/getAllCateg', (req, res) => {
  categFunctions.getAllCateg(res);
});
//materiel
app.post('/createMater', (req, res) => {
  const nom=req.body.nom;
  const idcat=req.body.idcat;
  const stock=req.body.stock;
  materFunctions.createMater(nom,idcat,stock,res);
});
app.delete('/deletMater', (req, res) => {
  const idm = req.body.idm;
  materFunctions.deletMater(idm,res);
});
app.put('/updatMater', (req, res) => {
  const id = req.body.id;
  const newName = req.body.newName;
  const stock = req.body.stock;
  materFunctions.updatMater(id,newName,stock,res);
});
app.get('/getMaterielById', (req, res) => {
  const idm = req.body.idm;
  materFunctions.getMaterielById(idm,res);
});
app.get('/getAllMater', (req, res) => {
  materFunctions.getAllMater(res);
});

// Action
app.post('/createAction', (req, res) => {
  const idu=req.body.idu;
  const date_entree=new Date();
  actionFunctions.createAction(idu,date_entree,res);
});
app.delete('/deletaction', (req, res) => {
  const id = req.body.id;
  actionFunctions.deletaction(id,res);
});
app.put('/updatAction', (req, res) => {
  const id = req.body.id;
  const date=new Date();
  actionFunctions.updatAction(id,date,res);
});
app.get('/getActionById', (req, res) => {
  const id = req.body.id;
  actionFunctions.getActionById(id,res);
});
app.get('/getAllAction', (req, res) => {
  actionFunctions.getAllAction(res);
});
// transaction
app.post('/createtrans', (req, res) => {
  const idu=req.body.idu;
  const idm=req.body.idm;
  const date=new Date();
  const qant=req.body.qant;
  const type=req.body.type;
  transFunctions.createtrans(idu,idm,date,qant,type,res);
});
app.delete('/delettrans', (req, res) => {
  const id = req.body.id;
  transFunctions.delettrans(id,res);
});
app.put('/updatTrans', (req, res) => {
  const id = req.body.id;
  const idu = req.body.idu;
  const idm = req.body.idm; 
  const date=new Date();
  const qant = req.body.qant;
  const type=req.body.type;
  transFunctions.updatTrans(id,idu,idm,date,qant,type,res);
});
app.get('/gettransById', (req, res) => {
  const id = req.body.id;
  transFunctions.gettransById(id,res);
});
app.get('/getAllTrans', (req, res) => {
  transFunctions.getAllTrans(res);
});

app.listen(3000,(err)=>{
    if(err)
        {
           console.log(err) 
        }else{
            console.log("on port 3000  ;)")
        }
})
