const express=require('express');
const {jwtauth}=require('../middilwares/jwtauth');
const protectedRouter=express.Router();
const protectedControllers=require('../controller/protectedController');
protectedRouter.get('/user',jwtauth,protectedControllers.User);
protectedRouter.post('/contact',jwtauth,protectedControllers.Contact);

module.exports=protectedRouter;