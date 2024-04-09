const express = require("express");
const fs = require('fs');
const path=require('path');
const app = express();


///////
//app.use(compression());
app.set('view engine','ejs');
app.use(express.urlencoded());      //we import this for reading the data from the request of the form that we filled
const bodyparser=require('body-parser');
const mongoose = require("mongoose");
const { Console } = require("console");

//for the mongod that we run in our computer
//mongoose.connect('mongodb://127.0.0.1/warehouse', {useNewUrlParser: true,useUnifiedTopology:true});
//the url in compass, we just use compass to see it visually
//mongodb://localhost:27017

//const URL=process.env.MONGO_URI;
//console.log(URL);
mongoose.connect('', {useNewUrlParser: true,useUnifiedTopology:true});

//we are accessing the warehouse database from our account which has many databases

//mongoose.connect(mongodb+srv://Siddartha:JmYcfrpYIOm4YOBP@clustersid.jmxh0db.mongodb.net/warehouse, {useNewUrlParser: true,useUnifiedTopology:true});
//this is also correct but for deployment i should give the mongourl suing key value pairs

const db=mongoose.connection;
const deliveryschema=new mongoose.Schema({
    Userid: String,
    firstname: String,
    lastname: String,
    Phone_no: Number,
    age: Number,
    email:String,
    address: String,
    radius : Number,
    vehicle: String,
    date: String
});
const deliverytable=mongoose.model('delivery', deliveryschema);


const sellerschema=new mongoose.Schema({
    Userid: String,
    firstname: String,
    lastname: String,
    Phone_no: Number,
    age: Number,
    email:String,
    address: String,
    date: String
});
const sellertable=mongoose.model('seller', sellerschema);


const customerschema=new mongoose.Schema({
    Userid: String,
    firstname: String,
    lastname: String,
    Phone_no: Number,
    age: Number,
    email:String,
    address: String,
    itemname : String,
    date: String,
    orderid: Number,
    orderstatus:String,
    orderlocation:String
});
const customertable=mongoose.model('customer', customerschema);

const deliveryrequestschema=new mongoose.Schema({
    Userid: String,
    itemname : String,
    orderid : Number,
    date: String,
    Customerid: String,
    orderstatus: String
});
const deliveryrequesttable=mongoose.model('deliveryrequest', deliveryrequestschema);

const deliveryrequestapprovedschema=new mongoose.Schema({
    Userid: String, //who is the user that is delivering
    itemname : String, //wht item is he delivering
    orderid:Number, //which order he is delivering
    deliverydate: String, //by wht date he shd deliver
    Customerid: String, //to whom he shd deliver
    Customername: String, //he shd know the name of the customer while delivering
    Customerphone: Number, //customerphone to whom he is delivering
    Customeraddress: String, //customeraddress to whom he is delivering
    currentlocation: String, //the delivery drivers current location while delivery
    deliverystatus:String 
});
const deliveryrequestapprovedtable=mongoose.model('deliveryrequestapproved', deliveryrequestapprovedschema);

const sellerrequestschema=new mongoose.Schema({
    Userid: String,
    firstname: String,
    lastname: String,
    Phone_no: Number,
    age: Number,
    email:String,
    pickupaddress: String,
    message:String,
    date: String
});
const sellerrequesttable=mongoose.model('sellerrequest', sellerrequestschema);


/*if we wanted we could have taken the first name, last name, address,age,email during login itself
if we would have done that then during the buy form filling tht guy would have just had to fill the
item name , but we didnt do this so that a customer can order for for different people by giving 
different address and first name, this wouldnt matter as we the admistrators will call tht guy 
who ordered and ask him if he ordered for himself or not ie we can ask him if the address entered by
him is his address or someone elses */
const loginschema=new mongoose.Schema({
    Userid: String,
    password: String,
    mobile: Number
});
const logintable=mongoose.model('login', loginschema);

var loginid="nouser";
var phone;
//module.exports={loginid,phone};
//module.exports={loginid,phone};

//////
app.get("/", (req, res)=>{   //here i removed /login
    loginid="nouser";   //if he come to login page again means he logged out
    //and we send him to login page by the log out anchor
    res.sendFile(__dirname+'/loginpage.html');
});
app.get("/wrongpassword", (req, res)=>{ 
    if(loginid=="nouser"){res.redirect('/')}  //here i removed /login
    res.sendFile(__dirname+'/wrongpassword.html');
});
app.get("/signup", (req, res)=>{ 
    loginid="nouser";  //if he somehow comes here then he wants to add an other account so we remove his current login
    res.sendFile(__dirname+'/signuppage.html');
});
app.get("/loginerror", (req, res)=>{ 
    if(loginid=="nouser"){res.redirect('/')} //here i removed /login
    res.sendFile(__dirname+'/loginalreadyinuse.html');
});
app.get("/admin", (req, res)=>{ 
    if(loginid=="nouser"){res.redirect('/')} //here i removed /login
    res.sendFile(__dirname+'/admin.html');
});

app.get("/myprofile",(req,res)=>{
    if(loginid=="nouser"){res.redirect('/')} //here i removed /login
    res.sendFile(__dirname+'/myprofile.html');
});
app.get("/aboutus",(req,res)=>{
    if(loginid=="nouser"){res.redirect('/')} //here i removed /login
    res.sendFile(__dirname+'/aboutus.html');
});

app.get("/home", (req, res)=>{ 
    if(loginid=="nouser"){res.redirect('/')} //here i removed /login
    res.sendFile(__dirname+'/home.html');
});
app.get("/buy", (req, res)=>{ 
    if(loginid=="nouser"){res.redirect('/')} //here i removed /login
    res.sendFile(__dirname+'/buypageitems.html');
});
app.get("/buynow",(req,res)=>{
    if(loginid=="nouser"){res.redirect('/')} //here i removed /login
    res.sendFile(__dirname+'/buypage.html');
});
app.get("/buysuccess",(req,res)=>{
    if(loginid=="nouser"){res.redirect('/')} //here i removed /login
    res.sendFile(__dirname+'/buythankyou.html');
});
app.get("/delivery", async(req, res)=>{ 
    if(loginid=="nouser"){res.redirect('/')} //here i removed /login
    let data=await deliverytable.find({Userid:loginid}); //here data is a array of objects
        //console.log(data);
        if(data.length!=0){
            res.redirect("/deliverysuccess");
        }
        else{
            res.sendFile(__dirname+'/deliverypage.html');
        }
});
app.get("/deliverysuccess",(req,res)=>{
    if(loginid=="nouser"){res.redirect('/')} //here i removed /login
    res.sendFile(__dirname+'/deliverythankyou.html');
});
app.get("/sell", async(req, res)=>{ 
    if(loginid=="nouser"){res.redirect('/')} //here i removed /login
    let data=await sellertable.find({Userid:loginid}); //here data is a array of objects
        //console.log(data);
        if(data.length!=0){
            res.redirect("/sellersuccess");
        }
        else{
            res.sendFile(__dirname+'/sellerpage.html');
        }
});
app.get("/sellersuccess",(req,res)=>{
    if(loginid=="nouser"){res.redirect('/')} //here i removed /login
    res.sendFile(__dirname+'/sellerthankyou.html');
});


// var x=1;


// var myPromise = (y) => {
//     return new Promise((resolve, reject) => {
//         let data=logintable.find({Userid:y});
//         console.log(data.length);
//         if(data.length==0){
//             x=0;
//             console.log(x+"nnoib");
//         }
//     });
//   };

async function checklogin(y){
    let data=await logintable.find({Userid:y});
    console.log(data.length);
    if(data.length==0){
        x=0;
        location.href="localhost/signup";
        console.log(x+"nnoib");
    }
}

app.post("/",async(req,res)=>{ //here i removed /login
    y=req.body.Userid;   //the name shd be same in the html
    z=req.body.password;
    //console.log("user"+y+"pass"+z);
    if(y=="admin123" && z=="12345"){
        loginid=y;
        res.redirect("/admin");
    }
    else{
        let data=await logintable.find({Userid:y}); //here data is a array of objects
        //console.log(data);
        if(data.length==0){
            res.redirect("/signup");
        }
        else if(data[0].password==z){
            loginid=y;
            phone=data[0].mobile;
            //console.log(phone);
            res.redirect("/home");
        }
        else{
            loginid=y;   //ie the loginid entered is correct but password is not correct so we send wrongpassword and we do not save the phone number as we still didnt confirm the password for more explaination look at post of signup
            //console.log("wrong password"+z+"correct"+data[0].password);
            res.redirect("/wrongpassword");
        }
    }
});

app.post("/wrongpassword",async(req,res)=>{
    y=req.body.Userid;   //the name shd be same in the html
    z=req.body.password;
    if(y=="admin123" && z=="12345"){
        loginid=y;
        res.redirect("/admin");
    }
    else{
        let data=await logintable.find({Userid:y}); //here data is a array of objects
        //console.log(data);
        if(data.length==0){
            res.redirect("/signup");
        }
        else if(data[0].password==z){
            loginid=y;
            phone=data[0].mobile;
            //console.log(phone);
            res.redirect("/home");
        }
        else{
            loginid=y;
            //console.log(data.password);
            res.redirect("/wrongpassword");
        }
    }
});

app.post("/signup",async(req,res)=>{
    y=req.body.Userid;
    let data=await logintable.find({Userid:y});
    if(data.length==0){
        var mydata=new logintable(req.body);
        loginid=y;
        phone=req.body.mobile;
        mydata.save().then(()=>{ 
            res.redirect("/home");
        });
    }
    else{
        loginid="already present";//im saving some random value so that loginid is not nouser, because if loginid is no user then that menas we are trying 
        //to accesss without even tring and when we try to acces loginerror without even trying we redirect them to login
        res.redirect("/loginerror");
    }
});
    
app.post("/loginerror",async(req,res)=>{
    y=req.body.Userid;
    let data=await logintable.find({Userid:y});
    if(data.length==0){
        var mydata=new logintable(req.body);
        loginid=y;
        phone=req.body.mobile;
        mydata.save().then(()=>{ 
            res.redirect("/home");
        });
    }
    else{
        loginid="already present";
        res.redirect("/loginerror");
    }
});
    
    
    
app.post("/delivery",(req,res)=>{
    req.body.Userid=loginid;
    req.body.Phone_no=phone;
    var mydata=new deliverytable(req.body);
    mydata.save().then(()=>{ 
        res.redirect("/deliverysuccess");
    });
});

app.post("/sell",(req,res)=>{
    req.body.Userid=loginid;
    req.body.Phone_no=phone;
    var mydata=new sellertable(req.body);
    mydata.save().then(()=>{ 
        res.redirect("/sellersuccess");
    });
});
app.post("/buynow",(req,res)=>{
    req.body.Userid=loginid;
    req.body.Phone_no=phone;
    var mydata=new customertable(req.body);
    mydata.save().then(()=>{ 
        res.redirect("/buysuccess");
    });
});

app.get("/deliverytable",async(req,res)=>{
    if(loginid=="nouser"){res.redirect('/')} //here i removed /login
    if(loginid=="admin123"){
        let data=await deliverytable.find({});
        //console.log(data);
        res.render('deliverytable',{'details':data});
    }
    else{
        res.redirect("/home");
    }
    
});
app.get("/sellertable",async(req,res)=>{
    if(loginid=="nouser"){res.redirect('/')} //here i removed /login
    if(loginid=="admin123"){
    let data=await sellertable.find({});
    //console.log(data);
    res.render('sellertable',{'details':data});}
    else{
        res.redirect("/home");
    }
});
app.get("/customertable",async(req,res)=>{
    if(loginid=="nouser"){res.redirect('/')} //here i removed /login
    if(loginid=="admin123"){
    let data=await customertable.find({});
    //console.log(data);
    res.render('customertable',{'details':data});}
    else{
        res.redirect("/home");
    }
});

app.get("/deliveryrequests",async(req,res)=>{
    if(loginid=="nouser"){res.redirect('/')} //here i removed /login
    if(loginid=="admin123"){
        let data=await deliveryrequesttable.find({});
        //console.log(data);
        res.render('deliveryrequests',{'details':data});}
    else{
        res.redirect("/home");
    }
});

app.get("/deliverydelivered",async(req,res)=>{
    if(loginid=="nouser"){res.redirect('/')} //here i removed /login
    if(loginid=="admin123"){
        let data=await deliveryrequestapprovedtable.find({});
        //console.log(data);
        res.render('deliverydelivered',{'details':data});}
    else{
        res.redirect("/home");
    }
});

app.get("/sellerrequests",async(req,res)=>{
    if(loginid=="nouser"){res.redirect('/')} //here i removed /login
    if(loginid=="admin123"){
        let data=await sellerrequesttable.find({});
        //console.log(data);
        res.render('sellerrequests',{'details':data});}
    else{
        res.redirect("/home");
    }
});

app.get("/myorders",async(req,res)=>{
    if(loginid=="nouser"){res.redirect('/')} //here i removed /login
    else{
        let data=await customertable.find({Userid:loginid});
        //console.log(data);
        res.render('myorder',{'details':data});
    }
});
app.get("/mydeliveries",async(req,res)=>{
    if(loginid=="nouser"){res.redirect('/')} //here i removed /login
    else{
        let check=await deliverytable.find({Userid:loginid});
        if(check.length==0){
            res.redirect("/delivery");
        }
        else{
            let data=await customertable.find({Userid:{$ne:loginid}}); //ie we search for all items that are not orderd by us
            //console.log(data);
            res.render('mydeliveries',{'details':data});
        }
    }
});
app.get("/mysellerprofile",async(req,res)=>{
    if(loginid=="nouser"){res.redirect('/')} //here i removed /login
    else{
        let check=await sellertable.find({Userid:loginid}); //this will give an array of objects
        if(check.length==0){
            res.redirect("/sell");
        }
        else{
            //console.log(data);
            res.render('mysellerprofile',{'details':check[0]});  //we choose 0 beacuse we know tht there will be only one seller with this loginid 
        }
    }
});
app.get("/mydeliveriesapproved",async(req,res)=>{
    if(loginid=="nouser"){res.redirect('/')} //here i removed /login
    else{
        let check=await deliverytable.find({Userid:loginid});
        if(check.length==0){
            res.redirect("/delivery");
        }
        else{
            let data=await deliveryrequestapprovedtable.find({Userid:loginid}); //ie we search for all items that are not orderd by us
            //console.log(data);
            res.render('mydeliveriesapproved',{'details':data});
        }
    }
});


//////////////////////////////
app.post("/mysellerprofile",async(req,res)=>{
    let data=req.body;
    let obj={
        Userid: data.Userid,
        firstname: data.firstname.substring(12,100),  
        lastname: data.lastname.substring(11,100),
        Phone_no: data.Phone_no.substring(10,100), //in the get request page we wrote it like "Phone No :<%=details.Phone_no %>" so we do a post request we will get the exact same thing
                                                    //but Phone_no according to the schema should have only integers so we need to remove the string part part we can handle this problem in 2 ways 
                                                    //1-as we did in my deliveries part we remover the "order id" from the value part by using a label so that the value part will conatin only integers
                                                     //2-we can also handle it in this way ie we get the string from tht value and we remove the letters so that we have only integers
        age: data.age.substring(5,100),
        email: data.email.substring(7,100),
        pickupaddress: data.pickupaddress.substring(16,100),
        date: new Date(),
        message: data.message
    };
    //console.log(obj);

    var mydata=new sellerrequesttable(obj);
        mydata.save().then(()=>{ 
            res.redirect("mysellerprofile");
        });
});


// Userid: String,
//     itemname : String,
//     orderid : Number,
//     date: String,
//     Customerid: String

app.post("/mydeliveries",async(req,res)=>{
    var formData=req.body;
    //console.log(formData);
    var a=loginid;  //stores the loginid of the user requesting for delivery
    var b=new Date(); //stores the date for the request for delivery
    var c=formData.itemname;  //stores the item name request for delivery
    var d=formData.orderid;  //stores the orderid of the item tht he wants to deliver but this is not shown to him
    var e=formData.Userid;   //stores the customer of the item tht he wants to deliver ie the userid of the order table
    var f=formData.orderstatus;//as he is requesting the order status will be not dispatched
    var data={  //im doing this beacuse i dont want everything from the body of the request
        Userid:a,
        itemname:c,
        Customerid:e,
        date:b,
        orderid:d,
        orderstatus:f
    };
    let checkdata=await deliveryrequesttable.find({ $and: [{Userid:loginid},{orderid:d}]});
    //console.log(checkdata);
    if(checkdata.length==0){
        var mydata=new deliveryrequesttable(data);
        mydata.save().then(()=>{ 
        });
    }
    else{
    }
});

//     -Userid: String, //who is the user that is delivering
//     -itemname : String, //wht item is he delivering
//     -orderid:Number, //which order he is delivering
//     -Customerid: String, //to whom he shd deliver
//     deliverydate: String, //by wht date he shd deliver
//     -Customername: String, //he shd know the name of the customer while delivering
//     -Customerphone: Number, //customerphone to whom he is delivering
//     -Customeraddress: String, //customeraddress to whom he is delivering
//     -currentlocation: String //the delivery drivers current location while delivery
//     -deliverystatus:String  //we can use thsi to show if the delivery guys delivery is pending or not

app.post("/deliveryrequests",async(req,res)=>{
    var x=req.body.Userid;
    var y=req.body.orderid;
    var z=req.body.Customerid;
     let pp=await deliveryrequesttable.findOneAndUpdate({ $and: [{Userid:x},{orderid:y}]},{$set:{orderstatus:"Dispatched"}});
     await deliveryrequesttable.deleteMany({ $and: [{Userid:{$ne:x}},{orderid:y}]});
     pp=await customertable.findOneAndUpdate({ $and: [{Userid:z},{orderid:y}]},{$set:{orderstatus:"Dispatched"}});
     //console.log(pp); here pp contains the object as the function finds only one
     //ie we save the dat eat which we dispatch
     var month=new Date().getUTCMonth();
    var day=new Date().getUTCDate();
    var year=new Date().getUTCFullYear();
     var data={
        Userid: req.body.Userid,
        itemname: req.body.itemname,
        orderid: req.body.orderid,
        Customerid: req.body.Customerid,
        currentlocation: "WareHouse",
        Customername:pp.firstname,
        Customeraddress:pp.address,
        Customerphone:pp.Phone_no,
        deliverydate:new Date(year,month,day+3),//because he should deliver within 3 days of pickup
        deliverystatus:"Pending"  
     };
     var mydata=new deliveryrequestapprovedtable(data);
        mydata.save().then(()=>{ 
            res.redirect("/deliveryrequests"); //we do this so tht we refresh our page after making changes to the page
        });
    //  pp=await deliveryrequesttable.find({ $and: [{Userid:x},{orderid:y}]});
    // console.log(pp);
    // pp=await customertable.find({ $and: [{Userid:z},{orderid:y}]});
    // console.log(pp);
});

app.post("/deliverydelivered",async(req,res)=>{
    var x=req.body.Userid;
    var y=req.body.orderid;
    var z=req.body.Customerid;
    // console.log(x);
    // console.log(y);
    // console.log(z);
     //let pp=await deliveryrequesttable.findOneAndDelete({ $and: [{Userid:x},{orderid:y}]}); //we delete the request of the guy that requested
     let pp=await deliveryrequesttable.deleteMany({orderid:y});//many people may have requested that delivery we delete all those requests
     pp=await customertable.findOneAndUpdate({ $and: [{Userid:z},{orderid:y}]},{$set:{orderstatus:"Delivered"}});
     pp=await deliveryrequestapprovedtable.findOneAndUpdate({ $and: [{Userid:x},{orderid:y}]},{$set:{deliverystatus:"Delivered"}});
     res.redirect("/deliverydelivered");
});

app.post("/mydeliveriesapproved",async(req,res)=>{
    var x=req.body.Userid;
    var y=req.body.orderid;
    // console.log(x);
    // console.log(y);
    // console.log(req.body.currentlocation);
    let pp=await deliveryrequestapprovedtable.findOneAndUpdate({ $and: [{Userid:x},{orderid:y}]},{$set:{currentlocation:req.body.currentlocation}});
    pp=await customertable.findOneAndUpdate({orderid:y},{$set:{orderlocation:req.body.currentlocation}});
     res.redirect("/mydeliveriesapproved");
});

app.post("/myorders",async(req,res)=>{
    var x=req.body.Userid;
    var y=req.body.orderid;
    let pp=await deliveryrequestapprovedtable.findOne({ $and: [{Customerid:x},{orderid:y}]});
    await customertable.findOneAndUpdate({ $and: [{Userid:x},{orderid:y}]},{$set:{orderlocation:pp.currentlocation}});
    //console.log(pp.currentlocation);
    res.redirect("/myorders");
});

//if i need to see in the port that we need
// const port = 80;
// app.listen(port, ()=>{
//     console.log(`The application started successfully on port ${port}`);
// });

// we listen at the port tht heroku is using
app.listen(process.env.PORT || 3000, function(){
    console.log("server running");
  });


/*

  till now we were using the database in our local server but for deployment we shd use a databse in atlas so we should use the userid and password from atlas to connect our index.js with the database ie the mongoose.connection link will be different and we forecfully created a databse called warehouse in the atlas and we added the warehouse at the end of the / of the link so that all the schemas or tables that we add shpuld go into that database

  we can create a user name and password for atlas by going to the database access and we shd give read and write permission to that user so that the user can make changes to the database. we created a database user having username: Siddartha password:JmYcfrpYIOm4YOBP and using this we connect
  
  and to deploy it using heroku we should allow access to the atlas from all ip address as heroku uses a wide range of ips
   (earlier we used to just access with our localhost ip ie 127.0.0.1) we can do this by going to the network access in atlas
  
  and the same reason that heroku uses range of ips we dont listen at an exact port we listen at the port that is given by heroku
  
  
  we use mongoose.connect with the link that we get from mongodb atlas, by doing this when i use heroku on this node.express since we directly give the link in mongoose.connect there is no need to exclusively doing anything in heroku to connect as we directly gave the link to connect in the mongoose .connect part.
   but the disadvantage of directly giving the link in mongoose.connect is that the username and password are directly visible, but for us it wouldnt matter much as we dont care about that much security
  but to improve the security we can store the link of the atlas in a variable MONGO_URL in a sepearate file such as .env and we import this MONGO_URL variable from .env and store in a variable url syntax:-- const url=MONGO_URL-- and we give this variable url in the mongoose.connect with the other things same. and since we want to prevent ppl from seeing our link ie password and username, in the .gitignore we put the .env file so that the .env file is not included into heroku. So now the problem is the heroku does not conatin .env but in expreess we get the value of the url variable from the MONGO_URL which is present in the .env file but the .env file is not included in heroku so the url variable will be undefined, so heroku helps us to overcome this problem by allowing us to define global variables so in heroku we will set key as url and variable as tht link in .env ie we foreceble set the global variable as url and the value of it as the url of the atlas
  
  we set the current node engine that we are using in package.json and we also set the start to node index.js
  
  in .gitignore we store the files that we dont want heroku to access
  
  we can save all the changes that we made by using the commands:
  heroku login   //we use this to login to heroku using our vs code so that we can make a connection between between both of them ie so tht we can transfer
  heroku git:clone -a warehouse-sid-project //we create a clone of our changes into heroku
  cd warehouse-sid-project //this is not a nessary step
  git add . 			//we add all our stuff from vscode to heroku
  git commit -am "make it better"  //we commit the changes that we made in heroku and simply display a message
  git push heroku master		   //we start the prosses in heroku

  */
