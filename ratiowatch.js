// TODO:
// - use casper.js
// - http://stackoverflow.com/questions/28500775/how-to-submit-a-form-with-phantomjs

var system = require('system');
var env = system.env;

var page = require('webpage').create();
page.viewportSize = {
    width: 1920,
    height: 1200
};

d = new Date();
todayStr = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate());

function scrapeUHDBits() {
    console.log('scraping UHDBits...');
    page.open('https://uhdbits.org/login.php', function() {
        page.evaluate(function(username, password) {
            document.getElementById('username').value = username;
            document.getElementById('password').value = password;
            document.querySelector('input[name=login]').click();
        }, env.UHDBITS_USER, env.UHDBITS_PW);

        window.setTimeout(function() {
            page.render('uhdbits_' + todayStr + '.png');
            console.log('done with UHDBits...');
            scrapeBitHDTV();
        }, 5000);
    });
}

var doneBitHDTV = false;
function scrapeBitHDTV() {
    console.log('scraping BitHDTV...');
    page.open('https://www.bit-hdtv.com/login.php', function() {
        page.evaluate(function(username, password) {
            document.querySelector('input[name=username]').value = username;
            document.querySelector('input[name=password]').value = password;
            document.querySelector('input[type=submit]').click();
        }, env.BITHDTV_USER, env.BITHDTV_PW);

        window.setTimeout(function() {
            page.render('bithdtv_' + todayStr + '.png');
            console.log('done with BitHDTV...');
            scrapeAlphaRatio();
        }, 5000);
    });
}

function scrapeAlphaRatio() {
    console.log('scraping AlphaRatio...');
    page.open('https://alpharatio.cc/login.php', function() {
        page.evaluate(function(username, password) {
            document.getElementById('username').value = username;
            document.getElementById('password').value = password;
            document.querySelector('input[name=login]').click();
        }, env.ALPHARATIO_USER, env.ALPHARATIO_PW);

        window.setTimeout(function() {
            page.render('alpharatio' + todayStr + '.png');
            console.log('done with AlphaRatio...');
            phantom.exit();
        }, 5000);
    });
}

scrapeUHDBits();
