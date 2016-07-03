/**
 * Created by Administrator on 2016/5/15.
 */

$(document).ready(function(){
    function popUp(content){
        if($(".prompt").length){  // 判断该节点是否存在，注意JQ要加上length
            $(".prompt").html(content).fadeIn("fast").fadeOut(2000);
        }else{
            var prompt = $("<div class='prompt'></div>").html(content);
            $("body").append(prompt);
            $(".prompt").fadeOut(2000);
        }
    }
    $(".loginBtn").on("click",function(){
        $.ajax({
            type:"POST",
            url:"/ilogin",
            data:{uname:$("#username").val(),password:$("#password").val(),captcha:$(".yzm").val()},
            dataType:"json",
            success:function(data){
                if(data.result){
                    localStorage.setItem("keyName",$("#username").val());
                    window.location.href="myaccount.html";
                }else{
                    popUp(data.error);
                }
            }
        })
    })
    $(".captchaimg").on("click",function(){
        $(this).attr("src","/captcha.png?"+Math.random()*0xfffff);
    })
})