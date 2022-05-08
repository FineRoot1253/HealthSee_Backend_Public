var express = require("express");
var router = express.Router();

// 글쓰기 페이지

var list = require("./lists/index");
var post = require("./posts/index");
var comment = require("./comments/index");


router.use("/lists", list);
router.use("/posts", post);
router.use("/comments", comment);



module.exports = router;

