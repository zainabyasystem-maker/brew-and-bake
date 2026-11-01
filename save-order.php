<?php
include 'db.php';
error_reporting(0);

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if($data){
    $name = $data['customer_name'] ?? $data['customer'] ?? 'Test';
    $phone = $data['phone'] ?? '000';
    $location = $data['location'] ?? 'Multan';
    $items = is_array($data['items'] ?? '') ? json_encode($data['items']) : ($data['items'] ?? '[]');
    $total = $data['total'] ?? 0;

    $stmt = $conn->prepare("INSERT INTO customer_orders (customer_name, phone, location, items, total) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $phone, $location, $items, $total);
    $stmt->execute();
    echo "Order Saved";
} else {
    // direct kholne pe test ke liye
    $conn->query("INSERT INTO customer_orders (customer_name, phone, location, items, total) VALUES ('Test User', '0300', 'Multan', 'Coffee', '500')");
    echo "Test Order Saved - Now check admin.php";
}
?>