var express = require("express");
const downloadFile = require("../../../lib/sequelize/board/downloadFile");
const readPicture = require("../../../lib/sequelize/album/readAlbum")
  .readPicture;
var router = express.Router();
const upload = require("../../../lib/sequelize/album/writeAlbum").upload;
const writePost = require("../../../lib/sequelize/album/writeAlbum").writeAlbum;
const readPost = require("../../../lib/sequelize/album/readAlbum").readPost;
const checkPost = require("../../../lib/check/album").checkPost;
const checkLogin = require("../../../lib/check/user").checkLogin;
const deletePost = require("../../../lib/sequelize/album/deleteAlbum")
  .deletePost;
const updatePost = require("../../../lib/sequelize/album/updateAlbum")
  .updateAlbum;

router.post(
  "/",
  checkLogin,
  upload.array("files"),
  writePost,
  readPost,
  downloadFile
);

router.get("/:AL_Code", checkLogin, checkPost, readPost);

router.get("/picture/:AP_Code&:AL_Code", checkLogin, checkPost, readPicture);

router.delete("/:AL_Code", checkLogin, checkPost, deletePost);

router.patch(
  "/:AL_Code",
  checkPost,
  upload.array("files"),
  updatePost,
  readPost
);

module.exports = router;
