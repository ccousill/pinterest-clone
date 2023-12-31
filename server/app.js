const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const cors = require('cors');
const userRouter = require("./controllers/users")
const postRouter = require('./controllers/posts')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true}).then((result) => app.listen(4000)).catch((err) => console.log(err));

app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)