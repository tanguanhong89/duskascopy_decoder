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
                let rows = decodeBinary(sss);
                re(rows);
            })
        })
        post_req.end();
    });
}




(async () => {
    //13h(1pm) gmt time -> 9am US time
    let results = await send_HTTP_req("datafeed.dukascopy.com", "datafeed/QQQUSUSD/2022/06/18/13h_ticks.bi5")
    console.log(results[0])
})();//for top level

//"//datafeed.dukascopy.com/datafeed/QQQUSUSD/2022/06/18/13h_ticks.bi5"