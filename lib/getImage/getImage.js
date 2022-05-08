const getImage = () => {
    const filename = req.params.filename;
  
    var file = path.join(__dirname, "../../../upload/") + filename;
  
    res.download(file);
  };
  
  module.exports = getImage;