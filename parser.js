Tail = require('tail').Tail;

var options= {separator: /[\r]{0,1}\n/,  fsWatchOptions: {}, fromBeginning: false, nLines:1, follow: true}
tail = new Tail("./neardmain.log", options);

tail.on("line", function(data) {
    console.log(data);
  });
  
tail.on("error", function(error) {
console.log('ERROR: ', error);
});
