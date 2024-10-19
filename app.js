const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user.api');
require('dotenv').config();

const app = express();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
app.use(cors()); // CORS 미들웨어를 라우터보다 위에 배치
app.use(bodyParser.json());
app.use('/api',indexRouter);
app.use('api/user', userRouter);

const mongoURI = MONGODB_URI_PROD;

mongoose.connect(mongoURI, { useNewUrlParser: true }).then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.log("DB connection fail", err);
});

const PORT = process.env.PORT || 5000; // Heroku에서 제공하는 PORT를 사용하거나, 로컬에서 실행 시 5000번 포트 사용
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


//1.회원가입
//유저가 이메일, 패스워드, 유저이름 입력해서 보냄
//받은 정보를 저장함 (데이터베이스 모델필요)
//패스워드 암호화 시켜서 저장

//1.라우터
//2.모델 - 데이터 받은 모델
//3.데이를 저장(가입여부 체크, 패스워드 암호화)
//4.응답을 보낸다 (회원가입 완료했어요~)