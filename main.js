const https = require('https');
const decodeBinary = require('./decoder');

function send_HTTP_req(host, route) { //type = GET, POST   
    return new Promise((re, rj) => {
        let post_options = {
            host: host,
            port: 443,
            path: '/' + route,
            headers: {
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept': '*/*'
            }
        };

        // Set up the request
        let post_req = https.get(post_options, function (res) {
            let sss = [];
            res.on('data', function (chunk) {
                sss = sss.concat(chunk)
            });
            res.on('end', () => {
                re(Buffer.concat(sss));
            })
        })
        post_req.end();
    });
}




(async () => {//size ratio bi5:csv, 3:10
    //13h(1pm) gmt time -> 9am US time
    let historicalFilename = "QQQUSUSD"
    let year = "2022"
    let month = "06"//00-11
    let day = "18"
    let hour = "13"//00-23, 13 means 9am US time
    let binaryData = await send_HTTP_req("datafeed.dukascopy.com", "datafeed/" + historicalFilename + "/" + year + "/" + month + "/"
        + day + "/" + hour + "h_ticks.bi5")
    let rows = decodeBinary(binaryData, historicalFilename, year, month, day, hour);
    console.log(rows[0])
})();//for top level

//"//datafeed.dukascopy.com/datafeed/QQQUSUSD/2022/06/18/13h_ticks.bi5"