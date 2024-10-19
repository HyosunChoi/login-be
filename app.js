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


