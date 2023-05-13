$(function () {
    // 歌曲播放功能
    function musicPlay() {
        var audio = $("#audio")[0];
        // 如果添加[0]，拿到的是标签(因为audio标签才有下面的播放暂停功能，不添加则拿到jQuery对象
        if (audio.paused) {
            audio.play();
            $("#playImg").attr("src", "./images/pause.png")
        } else {
            audio.pause();
            $("#playImg").attr("src", "./images/play-btn_03.png")
        }


        // 播放时间与总时间的显示
        // 定时器控制器
        var playTimer = null;
        playTimer = setInterval(function () {
            if (audio.paused) {
                clearInterval(playTimer);
            }
            // 获得当前正在播放时长
            var playTime_s = audio.currentTime;
            console.log(playTime_s);
            // 获取播放时间的分
            var mTime = parseInt(playTime_s / 60);
            // 秒
            var sTime = parseInt(playTime_s % 60);

            // 获取音乐总时长
            var totalTime = audio.duration;
            // 获取总时长的分
            var mTime_total = parseInt(totalTime / 60);
            // 获取总时长的秒
            var sTime_total = parseInt(totalTime % 60);

            function checkTime(m, s) {
                if (m < 10) {
                    m = "0" + m;
                } else {
                    m += "";
                }

                if (s < 10) {
                    s = "0" + s;
                } else {
                    s += "";
                }
                return m + ":" + s;
            }
            var pagePassTime = checkTime(mTime, sTime);
            var pageTotalTime = checkTime(mTime_total, sTime_total);

            $("#passTime").html(pagePassTime);
            $("#totalTime").html(pageTotalTime);

            // 进度条
            // 播放进度的百分比
            var playTimePercent = playTime_s / totalTime;
            if (totalTime - playTime_s > 0) {
                // 还有时间播放
                $(".progress-bar-passed").width(playTimePercent * 100 + "%")
            } else {
                // 已经播放完了
                $("progress-bar-passed").width(0 + "%");
            }
        }, 1000)
    }

    $("#playBtn").on("click", function () {
        musicPlay()
    })


    // 获取文章内容
    $.ajax({
        type: "get",
        url: "http://localhost:5504/blueberry_sever/page_yuezhang.php",
        success: function (data) {
            data = JSON.parse(data);
            console.log(data);
            // 文章乱码需要解码
            $(".blog-details-content").html(decodeURI(data.artical.artical_cont))
            $(".artical-title-h3").html(data.artical.artical_title)
            // for(let i in data.labels){
            //     console.log(data.labels[i]);
            $(".label1").html(data.labels[0])
            $(".label2").html(data.labels[1])
            $(".label3").html(data.labels[2])
            $(".eye-num").html(data.artical.eye_num)
            $(".wechat-num").html(data.artical.wei_chat_num)
            $(".current-date").html(data.artical.artical_create_time)
            // }
        }
    })


    // 获取乐章页面的数据(接口)
    // http://localhost:5504/blueberry_sever/page_yuezhang_read.php
    $.ajax({
        type: "get",
        url: "http://localhost:5504/blueberry_sever/page_yuezhang_read.php",
        success: function (data) {

            data = JSON.parse(data);
            console.log(data);
            $(data.readList).map(function(index,item) {
                console.log(item);
                // 所有双引号变单引号，换行，动态数据用双引号隔开，+连接
                $(".related-read-content").append("\
                <div class='related-read-content-show'><a href='#'>\
                  <img class='related-read-pic' src='"+item.img+"' alt=''>\
                  <p class='related-read-summary'>"+item.title+"</p>\
                </a></div>\
                ")
            })
        }
    })
})