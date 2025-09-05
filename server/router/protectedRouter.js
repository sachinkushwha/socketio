const express=require('express');
const protectedRouter=express.Router();
const protectedControllers=require('../controller/protectedController');
protectedRouter.get('/user',protectedControllers.User);

module.exports=protectedRouter;