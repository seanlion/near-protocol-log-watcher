Tail = require('tail').Tail;

var options= {separator: /[\r]{0,1}\n/,  fsWatchOptions: {}, fromBeginning: false, nLines:1, follow: true}
tail = new Tail("./neardmain.log", options);

const filterType = ['ERROR', 'panic', 'DEBUG']
tail.on("line", function(passedLine) {
    const errorFound = filterType.filter((str) => str.toLowerCase().includes(passedLine.toLowerCase()));
    if (errorFound){
        console.log("Error Found!");
    }
    else{
        console.log(passedLine);
    }
  });
  
tail.on("error", function(error) {
    console.log('Tail file error: ', error);
});
