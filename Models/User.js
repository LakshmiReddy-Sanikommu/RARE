const mongoose= require('mongoose')
const UserSchema = new mongoose.Schema({
     FirstName: String,
     LastName: String,
     Password: String,
     Email: { type: String, unique: true }
});

module.exports= mongoose.model('User',UserSchema,'Users')