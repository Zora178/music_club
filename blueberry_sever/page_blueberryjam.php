<?php

    $page = $_GET["page"];
    if($page == 1){
        // 给前端发送数据
        $json_data = file_get_contents("./data/page_blueberryjam.json");
        echo $json_data;
    }else if( $page == 2){
        $json_data = file_get_contents("./data/page_blueberryjam2.json");
        echo $json_data;
    }else{
        // 请求失败的数据
        echo "请求失败";
    }

?>