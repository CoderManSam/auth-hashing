const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma.js')

router.post('/', async (req, res) => {
    // Get the username and password from request body

    const {username, password} = req.body

    const saltRounds = 10

    const hashedPassword = await bcrypt.hash(password, saltRounds)
        // Store hash in your password DB.

    const createdUser = await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword
        }
    });

    const userId = createdUser.id
    const userUsername = createdUser.username

    const userInfo = {id: userId, username: userUsername}

    console.log("userinfo", userInfo)

    res.status(201).json({ user: userInfo })
    
    // Hash the password: https://github.com/kelektiv/node.bcrypt.js#with-promises
    
    // Save the user using the prisma user model, setting their password to the hashed version
    
    // Respond back to the client with the created users username and id
});

module.exports = router;
