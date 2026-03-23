require('dotenv').config();
const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const User = require('./Models/User')
const app = express()
const cors = require('cors');
var bodyParser = require('body-parser');
const port = process.env.PORT || 3000
app.use('/', express.static(__dirname));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect(process.env.MONGODB_URI, {
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

app.post('/login', async (req, res) => {
  const { Email, Password } = req.body;
  console.log("Login attempt:", { Email });
  try {
    const user = await User.findOne({ Email: Email, Password: Password });
    if (user) {
      console.log("User found:", user.Email);
      res.status(200).json({ success: true, user })
    } else {
      res.status(401).json({ success: false, error: 'Invalid credentials' })
    }
  } catch(e) {
    console.error(e);
    res.status(500).json({ success: false, error: 'Server error' });
  }
})
app.get('/register', (req, res) => {

  res.sendFile("pages/register.html", { root: __dirname })
})
app.get('/index', (req, res) => {

  res.sendFile("pages/index.html", { root: __dirname })
})
app.post('/register', async (req, res) => {
  let data = await req.body;
  console.log(data);
  const user = new User(data);
  await user.save();
  res.status(200).json({ success: true, user: user })
})

