const express=require('express');
const publicController=require('../controller/publiccontroller');
const publicRouter=express.Router();
publicRouter.post('/login',publicController.Longin);
publicRouter.post('/signup',publicController.Signup);

module.exports=publicRouter;