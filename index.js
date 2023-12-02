const express = require('express')
const router = express.Router();
const mongoose= require('mongoose')
const User = require('./Models/User')
const app = express()
var bodyParser = require('body-parser');
const port = 3000
app.use('/', express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect("mongodb+srv://hiteshinti:6ku6P44b8zAjNzpd@cluster0.no98fc7.mongodb.net/Ecommerce?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
module.exports = router;
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/login', async(req, res) => {
    let data= await req.body;
    console.log(data);
    const users = User.find({data});
    if(users.Email!="")
    {
      console.log(users);
      res.status(200).json({success:true})
    }else{
        res.status(401).json({success:false, error: 'Invalid credentials'})
    }
  })
app.get('/register', (req, res) => {

    res.sendFile("pages/register.html",{root:__dirname})
})
app.get('/index', (req, res) => {

    res.sendFile("pages/index.html",{root:__dirname})
})
app.post('/register', async(req, res) => {
    let data= await req.body;
    console.log(data);
    const user = new User(data);
    await user.save();
    res.status(200).json({success:true,user:user})
})
  
  