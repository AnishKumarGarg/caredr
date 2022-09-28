<?php
error_reporting(0); 
include('config.php');
if (count($_POST)>0) {
    $name = $_POST["full_name"];
    $email = $_POST["e_mail"];
    $profession = $_POST["proffession"];
    $exp = $_POST["experience"];
    $state = $_POST["state"];
    $address = $_POST["address"];
    $fee = $_POST["fee"];
    $photo =  $_POST["photo"];
    $sql = "INSERT INTO doctors (full_name,e_mail,proffession,experience,state,address,fee,photo) VALUES ('$name', '$email','$profession','$exp','$state','$address','$fee','')";

    if ($conn->query($sql) === TRUE) {
        $ext = pathinfo($_FILES["dp"]["name"], PATHINFO_EXTENSION);
        $pic_name = $conn->insert_id . "_" .  uniqid() . "." . $ext;
        $pic_path = "../uploads/" . $pic_name;
        move_uploaded_file($_FILES["dp"]["tmp_name"], $pic_path) ;
        $conn->query("update doctors set photo='" . $pic_name . "' WHERE Id=" .$conn->insert_id ) ;
        header('Location: ../thankyou.html');
        exit();     
    } else {
    echo "Error: " . $sql . "<br>" . $conn->error;

   
    
} 
}