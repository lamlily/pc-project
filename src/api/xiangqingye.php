<?php
    $id = isset($_GET["id"])? $_GET["id"] : " ";
    
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'sasa';
    // 1.创建连接,生成了conn对象
    $conn = new mysqli($servername, $username, $password, $dbname);
    // 2.0 查询前设置编码，防止输出乱码
    $conn->set_charset('utf8');

    $result = $conn->query('select * from details where id='. $id );
    $res = $result->fetch_all(MYSQL_ASSOC);

    echo json_encode($res);
    $conn->close();
?>