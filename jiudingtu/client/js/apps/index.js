/**
 * Created by Administrator on 2016/5/15.
 */
$(document).ready(function(){
    $.ajax({
        type:"POST",
        url:"/getUserinfo",
        data:null,
        dataType:"json",
        success:function(data){
            if("uname" in data){
                $(".myacc").html("我的账户");
                $(".LR").on("click",function(){
                    window.location.href="myaccount.html";
                })
            }else{
                $(".myacc").html("登录/注册");
                $(".LR").on("click",function(){
                    window.location.href="login.html";
                })
            }
        }
    })
})