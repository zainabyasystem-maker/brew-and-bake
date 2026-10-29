document.addEventListener("DOMContentLoaded", function () {
  // 1. Dataset: 30 Orders Sales Breakdown (Coffee & Bakery Items)
  const productSales = [
    { label: "Spanish Latte", value: 4550 },
    { label: "Iced Latte", value: 4200 },
    { label: "Sourdough Bread", value: 3900 },
    { label: "Cappuccino", value: 3850 },
    { label: "Almond Croissant", value: 3300 },
    { label: "Blueberry Muffin", value: 2800 },
    { label: "Caramel Macchiato", value: 2720 },
    { label: "Espresso", value: 2250 },
    { label: "Chocolate Brownie", value: 2100 },
    { label: "Cheese Danish", value: 1920 },
    { label: "Mocha", value: 1860 },
    { label: "Butter Croissant", value: 1800 },
    { label: "Iced Americano", value: 1440 },
    { label: "Cold Brew", value: 1500 },
    { label: "Chocolate Croissant", value: 1500 },
    { label: "Garlic Loaf", value: 1000 }
  ];

  const totalOrdersCount = 30; // Total 30 Orders analyzed

  // 2. Calculate Total Revenue
  let totalSales = 0;
  productSales.forEach(function (item) {
    totalSales += item.value;
  });

  // 3. Update KPI Number Cards
  const kpiSalesEl = document.getElementById("kpiSales");
  const kpiOrdersEl = document.getElementById("kpiOrders");
  const kpiAvgEl = document.getElementById("kpiAvg");

  if (kpiSalesEl) kpiSalesEl.textContent = totalSales.toLocaleString();
  if (kpiOrdersEl) kpiOrdersEl.textContent = totalOrdersCount;
  if (kpiAvgEl) {
    const avg = Math.round(totalSales / totalOrdersCount);
    kpiAvgEl.textContent = avg.toLocaleString();
  }

  // 4. Find Maximum Item Sales for Bar Width Scaling
  let maxValue = 0;
  productSales.forEach(function (item) {
    if (item.value > maxValue) {
      maxValue = item.value;
    }
  });

  // 5. Render Bar Chart Dynamically
  const chartContainer = document.getElementById("barChart");

  if (chartContainer) {
    chartContainer.innerHTML = ""; // Clear existing placeholder content

    productSales.forEach(function (item) {
      const row = document.createElement("div");
      row.className = "bar-row";

      const label = document.createElement("span");
      label.className = "bar-label";
      label.textContent = item.label;

      const track = document.createElement("span");
      track.className = "bar-track";

      const bar = document.createElement("span");
      bar.className = "bar";
      
      // Calculate width percentage based on max value
      const percentage = (item.value / maxValue) * 100;
      bar.style.width = percentage + "%";

      track.appendChild(bar);

      const value = document.createElement("span");
      value.className = "bar-value";
      value.textContent = "Rs " + item.value.toLocaleString();

      row.append(label, track, value);
      chartContainer.appendChild(row);
    });
  }
});
// Checkout Modal Functions
function openCheckout() {
  const modal = document.getElementById("checkoutModal");
  if (modal) modal.style.display = "block";
}

function closeCheckout() {
  const modal = document.getElementById("checkoutModal");
  if (modal) modal.style.display = "none";
}

function submitOrder(event) {
  event.preventDefault();
  const phone = document.getElementById("custPhone").value;
  const location = document.getElementById("custLocation").value;
  const timing = document.getElementById("custTiming").value;

  const successMsg = document.getElementById("orderSuccessMsg");
  successMsg.style.display = "block";
  successMsg.innerHTML = `🎉 Thank you! Your order has been placed successfully.<br>
    📞 Phone: ${phone}<br>
    📍 Location: ${location}<br>
    ⏰ Timing: ${timing}<br>
    <i>Our rider is heading to your dining spot! Enjoy your Brew & Bake treat.</i>`;

  setTimeout(function() {
    closeCheckout();
    successMsg.style.display = "none";
  }, 5000);
}
// 30 items ka data aur Add to Cart functionality
const menuItems = [
  { name: "Spanish Latte", category: "BEVERAGE", price: "Rs. 4,550", desc: "Specialty hot coffee" },
  { name: "Iced Latte", category: "BEVERAGE", price: "Rs. 4,200", desc: "Cold refreshing coffee" },
  { name: "Sourdough Bread", category: "BAKERY", price: "Rs. 3,900", desc: "Freshly baked artisan bread" },
  { name: "Cappuccino", category: "BEVERAGE", price: "Rs. 3,850", desc: "Classic frothy coffee" },
  { name: "Almond Croissant", category: "BAKERY", price: "Rs. 3,300", desc: "Flaky and buttery" },
  { name: "Blueberry Muffin", category: "BAKERY", price: "Rs. 2,800", desc: "Sweet and fruity" }
];

const menuContainer = document.getElementById("menu-container");

if (menuContainer) {
  menuItems.forEach(function(item) {
    const card = document.createElement("div");
    card.className = "menu-card";
    
    card.innerHTML = `
      <span class="category">${item.category}</span>
      <h3>${item.name}</h3>
      <p class="price">${item.price}</p>
      <div class="cart-section">
        <span class="item-desc">${item.desc}</span>
        <button class="add-to-cart-btn" onclick="alert('${item.name} added to cart!')">Add to Cart</button>
      </div>
    `;
    
    menuContainer.appendChild(card);
  });
}
// Global Cart Array
let cart = [];

// Add to Cart Function
function addToCart(name, price) {
  cart.push({ name: name, price: price });
  updateCartUI();
}

// Update Cart Box on Screen
function updateCartUI() {
  let cartBox = document.getElementById("cart-floating-box");
  
  if (!cartBox) {
    cartBox = document.createElement("div");
    cartBox.id = "cart-floating-box";
    cartBox.style.cssText = "position: fixed; right: 20px; bottom: 20px; background: #1e1e1e; border: 2px solid #ff9f1a; padding: 15px; border-radius: 10px; color: #fff; z-index: 9999; width: 280px; box-shadow: 0 5px 15px rgba(0,0,0,0.6);";
    document.body.appendChild(cartBox);
  }

  let total = 0;
  let itemsList = "";
  
  cart.forEach((item) => {
    total += item.price;
    itemsList += `<div style="display:flex; justify-space-between; font-size:0.85rem; margin:4px 0;">
      <span>${item.name}</span>
      <span>Rs. ${item.price}</span>
    </div>`;
  });

  cartBox.innerHTML = `
    <h3 style="margin:0 0 10px 0; color:#ff9f1a; font-size:1.1rem;">🛒 Your Cart (${cart.length})</h3>
    <div style="max-height:120px; overflow-y:auto; margin-bottom:10px;">${itemsList}</div>
    <hr style="border-color:#333; margin:8px 0;">
    <div style="display:flex; justify-content:space-between; font-weight:bold; margin-bottom:10px;">
      <span>Total:</span>
      <span style="color:#ff9f1a;">Rs. ${total}</span>
    </div>
    <button onclick="openCheckout()" style="width:100%; background:#ff9f1a; color:#121212; border:none; padding:8px; border-radius:5px; font-weight:bold; cursor:pointer;">Proceed to Order / Dining</button>
  `;
}

// Open Checkout Modal
function openCheckout() {
  const modal = document.getElementById("checkoutModal");
  if (modal) {
    modal.style.display = "block";
  }
}

// Close Checkout Modal
function closeCheckout() {
  const modal = document.getElementById("checkoutModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// Submit Order Form Function
function submitOrder(event) {
  event.preventDefault();
  const phone = document.getElementById("custPhone").value;
  const location = document.getElementById("custLocation").value;
  const timing = document.getElementById("custTiming").value;
  const successMsg = document.getElementById("orderSuccessMsg");

  if (successMsg) {
    successMsg.style.display = "block";
    successMsg.innerHTML = `🎉 Order Confirmed!<br>📞 Phone: ${phone}<br>📍 Location/Dining: ${location}<br>⏰ Timing: ${timing}`;
  }

  cart = [];
  setTimeout(() => {
    updateCartUI();
    closeCheckout();
    if(successMsg) successMsg.style.display = "none";
  }, 4000);
}