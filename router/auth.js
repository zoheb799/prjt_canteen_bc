const express = require('express');
const { request, response } = require('express');
const router = express.Router();

require('../db/connection');
const register = require("../model/register");
const order = require("../model/orders");
const Contact = require("../model/contact us");




router.post('/Register', (request, response) => {
    console.log(request.body)
    const { name, email, password, confirm_password } = request.body;
    if (!name || !email || !password || !confirm_password) {
        return response.status(422).json({ err: "blanks cannot be empty" });
    }
    register.findOne({ email: email })
        .then((userexist) => {
            if (userexist) {
                return response.status(422).json({ err: "this email is already exist" });
            }
            const registers = new register({ name, email, password, confirm_password });

            registers.save().then(() => {
                response.status(201).json({ message: "Registration sucessfull" });
            }).catch((err) => response.status(500).json({ err }));
        }).catch(err => { console.log({ err: "error hai yaaro" }); });
});

router.post('/SignIn',function(req,res){
    var matched_users_promise = models.User.findAll({
        where: Sequelize.and(
            {Email: req.body.Email},
        )
    });
    matched_users_promise.then(function(users){ 
        if(users.length > 0){
            let user = users[0];
            let PasswordHash = user.Password;
            if(bcrypt.compareSync(req.body.Password,PasswordHash)){
                req.session.Email = req.body.Email;
                res.redirect('/');
            }
            else{
                res.redirect('/Register');
            }
        }
        else{
            res.redirect('/SignIn');
        }
    });
});


router.get('/Register', (request, response) => {

    register.find()
        .then((users) => {
            console.log(users);
            response.json(users);
        }).catch(err => { console.log({ err: "error hai yaaro" }); });
});

//the order section
router.post('/Orders', (request, response) => {
    const { Name, PhNumber, OrderDetails, OrderPrice, ChooseTime, DeliveryAddress } = request.body;
    if (!Name || !PhNumber || !OrderDetails || !OrderPrice || !ChooseTime || !DeliveryAddress) {
        return response.status(422).json({ err: "Orders cannot be empty" });
    }
    order.findOne({ ChooseTime: ChooseTime })
        .then((userexist) => {
            if (userexist) {
                return response.status(422).json({ err: "this  is already running" });
            }
            const orders = new order({ Name, PhNumber, OrderDetails, OrderPrice, ChooseTime, DeliveryAddress });

            orders.save().then(() => {
                response.status(201).json({ message: "Order sucessfull" });
            }).catch((err) => response.status(500).json({ err }));
        }).catch(err => { console.log({ err: "error hai yaaro" }); });
});
router.get('/Orders', (request, response) => {

    order.find()
        .then((Orders) => {
            console.log(Orders);
            response.json(Orders);
        }).catch(err => { console.log({ err: "error hai yaaro" }); });
});

// Contact

router.post('/Contact', (request, response) => {
    const { Name, Email, TextBox } = request.body;
    if (!Name || !Email || !TextBox ) {
        return response.status(422).json({ err: "Fields cannot be empty" });
    }
    Contact.findOne({ Name: Name })
        .then((userexist) => {
            if (userexist) {
                return response.status(422).json({ err: "this  is already running" });
            }
            const Contacts = new Contact({ Name, Email, TextBox });

            Contacts.save().then(() => {
                response.status(201).json({ message: "Message sent sucessfully" });
            }).catch((err) => response.status(500).json({ err }));
        }).catch(err => { console.log({ err: "error hai yaaro" }); });
});
router.get('/Contact', (request, response) => {

    Contact.find()
        .then((Contacts) => {
            console.log(Contacts);
            response.json(Contacts);
        }).catch(err => { console.log({ err: "error hai yaaro" }); });
});
router.get('/', (request, response) => {
    response.send("hello world!");
});
module.exports = router;




// var ejs = require('ejs');
// var path = require('path');
// var session = require('expr`ess-session');
// var models = require('../models');
// var Sequelize = require('sequelize');
// const bcrypt = require('bcrypt');