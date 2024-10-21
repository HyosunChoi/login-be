const User = require("../model/User");
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
    try {
        const {email, name, password} = req.body;
        const user = await User.findOne({email});
        if(user) {
            throw new Error('이미 가입된 유저입니다')        
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new User({email, name, password: hash});
        await newUser.save();
        res.status(200).json({status:'success'});

    } catch (err) {
      res.status(400).json({status:'fail',err})
    }
  };

  userController.loginWithEmail = async (req, res) => {
    try {
      const { email, password } = req.body; // 이메일 패스워드 정보 읽어오기
      const user = await User.findOne({ email }, "-createdAt -updatedAt -__v"); // "-createdAt -updatedAt -__v"는 마이너스기호로 뺀다
      if (user) {
        const isMatch = bcrypt.compareSync(password, user.password);
        if (isMatch) {
          const token = user.generateToken();
          return res.status(200).json({ status: 'success', user, token });
        }
      }
      throw new Error("아이디 또는 비밀번호가 일치하지 않습니다");
    } catch (error) {
      res.status(400).json({ status: 'fail', message: error.message });
    }
  };
module.exports = userController