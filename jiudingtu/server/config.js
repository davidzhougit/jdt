//第一次填写诗词，未完全填对时，每填对一个字的积分
var firstPerChar = 2;

//第一次填写诗词，并且完全填对时，每填对一个字的积分
var firstAllDone = 4;

//非第一次填写该首诗词时，每填对一个字的积分
var notFirstPerChar = 1;

//新注册用户欢迎邮件中，积分奖金细则相关页面的链接
var ruleHref = 'http://jiudin.duapp.com/gameinfo.html';

//新注册用户的欢迎邮件内容
var newerMsg = '尊敬的用户：<div><br><p style="text-indent: 28px;line-height: 26px;">欢迎来到九鼎图填字游戏网站，在这里玩游戏，您可以获得积分，积分可用于兑换各种奖品，其中也可能会包含可观的奖金哦，积分奖励方式请您进入我的账户查看积分细则。在这里，您将对唐诗宋词及中国传统文化智慧有不一样的体验与发现；在这里，您将利用九鼎图这一有效工具识透并牢记唐诗宋词从而大大增强形象思维及逻辑思维的能力。</p></div>';

module.exports={
    firstPerChar: firstPerChar,
    firstAllDone: firstAllDone,
    notFirstPerChar: notFirstPerChar,
    newerMsg: newerMsg
};