<?php
    $Yname =isset($_POST['Yname'])? $_POST['Yname']:"";
    $mima =isset($_POST['mima'])? $_POST['mima']:"";
    
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'sasa';
    
    // 1.创建连接,生成了conn对象
    $conn = new mysqli($servername, $username, $password, $dbname);
    // 2.0 查询前设置编码，防止输出乱码
    $conn->set_charset('utf8');
   
    // 查询注册表中是否有该用户名
   $sql = "select * from register where username='$Yname'";
    
    $result = $conn->query($sql);
    $content = $result->fetch_all(MYSQLI_ASSOC);
     // var_dump( count($content));数组长度count为0即无此用户
    if(count($content)==0){
        echo "false";
    }else{
        // 密码也匹配时即为该用户
        if($content[0]['password'] != $mima){
            echo "false";
        }else{
            // 返回用户名
            echo $Yname;
        }
    }
    



//遍历拿到的表，是否用户名和密码符合
    // $result = $conn->query('select * from register');
    
    // $userlist = $result->fetch_all(MYSQLI_ASSOC);

    // $_user=false;
    // foreach ($userlist as  $item) {

    //     if($item['username'] ==$user){

    //        echo $item['password']==$password?  "true" : "flase";
    //     }else {
    //         echo "false";

    //     }
    // }  




    // 4.拿到查询结果集数据，关闭查询结果集
    $result->close();
    //5.关闭与数据库的连接
    $conn->close();



?>