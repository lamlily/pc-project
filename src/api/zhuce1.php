<?php
    $Yname = isset($_POST["Yname"])? $_POST["Yname"] : " ";
    
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'sasa';
    // 1.创建连接,生成了conn对象
    $conn = new mysqli($servername, $username, $password, $dbname);
    // 2.0 查询前设置编码，防止输出乱码
    $conn->set_charset('utf8');

    $result = $conn->query('select * from register');

   //判断是否存在用户名

    $userlist = $result->fetch_all(MYSQLI_ASSOC);
    foreach ($userlist as  $item) {
         if($item['username']==$Yname){
            $res="true";
            break;
         }else{
            $res="flase";
         };
    }  
    echo $res;
    $conn->close();
?>