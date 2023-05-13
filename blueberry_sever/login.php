<?php

    $username = $_POST["username"];
    $password = $_POST["password"];
// 链接数据库
    $con = mysqli_connect("localhost","root","121927abc","food_shop");
    if($con){
        mysqli_query($con,"set names utf8");
        $sql = "select * from shop_user where username='$username' and password='$password'";
        $result = mysqli_query($con,$sql);
        if($result -> num_rows >0){
            $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
            echo json_encode($data);
        }else{
            echo json_encode(array("msg" => "用户名密码不存在"));
        }
    }else{
        // 给前端（界面）返回一个JSON格式的数据
        echo json_encode(array("msg"=>"数据库连接失败"));
    }

?>