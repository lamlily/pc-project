<?php
    $con = isset($_POST["con"])?$_POST["con"] : "";
    $fal = isset($_POST["fal"])? $_POST["fal"] : "";
    
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'sasa';
    //插入数据
    // 1.创建连接,生成了conn对象
    $conn = new mysqli($servername, $username, $password, $dbname);
    // 2.0 查询前设置编码，防止输出乱码
    $conn->set_charset('utf8');
    $sql = 'insert into register (username,password)
    values ("'.$fal.'","'.$con.'")';

    $res = $conn->query($sql);

    if($res){
        echo "true";
    }else{
        echo $conn->error;
    }
    $conn->close();
?>