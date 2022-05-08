var express = require("express");
var router = express.Router();


var list = require("./lists/index");
var post = require("./posts/index");
var evaluation = require("./evaluations/index");


router.use("/lists", list);
router.use("/posts", post);
router.use("/evals", evaluation);


module.exports = router;