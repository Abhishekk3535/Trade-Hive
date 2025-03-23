document.addEventListener("DOMContentLoaded", () => {
    loadSalesChart();
    loadProductTable();
    displayName();
});

const API_URL = "http://localhost:4000/api/auth/";

// Sales Chart
function loadSalesChart() {
    const ctx = document.getElementById("salesChart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May"],
            datasets: [{
                label: "Sales ($)",
                data: [1200, 1900, 3000, 5000, 2400],
                borderColor: "blue",
                borderWidth: 2,
                fill: false
            }]
        }
    });
}

// Product Table (Example Data)
function loadProductTable() {
    const products = [
        { name: "Smartphone", price: "$699", stock: 12 },
        { name: "Laptop", price: "$1299", stock: 5 },
        { name: "Headphones", price: "$199", stock: 20 }
    ];

    const tableBody = document.getElementById("productTable");
    tableBody.innerHTML = "";

    products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td><button onclick="deleteProduct('${product.name}')">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

//Display Name of Vendor
async function displayName() {
    const token = localStorage.getItem("token")
    if(!token) {
        alert("Login first....")
        window.location.href = "../Login-Signup/login.html"
        return
    }
    const res = await fetch(API_URL + "me" , {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
    const data = await res.json()
    if(res.ok){
        const userName = data.name.split(" ")[0]
        document.getElementById("vendorName").textContent = "Welcome "+ userName
    } else {
        alert(data.message)
    }
}

// Logout Function
function logout() {
    localStorage.removeItem("token");
    window.location.href = "../index.html";
}

// Delete Product 
function deleteProduct(name) {
    alert(`Deleted product: ${name}`);
}