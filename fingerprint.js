var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var csv = require('ya-csv');
var source = process.argv[2] || process.cwd();
var logName = process.argv[3] || "log";
var writer = csv.createCsvFileWriter(logName + '.csv');
var counter = 1;


var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = path.join(dir,file);
      fs.stat(file, function(err, stat) {

        var algo = 'sha1';
        var shasum = crypto.createHash(algo);

        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          
          process.stdout.write(String(counter++));
          for(var i =0; i<=counter; i++){
            process.stdout.write('\b');
          }

          var s = fs.ReadStream(file);
          s.on('data', function(d) {shasum.update(d);});
          s.on('end', function(){
            var d = shasum.digest('hex');
              
            results.push([d , file]);
            next();
          });          
        }
      });
    })();
  });
};

walk(source, function(err, results) {
   
  if (err) throw err;
  //console.log('results is: ' + typeof(results));

  results.forEach(function(rec) {
    //console.log('rec is: ' + typeof(rec));
    writer.writeRecord(rec);
  });

  for(var re = 0; re < results.length; re++) {
  //  console.log(path.normalize(results[re]));
  }
  process.stdout.write('\n');
  console.log("number of files: " + results.length);
});

