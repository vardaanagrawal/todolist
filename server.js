const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const v4 = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config();

//connect to mongodb
mongoose.connect(
  process.env.MONGODB_LINK,()=>{console.log('connected to mongodb');}
);

//data schema
const userSchema = {
  email: String,
  password: String,
  list: Array,
};

//data model
const User = mongoose.model("user", userSchema);

//Registration route
app.post("/registeruser", async (req, res) => {

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  
  const newUser = new User({
    email: req.body.email,
    password: password,
    list: [],
  });
  const email = req.body.email;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.send({
      status: 400,
      message: "User already exist",
    });
  } else {
    res.send({
      status: 200,
      message: "Registration successful",
    });
    newUser
      .save()
      .catch((err) => res.status(400).json("Error: " + err));
  }
});

//login route
app.post("/loginuser", async (req, res) => {
  const email = req.body.email;
  const userExist = await User.findOne({ email });
  if (userExist) {
  const ans = await bcrypt.compare(req.body.password, userExist.password);
    if (ans) {
      const token = jwt.sign({
        email: email
      },process.env.JWT_SECRET)
      return res.json({
        status: 200,
        message: "Login Succesful",
        token: token
      });
    } else {
      res.send({
        status: 400,
        message: "Incorrect Password",
      });
    }
  } else {
    res.send({
      status: 400,
      message: "User does not exist. Please Register",
    });
  }
});

//get list route
app.get("/getlist/:email", async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email });
  res.send(user);
});

//add item in todo list post request
app.post("/addItem", async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  const unique_id = v4();
  user.list.push({
    id: unique_id,
    title: req.body.title,
    description: req.body.description,
  });
  user.save();
});

//delete item from list route
app.post("/deleteItem", async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });

  user.list.pull({
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
  });
  user.save();
});


if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,'/frontend/build')));

  app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'frontend','build','index.html'));
  })
}
else{
  app.get('/',(req,res)=>{
    res.send("Api running");
  })
}



app.listen(process.env.PORT, function () {
  console.log("Express is running on port: "+ process.env.PORT);
});
