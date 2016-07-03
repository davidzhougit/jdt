var db = require('./DBFactory');
var deffered = require('./deffered');

var services = {
    /**
     * 根据用户名查询用户
     * @param uname
     * @returns {*}
     */
    getUserByName: function(uname){
        return db.query("select * from user where uname='" + uname + "'");
    },
    /**
     * 修改密码
     * @param uname
     * @param newpass
     * @returns {*}
     */
    modifyPass: function(uname, newpass){
        return db.oper(["update user set password='" + newpass + "' where uname='" + uname + "'"]);
    },
    /**
     * 增加用户
     * @param uname
     * @param newpass
     * @returns {*}
     */
    addUser: function(uname, newpass, usertype){
        return db.oper(["insert into user (uname, password, regdate, usertype) values ('" + uname + "', '" + newpass + "', null, " + usertype + ")"]);
    },
    /**
     * 添加诗词
     * @param title
     * @param content
     * @param answer
     * @returns {*}
     */
    addPoem: function(title, content, answer, type, author){
        answer = answer || '';
        var len = content.replace(/[^\w\u4e00-\u9fa5]/g, '').length;
        type = type || (len > 48 ? 3 : (len > 36 ? 2 : 1));
        return db.oper(["insert into poem (title, content, type, answer, author) values ('" + title + "','" + content + "'," + type + ",'" + answer + "', '" + author + "')"]);
    },
    /**
     * 编辑诗词
     * @param id
     * @param title
     * @param content
     * @param answer
     * @returns {*}
     */
    updatePoem: function(id, title, content, answer, author){
        answer = answer || '';
        var len = content.replace(/[^\w\u4e00-\u9fa5]/g, '').length;
        return db.oper(["update poem  set title='" + title + "',content='" + content + "',answer='" + answer + "',author='" + author + "' where id=" + id]);
    },
    /**
     * 查询所有诗词
     * @returns {*}
     */
    getPoems: function(){
        return db.query("select * from poem");
    },
    /**
     * 查询所有无答案诗词
     * @returns {*}
     */
    getAllNoneAnswerPoem: function(){
        return db.query("select * from poem where answer=''");
    },
    /**
     * 查询title的诗词
     * @param title
     * @returns {*}
     */
    getPoemByTitle: function(title){
        return db.query("select * from poem where title='" + title + "'");
    },
    /**
     * 查询所有简单诗词
     * @returns {*}
     */
    getAllSimPoem: function(){
        return db.query("select * from poem where type=1");
    },
    //查询所有中级诗词
    getAllMidPoem: function(){
        return db.query("select * from poem where type=2");
    },
    /**
     * 查询所有高级诗词
     * @returns {*}
     */
    getAllSeniorPoem: function(){
        return db.query("select * from poem where type=3");
    },
    getAllIntroPoem: function(){
        return db.query("select * from poem where type=0");
    },
    getAllJiudinPoem: function(){
        return db.query("select * from poem where type=4");
    },
    delpoem: function(pid){
        return db.oper(['delete from poem where id=' + pid]);
    },
    setAsIntro: function(pid){
        return db.oper(["update poem set type=0 where id=" + pid]);
    },
    /**
     * 添加九鼎作诗文字
     * @param name
     * @param content
     * @param filltext
     * @returns {*}
     */
    addJiuDinChar: function(name, content, filltext){
        filltext = filltext || '';
        return db.oper(["insert into jiudinchar (name, content, filltext) values ('" + name + "', '" + content + "', '" + filltext + "')"])
    },
    /**
     * 编辑九鼎作诗文字
     * @param id
     * @param name
     * @param content
     * @param filltext
     * @returns {*}
     */
    updateJiuDinChar: function(id, name, content, filltext){
        return db.oper(["update jiudinchar set name='" + name + "', content='" + content + "', filltext='" + filltext + "' where id=" + id]);
    },
    /**
     * 获取九鼎作诗文字
     * @returns {*}
     */
    getAllJiudinCharGroup: function(){
        return db.query("select * from jiudinchar");
    },
    /**
     * 查询学生积分情况
     * @returns {*}
     */
    getAllScore: function(){
        return db.query("select uname,score from user order by score desc");
    },
    /**
     * 更改入门级填空数
     */
    modifyIntroNum: function(num){
        return db.oper(["update sys_config set pval=" + num + " where pkey='intro.fill.num'"]);
    },
    /**
     * 查询某人对某诗词的填词记录
     * @param pid
     * @param uname
     */
    queryPoemRecord: function(pid, uname){
        return db.query("select * from record where pid=" + pid + " and uname='" + uname + "'");
    },
    /**
     * 更新游戏记录
     * @param uname 用户
     * @param pid 诗词
     * @param answer 结果
     * @param correct 正确个数
     * @param score 分数
     * @returns {*}
     */
    updateRecord: function(uname, pid, answer, correct, score,times){
        return db.oper([
            "update record set times=" + times + ",lastanswer='" + answer + "',lastcorrect=" + correct + " where uname='" + uname + "' and pid=" + pid,
            "update user set score=score+" + score + " where uname='" + uname + "'"
        ]);
    },
    /**
     * 添加游戏记录
     * @param uname 用户
     * @param pid 诗词
     * @param answer 结果
     * @param correct 正确个数
     * @param score 分数
     * @returns {*}
     */
    addRecord: function(uname, pid, answer, correct, score,times){
        return db.oper([
            "insert into record (uname,pid,times,lastanswer,lastcorrect) values('" + uname + "'," + pid + "," + times + ",'" + answer + "'," + correct + ")",
            "update user set score=score+" + score + " where uname='" + uname + "'"
        ]);
    },
    showAnswer: function(uname,pid,answer, correct, score){
        return db.oper([
            "update record set times=3,lastanswer='" + answer + "',lastcorrect=" + correct + " where uname='" + uname + "' and pid=" + pid,
            "update user set score=score+" + score + " where uname='" + uname + "'"
        ]);
    },
    getIntroFillNum: function(){
        return db.query("select pval from sys_config where pkey='intro.fill.num'");
    },
    setIntroFillNum: function(num){
        return db.oper(["update sys_config set pval=" + num + " where pkey='intro.fill.num'"]);
    },
    getJiudinRecord: function(pid, uname){
        return db.query("select * from jiudinrecord where pid=" + pid + " and uname='" + uname + "'");
    },
    addJiudinRecord: function(pid, uname, answer){
        return db.oper(["insert into jiudinrecord (pid,uname,answer) values (" + pid + ",'" + uname + "','" + answer + "')"]);
    },
    updateJiudinRecord: function(pid,uname,answer){
        return db.oper(["update jiudinrecord set answer='" + answer + "' where uname='" + uname + "' and pid=" + pid]);
    },
    showJiudinRecords: function(pid){
        return db.query("select * from jiudinrecord where pid=" + pid);
    }
}
module.exports=services;