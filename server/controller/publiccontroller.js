const user = require('../model/user');
const UserModel = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.Longin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const User = await user.findOne({ email });
        if (!User) {
            return res.status(403).json('user not found');
        }
        const ispassequal = await bcrypt.compare(password, User.password);
        if (!ispassequal) {
            return res.status(403).json('worng password');
        }
        const jwtToken = jwt.sign(
            { email: User.email, _id: User._id },
            process.env.JWT_SECRET
        )
        res.status(200).json({
            message: 'login success',
            jwtToken,
            success: true,
            email,
            name: User.name,
            userId:User._id
        });

    } catch (err) {
        return res.status(500).json('login error');
    }
}

exports.Signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(name, email, password);
        const User = await UserModel.findOne({ email });
        console.log(User);
        if (User) {
            return res.status(200).json('user already exits');
        }
        const usermodel = new UserModel({ name, email, password });
        usermodel.password = await bcrypt.hash(password, 10);
        await usermodel.save();
        res.status(200).json('signup successful');
    } catch (err) {
        return res.status(500).json('signup failed', err);
    }
}