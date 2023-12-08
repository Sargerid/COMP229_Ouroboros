require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index.routes');
const userRouter = require('./routes/api.user.routes');
const ticketRouter = require('./routes/api.ticket.routes');
const authRouter = require('./routes/auth.routes');

const app = express();

// Middleware for CORS
app.use(cors({ 
  origin: ["http://localhost:3000", "http://localhost:5173", "*"],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
}));

// Middleware for logging
app.use(logger('dev'));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Middleware for cookie parsing
app.use(cookieParser());

// Middleware for serving static files (if your React app is built)
app.use(express.static(path.join(__dirname, 'build')));

// Routes
app.use('/', indexRouter);
app.use('/api/users', userRouter);
app.use('/api/tickets', ticketRouter);
app.use('/auth', authRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      // Remove the line below in a production environment
      stack: req.app.get('env') === 'development' ? err.stack : undefined,
    },
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
