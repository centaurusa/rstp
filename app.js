const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// routes
const streamsRoutes = require('./routes/streams');
const authRoutes = require('./routes/auth');


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/steams', streamsRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
    const { statusCode, message, data } = error;
    res.status(statusCode).json({ message, data })
});



mongoose.connect('mongodb+srv://shumsky:vaxky2i7tG41y4ty@cluster0-u9ogx.mongodb.net/rtsp?retryWrites=true', { useNewUrlParser: true })
    .then(result => {
        app.listen(3080, () => console.log('Server is running'));
    });
