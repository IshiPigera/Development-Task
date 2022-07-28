const tempUser = require('../models/tempUser')

//Temp user Login
const validateLogin = async (req, res) => {

    try {

        let { email, password } = req.body
        tempUser.findOne({ email: email }, (err, tempUser) => {
            if (err) {
                return res.status(400).json({ success: false, err });
            }
            if (tempUser){
                if(tempUser.password == password){
                    return res.status(200).json({
                        success: true,
                        tempUser
                    });
                }else{
                    return res.status(200).json({
                        success: true,
                        tempUser:''
                    });

                }
            }


              
        });


    } catch (err) {
        return res.status(400).json({ success: false, err });
    }

}

module.exports = {
    validateLogin
}