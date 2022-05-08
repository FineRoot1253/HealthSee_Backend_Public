var m = new Date();
var dateString =
  m.getFullYear() +
  "-" +
  (m.getMonth() + 1) +
  "-" +
  m.getDate() +
  " " +
  m.getHours() +
  ":" +
  m.getMinutes() +
  ":" +
  m.getSeconds();

module.exports = dateString;
