// const mongoose = require("mongoose");
// mongoose.connect('mongodb://127.0.0.1:27017/warehouse', {useNewUrlParser: true,useUnifiedTopology:true});
// const db=mongoose.connection;
// db.on('error',console.error.bind(console,'connection error:'));
// // db.once('open',function(){
// //     console.log("HELL YEA");
// // });

// const deliveryschema=new mongoose.Schema({
//     Userid: String,
//     firstname: String,
//     lastname: String,
//     Phone_no: Number,
//     age: Number,
//     email:String,
//     address: String,
//     radius : Number,
//     vehicle: String
// });
// const deliverytable=mongoose.model('delivery', deliveryschema);

// function insertdata(){
//     console.log("WE DID IT");
//     document.getElementsByClassName("title").innertext="bye babe";
//     var row_val={
//         Userid: document.getElementById("userid").value,
//         firstname: document.getElementById("firstname").value,
//         lastname: document.getElementById("lastname").value,
//         Phone_no: document.getElementById("phone").value,
//         age: document.getElementById("age").value,
//         email:document.getElementById("email").value,
//         address: document.getElementById("address").value,
//         radius : document.getElementById("radius").value,
//         vehicle: document.getElementById("vehicle").value
//     }
//     var record=new deliverytable(row_val);
//     record.save();
// }

// document.getElementById('btn').onclick=insertdata;
// // function change(){
// //     document.getElementsByClassName("title").innertext="bye babe";
// // }
