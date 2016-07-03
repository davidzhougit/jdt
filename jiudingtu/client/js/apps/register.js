/**
 * Created by Administrator on 2016/5/12.
 */
$(document).ready(function(){
    //邮箱验证的正则表达式
    var email =/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/g;
    //密码验证的正则表达式
    var passW = /\w{6,12}/g;
    // 封装提示框
    function popUp(content){
        if($(".prompt").length){  // 判断该节点是否存在，注意JQ要加上length
            $(".prompt").html(content).fadeIn("fast").fadeOut(2000);
        }else{
            var prompt = $("<div class='prompt'></div>").html(content);
            $("body").append(prompt);
            $(".prompt").fadeOut(2000);
        }
    }
    // 注册失去焦点事件
    $("#username").on("blur",function(){
        var  userInput = $(this).val();
        //判断输入的不符合规则
        if(userInput.match(email)==null || userInput==""){
            popUp("邮箱格式不正确");
        }else{
            $.ajax({
                type:"POST",
                url:"http://jiudin.duapp.com/IfNameBeUsed",
                data:{uname:$("#username").val()},
                dataType:"json",
                success:function(data){
                    if(data.result){
                        popUp(data.result);
                    }else{
                        popUp(data.error);
                    }
                }
            })
        }
    })
    // 密码失去焦点事件
    $("#password").on("blur",function(){
        var passInput = $(this).val();
        // 判断输入的不符合规则
        if(passInput.match(passW)==null || passInput==""){
            if($(".prompt").length){
                $(".prompt").html("密码格式错误").fadeIn("fast").fadeOut(2000);
            }else{
                var prompt = $("<div class='prompt'>密码格式错误</div>");
                $("body").append(prompt);
                $(".prompt").fadeOut(2000);
            }
        }
    })
    function register(){
        $.ajax({
            type:"POST",
            url:"/register",
            data:{uname:$('#username').val(),password:$('#password').val(),captcha:$('.yzm').val(),usertype:0},
            dataType:"json",
            success:function(data){
                if(data.result){
                    window.location.href="myaccount.html";
                }else{
                    popUp(data.error);
                }
            }
        })
    }
    $(".loginBtn").on("click",register);
    $(".captchaimg").on("click",function(){
        $(this).attr("src","/captcha.png?"+Math.random()*0xfffff);
    })
})