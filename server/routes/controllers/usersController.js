const express = require("express");
const router = express.Router();

const mongoose = require('mongoose');


// mongoose.connect('mongodb://localhost:27018', {useNewUrlParser: true});
mongoose.connect('mongodb://mongo/test', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   // we're connected!
   console.log('we\'re connected!');
});

// const usersModel = require('../../core/models/usersModel').Users(db);
const usersModel = require('../../core/models/usersModel');

router.get('/create', async function (req, res) {
   console.log('post');
   const users = new usersModel({
      name: 'ksenia',
      age: 9,
      email: 'ksenia.kichka@gmail.com',
      gender: 'female'
   })
   console.log(users);
   await users.save(function (err) {
      if (err) {
         console.log(err);
         res.sendStatus(400);
      }
      console.log('saved!');
   });
   res.sendStatus(200);
});

router.get("/", async function (req, res) {
   console.log('here');
   const users = await usersModel.find().byAge().exec();
   console.log(users);
   res.status(200);
   res.send("Great");
});

module.exports = router;