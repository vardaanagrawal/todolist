import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { v4 as uuid } from "uuid";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = 7000;

//connect to mongodb
mongoose.connect(
  "mongodb+srv://vardaan:mongodbkapassword@crudapp.orljv.mongodb.net/todolist?retryWrites=true&w=majority"
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
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
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
app.get("/loginuser/:email/:password", async (req, res) => {
  const email = req.params.email;
  const userExist = await User.findOne({ email });
  if (userExist) {
    if (req.params.password === userExist.password) {
      res.send({
        status: 200,
        message: "Login Succesful",
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
  const unique_id = uuid();
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



app.listen(port, function () {
  console.log("Express is running");
});
