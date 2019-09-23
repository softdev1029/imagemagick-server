const IncomingForm = require("formidable").IncomingForm;

//moves the $file to $dir2
var moveFile = (file, dir2)=>{
  //include the fs, path modules
  var fs = require('fs');
  var path = require('path');

  //gets file name and adds it to dir2
  var f = path.basename(file);
  var dest = path.resolve(dir2, "order.csv");

  fs.rename(file, dest, (err)=>{
    if(err) throw err;
    else console.log('Successfully moved');
  });
};

module.exports = function upload(req, res) {
  var form = new IncomingForm();

  form.on("file", (field, file) => {
    // Do something with the file
    // e.g. save it to the database
    // you can access it using file.path
    console.log(file);
    moveFile(file.path, '/var/www/html/PatternTile2/InputPatterns');
  });
  form.on("end", () => {
    res.json();
  });
  form.parse(req);
};
