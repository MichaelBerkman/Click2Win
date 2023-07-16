// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Assuming you have a User model

const app = express();

app.use(bodyParser.json());

app.post('/signup', async (req, res) => {
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({username, password: hashedPassword});
    
    await user.save();
    
    res.status(200).send({message: 'User successfully registered'});
});

app.post('/signin', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    
    if(!user) return res.status(404).send({message: 'User not found'});
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if(!isValidPassword) return res.status(403).send({message: 'Invalid credentials'});
    
    const token = jwt.sign({id: user._id}, 'SECRET_KEY', {expiresIn: '1h'}); // You should store the secret key in an environment variable
    
    res.status(200).send({token, username});
});
