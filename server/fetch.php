<?php 
include("config.php");

$where_query = [];
$where_query_str = "";

if (isset($_GET['state']) && $_GET['state']!="null") {
  if (!empty($_GET['state'])) {
    $where_query[] = "state='" . $_GET['state'] . "'";
  }
}

if (isset($_GET['speciality']) && $_GET['speciality']!= "null") {
  if (!empty($_GET['speciality'])) {
    $where_query[] = "proffession='" . $_GET['speciality'] . "'";
  }
}


if (count($where_query)>0) {
  $where_query_str = implode(" AND " , $where_query);
  $where_query_str = " WHERE " . $where_query_str; 
}


$sql = "SELECT * FROM doctors " . $where_query_str;


$result = $conn->query($sql);
$data = array();

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    $data[] = $row;

  }
} else {
  //echo "0 results";
}
echo json_encode(array("data" => $data , "total" => $result->num_rows));
$conn->close();

?>