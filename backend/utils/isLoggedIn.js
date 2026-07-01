const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: "../config/config.env" });

async function isLoggedIn(req, res, next){
    try{
        const ID = jwt.verify(req.cookies.access, process.env.JWT_ACCESS_KEY)
        req.userid = ID.userid
        return next()
    }
    catch(err){
        try{
            const ID = jwt.verify(req.cookies.refresh, process.env.JWT_REFRESH_KEY)
            const access_token = jwt.sign({userid: ID.userid}, process.env.JWT_ACCESS_KEY, {expiresIn: "15m"})
            res.cookie('access', access_token)
            req.userid = ID.userid
            return next()
        }
        catch(err){
            res.status(401).json({ message: "please log in to continue" })
        }
    }
}

module.exports = isLoggedIn