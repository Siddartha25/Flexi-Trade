const mongoose=require("mongoose")
mongoose.connect('mongodb://127.0.0.1:27017/admin', {useNewUrlParser: true,useUnifiedTopology:true});

var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    console.log("HELL YEA");
});


const deliveryschema=new mongoose.Schema({
    Userid: String,
    name: String,
    Phone_no: Number,
    age: Number,
    address: String,
    radius : Number,
    vehicle: String
});

const deliverytable=mongoose.model('delivery', deliveryschema);

var row_val={
    Userid: "sid1",
    name: "siddartha",
    Phone_no: 123456,
    age: 19,
    address: "hyd",
    radius : 100,
    vehicle: "car"
}

var record=new deliverytable(row_val);
record.save();


// async function getdata(){
//     let data=await deliverytable.find({Userid:"arun"});
//     console.log(data[0].age);
// }
// getdata();


// async function updatedata(){
//     await deliverytable.updateOne({Userid:"sid1"},{$set:{name:"siddartha"}});
// }
// updatedata();

// async function deletedata(){
//     await deliverytable.deleteOne({Userid:"sid1"});
// }
// deletedata();







