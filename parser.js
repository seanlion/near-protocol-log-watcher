Tail = require('tail').Tail;
const dotenv = require('dotenv');
const axios = require("axios");
dotenv.config();

const WEBHOOK_URL = process.env.WEBHOOK_URL;

var options= {separator: /[\r]{0,1}\n/,  fsWatchOptions: {}, fromBeginning: false, nLines:1, follow: true}
tail = new Tail(process.env.FILE, options);

const main = async () => {
    const filterType = ['ERROR', 'panic', 'WARN']
    tail.on("line", async function(passedLine) {
        const errorFound = filterType.filter((str) => passedLine.toLowerCase().includes(str.toLowerCase()));
        console.log("error Found : ", errorFound);
        if (errorFound.length > 0){
            console.log("Error | Warning Found! : ", passedLine);
            await axios.post(WEBHOOK_URL, {
                "attachments": [
                    {
                        "fallback": "요청이 실패했습니다.",
                        "color": "#FF1122",
                        "pretext": `${String.fromCodePoint(0x1F621)}${String.fromCodePoint(0x1F621)} 노드 에러 발생 ${String.fromCodePoint(0x1F621)}${String.fromCodePoint(0x1F621)}`,
                        "text": `${passedLine}`,
                        "footer": "Error Parser",
                    }
                ]
            })
        }
    });
    
    tail.on("error", function(error) {
        console.log('Tail file error: ', error);
    });
}

main();