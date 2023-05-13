$(function(){
    $(".nav a").on("click",function(){
        $(this).addClass("on").siblings().removeClass("on")
    })
})