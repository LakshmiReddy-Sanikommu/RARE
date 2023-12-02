import { Schema, model } from 'mongoose';
const UserSchema = new Schema({
   
     FirstName:String,
     LastName :String,
     Password:String,
     Email:String,
     State:String,
     City:String,
     Zip:String
});

export default model('User',UserSchema,'Users')