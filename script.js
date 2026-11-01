// Sample 30 Orders Data - Brew & Bake
const salesData = [
  { product: "Spanish Latte", revenue: 3250 },
  { product: "Iced Latte", revenue: 3000 },
  { product: "Sourdough Bread", revenue: 2600 },
  { product: "Almond Croissant", revenue: 2200 },
  { product: "Cappuccino", revenue: 2100 },
  { product: "Caramel Macchiato", revenue: 2040 },
  { product: "Mocha", revenue: 1860 },
  { product: "Vanilla Latte", revenue: 1800 },
  { product: "Espresso", revenue: 1750 },
  { product: "Macarons Box (4pcs)", revenue: 1500 }
];

// Load cart from localStorage so it doesn't get lost, or start empty if none
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count badge on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});

function addToCart(name, price) {
  cart.push({ name, price });
  // Save to localStorage so state persists across actions/pages
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cartCountEl = document.getElementById("cartCount");
  if(cartCountEl){
    cartCountEl.innerText = cart.length;
  }
}

function closeCheckout() {
  const modal = document.getElementById("checkoutModal");
  if(modal) modal.style.display = "none";
}

function openCheckout() {
  const modal = document.getElementById("checkoutModal");
  if(modal) {
    modal.style.display = "block";
    
    // Check if cart is empty dynamically when opening the modal
    // Aapke HTML ke mutabiq error message wali line ko target karna hai
    const emptyMsgElement = modal.querySelector('div') || modal; // ya specific class/id dy dein
    
    if(cart.length === 0) {
      // Agar cart empty hai toh message show karein
      console.warn("Cart is empty!");
    }
  }
}

function submitOrder(e) {
  e.preventDefault();

  if(cart.length === 0) {
    alert("Your cart is currently empty! Please add items before ordering.");
    return;
  }

  let name = document.getElementById('custName').value;
  let phone = document.getElementById('custPhone').value;
  let location = document.getElementById('custLocation').value;
  let timing = document.getElementById('custTiming').value;

  if(name == "" || phone == ""){
    alert("Please fill Name and Phone");
    return;
  }

  let items = JSON.stringify(cart);
  let totalPrice = 0;
  cart.forEach(item => totalPrice += item.price);

  fetch('save-order.php', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      customer_name: name,
      phone: phone,
      location: location + " - " + timing,
      items: items,
      total: totalPrice
    })
  })
  .then(res => res.text())
  .then(data => {
    const successMsg = document.getElementById('orderSuccessMsg');
    if(successMsg) {
      successMsg.style.display = 'block';
      successMsg.innerHTML = "✅ Order Saved to SQL! Redirecting...";
    }
    
    // Clear cart after successful order
    cart = [];
    localStorage.removeItem('cart');
    updateCartCount();

    setTimeout(()=>{
      window.location.href = 'admin.php';
    }, 1500);
  })
  .catch(err => {
    console.error("Error saving order:", err);
  });
}

// Insights Logic
document.addEventListener("DOMContentLoaded", () => {
  const totalSales = 39550;
  const totalOrders = 30;
  const avgOrder = Math.round(totalSales / totalOrders);

  const kpiSales = document.getElementById("kpiSales");
  const kpiOrders = document.getElementById("kpiOrders");
  const kpiAvg = document.getElementById("kpiAvg");
  const barChart = document.getElementById("barChart");

  if(kpiSales) kpiSales.textContent = "Rs. " + totalSales.toLocaleString();
  if(kpiOrders) kpiOrders.textContent = totalOrders;
  if(kpiAvg) kpiAvg.textContent = "Rs. " + avgOrder;

  if(barChart) {
    barChart.innerHTML = "";
    const maxRevenue = Math.max(...salesData.map(d => d.revenue));
    
    salesData.forEach(item => {
      const percent = (item.revenue / maxRevenue) * 100;
      const row = document.createElement("div");
      row.className = "bar-row";
      row.innerHTML = `
        <span class="bar-label">${item.product}</span>
        <div class="bar-track"><span class="bar" style="width:${percent}%"></span></div>
        <span class="bar-value">Rs. ${item.revenue}</span>
      `;
      barChart.appendChild(row);
    });
  }
});