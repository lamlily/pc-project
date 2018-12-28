<?php
    $id = isset($_GET['id'])? $_GET['id'] :"";
    $admin= isset($_GET['admin'])? $_GET['admin'] :"";
    $removecar= isset($_GET['removecar'])? $_GET['removecar'] :"";

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'sasa';

    // 1.创建连接,生成了conn对象
    $conn = new mysqli($servername, $username, $password, $dbname);
    // 2.0 查询前设置编码，防止输出乱码
    $conn->set_charset('utf8');
    //如果传了id执行删除符合条件的记录，如果只是传了admin则查询符合条件的记录
         if($id){
           $remove =" delete from car where id=".$id." and admin='".$admin."'";
           $_remove = $conn->query($remove);
           if($_remove){
            $cunzai = "SELECT * FROM car WHERE  admin='".$admin."'";
            $_cunzai = $conn->query($cunzai); 
            $cunzai = $_cunzai->fetch_all(MYSQL_ASSOC);
            echo json_encode($cunzai);
           }else{
            echo "false";
           }
        }else{
             $cunzai = "SELECT * FROM car WHERE  admin='".$admin."'";
            $_cunzai = $conn->query($cunzai); 
            $cunzai = $_cunzai->fetch_all(MYSQL_ASSOC);
            echo json_encode($cunzai);
        }
   
?>