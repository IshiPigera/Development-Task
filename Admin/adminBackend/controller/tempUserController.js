const tempUser = require('../models/tempUser')

/*create user*/
const postUser = async(req,res)=>{
    let newUser = new tempUser(req.body);

    newUser.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"New User created successfully  !"
        });
    });

}

//get tempUsers
const getUser =  async(req,res)=>{
    tempUser.find().exec((err,tempUsers)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingTempUsers:tempUsers
        });
    });
}

//get a specific tempUser by id
const getATempUser=async(req,res)=>{
    let tempUserId = req.params.id;
    tempUser.findById(tempUserId,(err,tempUser)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }

        return res.status(200).json({
            success:true,
            tempUser
        });
    });

}

module.exports = {
    postUser,
    getUser,
    getATempUser,
}