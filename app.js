var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var cors = require('cors');

// const mongoosePW = require("./config/userInfo.json");\

var indexRouter = require('./routes/index');
var powerRouter = require('./routes/powerConsumption');
var relayRouter = require('./routes/relay');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/powerConsumption', powerRouter);
app.use('/relay', relayRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// net.createServer(function(socket) {       // 소켓 연결시 작동
//   socket.setEncoding('utf8');
  
//   console.log('socket connected');

//   socket.on('end', function() {
//     console.log('socket disconnected');
//   });

//   socket.on('error', function(err) {
//     console.log('socket err: ' + err);
//   });
// }).listen(3300, function() {
//   console.log('socket server listening')
// });

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongoDB server");
});

mongoose.connect('mongodb://localhost/SmartGrid', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


module.exports = app;
