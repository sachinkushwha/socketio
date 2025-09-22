const mongoose=require('mongoose');

const ContactSchema= mongoose.Schema({
    contact_user_id:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    user_id:{type:mongoose.Schema.Types.ObjectId,required:true}
});

module.exports=mongoose.model('contact',ContactSchema);