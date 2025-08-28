const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const errorHandler = require('./middleware/error.middleware');

const app = express();


// Middleware cơ bản
// app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use(morgan('dev'));

// Routes
app.use('/api', routes);

// Middleware xử lý lỗi
app.use(errorHandler);

module.exports = app;