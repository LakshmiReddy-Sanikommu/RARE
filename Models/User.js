const mongoose= require('mongoose')
const UserSchema = new mongoose.Schema({
   
     FirstName:String,
     LastName :String,
     Password:String,
     Email:String,
     State:String,
     City:String,
     Zip:String
});

module.exports= mongoose.model('User',UserSchema,'Users')