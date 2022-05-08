let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

let authRouter = require("./routes/account");
let boardRouter = require("./routes/board");
let mypageRouter = require("./routes/mypage");
let albumRouter = require("./routes/album");
let planRouter = require("./routes/plan");
let trainingRouter = require("./routes/training");
let exerciseRouter = require("./routes/exercise");



const jwtMiddleware = require("./lib/token/jwtMiddlewares").jwtMiddleware;

var app = express();
// view engine setup

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(jwtMiddleware);

app.use("/auth", authRouter);
app.use("/board", boardRouter);
app.use("/mypages", mypageRouter);
app.use("/album", albumRouter);
app.use("/exercise", exerciseRouter);
app.use("/training", trainingRouter);
app.use("/plan", planRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
