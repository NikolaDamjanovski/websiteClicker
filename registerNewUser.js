var Nightmare = require('nightmare');
var nightmare = Nightmare({show: true});

var refLink = 'http://surveynoticias.com/p211829';
var acc = [
    'memetcand@yahoo.com',
    'memetcandalay@yahoo.com',
    'memetcankiraz@yahoo.com',
    'memetcelen@yahoo.com',
    'memetcelik@yahoo.com',
    'memetcif@yahoo.com',
    'memetcik2000@yahoo.com',
    'memetcolak@yahoo.com',
    'memetcoskun@yahoo.com',
    'memetdilsiz@yahoo.com',
    'memetdmn@yahoo.com'
];
var currAcc = 9;
nightmare.goto(refLink)
    .type('form[action="/#registration"] input[name="r_email"]', acc[currAcc])
    .type('form[action="/#registration"] input[name="r_password"]', '123tt')
    .type('form[action="/#registration"] input[name="r_password2"]', '123tt')
    .click('form[action="/#registration"] input[type="submit"]').wait(3000)
    .then(function (flag) {
        nightmare.goto('http://surveynoticias.com/logout').wait(1000).cookies.clearAll().end().then(function () {

        }).catch(function () {

        })
    }).catch(function (error) {
    console.error('Search failed:', error);
});
