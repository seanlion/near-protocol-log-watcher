Tail = require('tail').Tail;
const dotenv = require('dotenv');
dotenv.config();

var options= {separator: /[\r]{0,1}\n/,  fsWatchOptions: {}, fromBeginning: false, nLines:4, follow: true}
tail = new Tail(process.env.FILE, options);

const filterType = ['ERROR', 'panic', 'DEBUG']
tail.on("line", function(passedLine) {
    const errorFound = filterType.filter((str) => passedLine.toLowerCase().includes(str.toLowerCase()));
    console.log("error found : ", errorFound);
    if (errorFound.length > 0){
        console.log("Error Found!");
    }
    else{
        console.log(passedLine);
    }
  });
  
tail.on("error", function(error) {
    console.log('Tail file error: ', error);
});
