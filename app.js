const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');


const app = express();

app.use(cors()); // CORS 미들웨어를 라우터보다 위에 배치
app.use(bodyParser.json());
app.use('/api',indexRouter);


//const mongoURI = 'mongodb://localhost:27017/todo-demo'
const mongoURI = 'mongodb://127.0.0.1:27017/todo-demo';


mongoose.connect(mongoURI, { useNewUrlParser: true }).then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.log("DB connection fail", err);
});

app.listen(5000, () => {
    console.log("server on 5000")
})

