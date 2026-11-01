<?php
include 'db.php';
$result = $conn->query("SELECT * FROM products");
$data = [];
while($row = $result->fetch_assoc()){
  $data[] = ["label" => $row['product_name'], "value" => $row['price']];
}
header('Content-Type: application/json');
echo json_encode($data);
?>