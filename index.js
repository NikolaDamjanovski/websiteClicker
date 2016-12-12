var Nightmare = require('nightmare');
var nightmare = Nightmare({show: true});
//testing commit
var refLinks = [

    'http://surveynoticias.com/p222837',
    'http://surveynoticias.com/p222839',
    'http://surveynoticias.com/p222841',
    'http://surveynoticias.com/p222843',
    'http://surveynoticias.com/p222849',
    'http://surveynoticias.com/p222852',
    'http://surveynoticias.com/p222856',
    'http://surveynoticias.com/p222858',
    'http://surveynoticias.com/p222861',
    'http://surveynoticias.com/p222866',
    'http://surveynoticias.com/p222872',
    'http://surveynoticias.com/p222874',
    'http://surveynoticias.com/p222876',
    'http://surveynoticias.com/p222882',
    'http://surveynoticias.com/p222885',
    'http://surveynoticias.com/p222885'
];
var loginAcc = [
    {user: 'damjaann89@yahoo.com', pass: 'Tigar123456'},
    {user: 'malinova_monika@yahoo.com', pass: 'N1k#ta23456'},
    {user: 'magfixcorp@gmail.com', pass: 'N1k#ta23456'},
    {user: 'damjanmonika@gmail.com', pass: 'N1k#ta23456'},
    {user: 'monikamalinova043@gmail.com', pass: 'N1k#ta23456'},
    {user: 'fluent767@gmail.com', pass: 'N1k#ta23456'},
    {user: 'bali@tuguhotels.com', pass: '123tt'},
    {user: 'surgavillas@dps.centrin.net.id', pass: '123tt'},
    {user: 'rock@hardrockhotels.net', pass: '123tt'},
    {user: 'lombokraya_htl@telkom.net', pass: '123tt'},
    {user: 'tulamben@mimpi.com', pass: '123tt'},
    {user: 'pwilantari@anantara.com', pass: '123tt'},
    {user: 'chamsari@indosat.net', pass: '123tt'},
    {user: 'wakanusa@wakaexperience.com', pass: '123tt'},
    {user: 'resort@damai.com', pass: '123tt'},
    {user: 'fadlycakp@yahoo.com', pass: '123tt'},
    {user: 'eh_juniadi@yahoo.com', pass: '123tt'},
    {user: 'balibusser@yahoo.com', pass: '123tt'},
    {user: 'gendut@england.com', pass: '123tt'},
    {user: 'leebahri@yahoo.com', pass: '123tt'},
    {user: 'zakat_bali@yahoo.com', pass: '123tt'},
    {user: 'tothesolo@yahoo.com', pass: '123tt'},
    {user: 'hardwoodindonesia@yahoo.com', pass: '123tt'},
    {user: 'fuay@yahoo.com', pass: '123tt'},
    {user: 'ef_architect@yahoo.com', pass: '123tt'},
    {user: 'wulandari@firststatebali.com', pass: '123tt'},
    {user: 'andrie.yudhianto@gmail.com', pass: '123tt'},
    {user: 'fauzantan@yahoo.com', pass: '123tt'},
    {user: 'faisal_silin@yahoo.com', pass: '123tt'},
    {user: 'itha_ersita@yahoo.com', pass: '123tt'},
    {user: 'a.a@yahoo.com', pass: '123tt'}
];
var currAcc =13;
var links = [];
var totalClicks = 0;
nightmare.goto('http://surveynoticias.com/')
    .exists('#loginlink').then(function (flag) {
    console.log(flag);
    if (flag) {
        nightmare.click('#loginlink')
            .type('form[method="post"] [name=a_login]', loginAcc[currAcc].user)
            .type('form[method="post"] [name=a_password]', loginAcc[currAcc].pass)
            .click('form[method="post"] [type=submit]').wait(7000).goto('http://surveynoticias.com/news/index.html').evaluate(function () {
            var arr = [];
            for(var i=0;i<document.links.length-1;i++){

                arr.push(document.links.item(i).href)
            }
            return arr;
        }).then(function (result) {
            getLinks(result, function () {
                startClicking(totalClicks);
            });
        }).catch(function (err) {
            console.log(err);
        });
    } else {
        nightmare.goto('http://surveynoticias.com/news/index.html').evaluate(function () {
            var arr = [];
            for(var i=0;i<25;i++){
                arr.push(document.links.item(i).href)
            }
            return arr;

        }).then(function (result) {
            getLinks(result, function () {
                startClicking(totalClicks);
            });
        }).catch(function (err) {
            console.log(err);
        });
    }
}).catch(function (error) {
        console.error('Search failed:', error);
    });

function getLinks(obj, fn) {
    for (var j = 0; j <= obj.length - 1; j++) {
        var temp = obj[j].split('.');
        // console.log(temp[1]);
        var temp1 = temp[1].split('/')
        // console.log(temp1);
        for (var i = 0; i <= temp1.length - 1; i++) {
            //console.log(parseInt(temp1[i]));
            if (!isNaN(parseInt(temp1[i]))) {
                links.push(obj[j]);
            }
        }
    }
    return fn()
}

function startClicking(click) {
    nightmare.goto(links[totalClicks]).then(function () {
        console.log('then');
        nightmare.click('.butlink a').evaluate(function () {
            return document.querySelector('.getBonusForm').innerHTML
        }).then(function (el) {
            var str = el.split(" ");
            var res = 0;
            var flag = true;
            for (var i = 0; i <= str.length - 1; i++) {
                if (!isNaN(parseInt(str[i])) && flag) {
                    res = parseInt(str[i]) + parseInt(str[i + 2]);
                    console.log(res);
                    flag = false;
                }
            }
            decideNext(res);
        }).catch(function (err) {
            console.log(err);
        });
    })
        .catch(function (err) {
            console.log(err)
        })
}
function decideNext(res) {
    nightmare.type('form[method="post"] [name="work_code"]', res).click('.getBonusForm input[name="work_ok"]').then(function () {
        totalClicks++;
        if (totalClicks == 10) {
            nightmare.goto('http://surveynoticias.com/logout').cookies.clearAll().wait(2000).end().then(function () {
            }).catch(function () {
            })
        } else {
            setTimeout(function () {
                console.log('Next Click');
                startClicking(totalClicks);
            }, 3500)
        }
    });
}