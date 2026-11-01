<?php include 'db.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Brew & Bake - Admin</title>
<style>
body{font-family: Segoe UI; background:#fdf6ee; margin:0; padding:30px;}
h2{color:#4e342e; margin-bottom:10px;}
.top{display:flex; gap:10px; margin-bottom:20px;}
.btn{background:#4e342e; color:white; padding:10px 18px; border-radius:25px; text-decoration:none; font-size:14px;}
.btn-orange{background:#ff9800;}
.card{background:white; border-radius:18px; padding:25px; box-shadow:0 10px 30px rgba(0,0,0,0.08);}
table{width:100%; border-collapse:collapse;}
th{background:#ff9800; color:white; padding:14px; text-align:left;}
td{padding:14px; border-bottom:1px solid #f0e6d8;}
tr:hover{background:#fff5e6;}
.total{font-weight:bold; color:#e65100;}
.empty{text-align:center; padding:20px; color:#999;}
</style>
</head>
<body>

<h2>☕ Brew & Bake - SQL Orders</h2>
<div class="top">
<a class="btn" href="index.html">← Back to Website</a>
<a class="btn btn-orange" href="admin.php">↻ Refresh</a>
</div>

<div class="card">
<table>
<tr>
<th>ID</th>
<th>Customer Name</th>
<th>Phone</th>
<th>Location</th>
<th>Items</th>
<th>Total</th>
</tr>
<?php
$result = $conn->query("SELECT * FROM customer_orders ORDER BY id DESC");
if($result && $result->num_rows > 0){
  while($row = $result->fetch_assoc()){
    echo "<tr>";
    echo "<td>" . $row['id'] . "</td>";
    echo "<td>" . htmlspecialchars($row['customer_name']) . "</td>";
    echo "<td>" . htmlspecialchars($row['phone']) . "</td>";
    echo "<td>" . htmlspecialchars($row['location']) . "</td>";
    
    // Clean formatted items list from JSON
    echo "<td>";
    $decodedItems = json_decode($row['items'], true);
    if (is_array($decodedItems)) {
        foreach ($decodedItems as $it) {
            echo htmlspecialchars($it['name']) . " (Rs. " . htmlspecialchars($it['price']) . ")<br>";
        }
    } else {
        echo htmlspecialchars($row['items']);
    }
    echo "</td>";
    
    echo "<td class='total'>Rs. " . $row['total'] . "</td>";
    echo "</tr>";
  }
} else {
  echo "<tr><td colspan='6' class='empty'>No orders yet. Place an order from website.</td></tr>";
}
?>
</table>
</div>

</body>
</html>