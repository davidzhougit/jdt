var express = require('express'),
    http = require('http'),
    path = require('path'),
    actions = require("./server/actions"),
    session = require("express-session"),
    bodyparser = require("body-parser"),
    multer = require("multer");
var app = express();

app.set('port', process.env.PORT || 18080);
app.use(express.static(path.join(__dirname, 'client')));
app.use(session({
    cookie: {path: "/", httpOnly: true, secure: false, maxAge: null},
    secret: "keyboard cat"
}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
//app.use(multer());

app.all('*', function(req, res, next){
    res.header('Access-Control-Allow-origin', '*');
    res.header('Access-Control-Allow-Headers', 'x-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('X-Powered-By', '3.2.1');
    //res.header('Content-Type', 'application/json;charset=utf-8');
    next();
})

var routedefines = [
    {
        'pathname': '/',
        'handler': actions.root,
        'method': 'get'
    },
    {
        'pathname': '/manager',
        'handler': actions.manager,
        'method': 'get'
    },
    {
        'pathname': '/login',
        'handler': actions.login,
        'method': 'post'
    },
    {
        'pathname': '/ilogin',
        'handler': actions.ilogin,
        'method': 'post'
    },
    {
        'pathname': '/logout',
        'handler': actions.logout,
        'method': 'post'
    },
    {
        'pathname': '/getUserinfo',
        'handler': actions.getUserinfo,
        'method': 'post'
    },
    {
        'pathname': '/modifyPass',
        'handler': actions.modifyPass,
        'method': 'post'
    },
    {
        'pathname': '/register',
        'handler': actions.register,
        'method': 'post'
    },
    {
        'pathname': '/captcha.png',
        'handler': actions.captcha,
        'method': 'get'
    },
    {
        'pathname': '/ifNameBeUsed',
        'handler': actions.ifNameBeUsed,
        'method': 'post'
    },
    {
        'pathname': '/addPoem',
        'handler': actions.addPoem,
        'method': 'post'
    },
    {
        'pathname': '/updatePoem',
        'handler': actions.updatePoem,
        'method': 'post'
    },
    {
        'pathname': '/getPoems',
        'handler': actions.getPoems,
        'method': 'post'
    },
    {
        'pathname': '/addJiuDinChar',
        'handler': actions.addJiuDinChar,
        'method': 'post'
    },
    {
        'pathname': '/updateJiuDinChar',
        'handler': actions.updateJiuDinChar,
        'method': 'post'
    },
    {
        'pathname': '/getAllJiudinCharGroup',
        'handler': actions.getAllJiudinCharGroup,
        'method': 'post'
    },
    {
        'pathname': '/getAllScore',
        'handler': actions.getAllScore,
        'method': 'post'
    },
    {
        'pathname': '/modifyIntroNum',
        'handler': actions.modifyIntroNum,
        'method': 'post'
    },
    {
        'pathname': '/queryPoemRecord',
        'handler': actions.queryPoemRecord,
        'method': 'post'
    },
    {
        'pathname': '/addRecord',
        'handler': actions.addRecord,
        'method': 'post'
    },
    {
        'pathname': '/showAnswer',
        'handler': actions.showAnswer,
        'method': 'post'
    },
    {
        'pathname': '/getIntroFillNum',
        'handler': actions.getIntroFillNum,
        'method': 'post'
    },
    {
        'pathname': '/setIntroFillNum',
        'handler': actions.setIntroFillNum,
        'method': 'post'
    },
    {
        'pathname': '/setAsIntro',
        'handler': actions.setAsIntro,
        'method': 'post'
    },
    {
        'pathname': '/delpoem',
        'handler': actions.delpoem,
        'method': 'post'
    },
    {
        'pathname': '/qryuser',
        'handler': actions.qryuser,
        'method': 'post'
    },
    {
        'pathname': '/saveJiudinRecord',
        'handler': actions.saveJiudinRecord,
        'method': 'post'
    },
    {
        'pathname': '/showJiudinRecords',
        'handler': actions.showJiudinRecords,
        'method': 'post'
    },
    {
        'pathname': '/mailToUser',
        'handler': actions.mailToUser,
        'method': 'post'
    },
    {
        'pathname': '/destroy',
        'handler': actions.destroy,
        'method': 'get'
    },
    {
        'pathname': '/saveAccountPageInfoSet',
        'handler': actions.saveAccountPageInfoSet,
        'method': 'post'
    },
    {
        'pathname': '/saveGameHelpInfo1Set',
        'handler': actions.saveGameHelpInfo1Set,
        'method': 'post'
    },
    {
        'pathname': '/saveGameHelpInfo2Set',
        'handler': actions.saveGameHelpInfo2Set,
        'method': 'post'
    }
]

for(var i=0; i<routedefines.length; i++){
    var handle = (function bb(i){
        var handler = routedefines[i].handler;
        var method = routedefines[i].method;
        var path = routedefines[i].pathname;
        return function (req, res){
            try{
                console.log('action ' + routedefines[i].pathname + ' start-------------------------------------------');
//                if(path != '/' && path != '/manager' && path != '/login' && path != '/captcha.png' && !req.session.user){
//                    res.send({error: "您还未登录，请登录后再操作"});
//                    return ;
//                }
                handler(req, res);
            }catch(e){
                console.log(e);
                console.log(e.stack);
                if(method == 'post'){
                    res.send({error: "服务器正忙，请稍后再试..."});
                }
                else {
                    res.redirect('/');
                }
            }
        }
    })(i);
    app[routedefines[i].method].apply(app, [routedefines[i].pathname, handle]) ;
}

var server = http.createServer(app);
server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
