$(function(){


    var btns = $(".login-reg-select a");
    var boxs = $(".account-box");

    btns.map(function(index,element){
        (function(){
            $(element).on("click",function(){
                $(this).addClass("on").siblings().removeClass("on")
                $(boxs[index]).addClass("on").siblings().removeClass("on")
            })
        }(index))
    })


     // 登录
     $("#login_btn").click(function () {
        // 获取用户名和密码
        var username = $("#login_account").val();
        var password = $("#login_pwd").val();
        if (username && password) {
            $.ajax({
                type: "post",
                url: "http://localhost:5504/blueberry_sever/login.php",
                data: {
                    username: username,
                    password: password
                },
                success: function (data) {
                    data = JSON.parse(data)
                    // 存储到本地
                    localStorage.setItem("username", data[0].username)
                    if (data) {
                        // 跳回到首页，显示登录信息
                        window.location.href = "index.html"
                    }
                }
            })
        } else {
            alert("请输入用户名和密码")
        }
    })

    // 注册

    $("#reg-btn").click(function () {
        // 获取用户名和密码
        var username = $("#reg_account").val();
        var password = $("#reg_pwd").val();
        console.log(username,password);
        $.ajax({
            type:"post",
            url:"http://localhost:5504/blueberry_sever/register.php",
            data:{
                username:username,
                password:password
            },
            success:function(data){
                data = JSON.parse(data)
                alert(data.msg)
            }   
        })
    })

})