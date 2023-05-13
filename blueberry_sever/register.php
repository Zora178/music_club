<?php

    $username = $_POST["username"];
    $password = $_POST["password"];
// 链接数据库
    $con = mysqli_connect("localhost","root","121927abc","food_shop");
    if($con){
        mysqli_query($con,"set names utf8");
        $sql = "insert into shop_user values (null,'$username','$password')";
     // $result返回影响行数
     $result = mysqli_query($con,$sql);
     if($result > 0){
         echo json_encode(array("msg"=>"注册成功"));
     }else{
         echo json_encode(array("msg"=>"注册失败"));
     }
 }else{
     echo json_encode(array("msg"=>"数据库连接失败"));
 }


?>