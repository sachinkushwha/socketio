const usermodel=require('../model/user');
exports.User=async(req,res)=>{
    const userdata=await usermodel.find();
    console.log(userdata);
    res.status(200).json(userdata);
}