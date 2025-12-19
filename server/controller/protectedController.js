const  mongoose  = require('mongoose');
const usermodel=require('../model/user');
const Contactmodel=require('../model/contact');
exports.User=async(req,res)=>{
    const user_id=new mongoose.Types.ObjectId(req.user._id);
    const contactlist=await Contactmodel.find({user_id}).populate('contact_user_id');
    const userdata=contactlist.map(doc=>doc.contact_user_id);
    res.status(200).json(userdata);
}

exports.Contact=async(req,res)=>{
    const user_id=new mongoose.Types.ObjectId(req.user._id);
    const {email}=req.body;
    
    const usercontact=await usermodel.findOne({email});
    
    if(!usercontact){
        return res.status(404).json('user not found');
    }
    const contact_user_id=usercontact._id;
    const alreadycontact=await Contactmodel.findOne({contact_user_id});
    if(alreadycontact.user_id===user_id){
        return res.status(409).json('already added');
    }
    const contactlist=new Contactmodel({contact_user_id,user_id});
    await contactlist.save();

    res.status(200).json('contact added');
}