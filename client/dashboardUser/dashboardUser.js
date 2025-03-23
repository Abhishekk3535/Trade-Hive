
document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    displayName()
});

const API_URL = "http://localhost:4000/api/auth/";

const products = [
    { name: "Smartphone", image: "https://static.vecteezy.com/system/resources/previews/007/017/841/non_2x/new-realistic-mobile-smart-phone-modern-style-smartphone-with-ui-icons-isolated-on-white-background-vector.jpg", rating: 5, seller: "Abhishek Kumar Singh", category: "Electronics" },
    { name: "Running Shoes", image: "https://s3.amazonaws.com/www.irunfar.com/wp-content/uploads/2024/07/25053122/Best-Trail-Running-Shoes-Hoka-Speedgoat-6.jpg", rating: 4, seller: "Demo2", category: "Footwear" },
    { name: "Wrist Watch", image: "https://images-cdn.ubuy.co.in/66146c21a6202f048b3b85c3-infantry-dual-time-analog-digital-wrist.jpg", rating: 3, seller: "Prince Watch", category: "Accessories" },
    { name: "Laptop", image: "https://b2c-contenthub.com/wp-content/uploads/2024/08/Framework-Laptop-13-Core-Ultra-1-open.jpg?quality=50&strip=all", rating: 5, seller: "Abhishek Kumar Singh", category: "Electronics" },
    { name: "Backpack", image: "https://assets.ajio.com/medias/sys_master/root/20240527/8vV5/665460f016fd2c6e6a2b1ea1/-473Wx593H-4932453870-multi-MODEL.jpg", rating: 4, seller: "Ashutosh Raj", category: "Bags" },
    { name: "Speaker", image: "https://mobilla.in/cdn/shop/collections/Mrock_101-1_533x.jpg?v=1702109941", rating: 4, seller: "Abhishek Kumar Singh", category: "Electronics" },
    { name: "Earbuds", image: "https://m.media-amazon.com/images/I/51pycg0MGxL.jpg", rating: 4, seller: "Abhishek Kumar Singh", category: "Electronics" },
    { name: "Shoes", image: "https://m.media-amazon.com/images/I/614aiM56siL._AC_UY1000_.jpg", rating: 4, seller: "Demo2", category: "Footwear" },
    { name: "phone case", image: "https://5.imimg.com/data5/KR/WT/MY-40853438/iphone-case-500x500.jpg", rating: 2, seller: "Abhishek Kumar Singh", category: "Cover" },
    { name: "Bottle", image: "https://pexpo.in/cdn/shop/files/genroblue_2.jpg?v=1696955033&width=1946", rating: 4, seller: "Ashutosh Raj", category: "utencils" },

    { name: "Non-Stick Frying Pan", image: "https://m.media-amazon.com/images/I/71JoN9G2IsL.jpg", rating: 5, seller: "Ashutosh Raj", category: "Utensils" },
    { name: "Ceramic Dinner Set", image: "https://ushashriram.in/cdn/shop/products/71TQJJFGksL.jpg?v=1685735961", rating: 5, seller: "Ashutosh Raj", category: "Utensils" },
    { name: "Leather Wallet", image: "https://m.media-amazon.com/images/I/61b4hD2xV8S.jpg", rating: 4, seller: "Prince Watch", category: "Accessories" },
    { name: "Wireless Earbuds", image: "https://m.media-amazon.com/images/I/51pycg0MGxL.jpg", rating: 4, seller: "Abhishek Kumar Singh", category: "Electronics" },
    { name: "Smart TV", image: "https://www.intex.in/cdn/shop/products/1_9b8014ad-124e-4742-a628-9a4c4affe617.jpg?v=1648711109", rating: 5, seller: "Abhishek Kumar Singh", category: "Electronics" },
    { name: "Casual Sneakers", image: "https://stylestryproductionwls47sou4z.cdn.e2enetworks.net/images/products/medium/af4019b895554cfcaa3399a7ad02e5a090a2143e.webp", rating: 4, seller: "Demo2", category: "Footwear" },
    { name: "Formal Shoes", image: "https://alonzoshoes.in/cdn/shop/files/DSC_0712-PhotoRoom_1.jpg?v=1703764708", rating: 5, seller: "Demo2", category: "Footwear" },
];

function loadProducts() {
    const productGrid = document.getElementById("productGrid");
    const categoryFilter = document.getElementById("categoryFilter");

    productGrid.innerHTML = "";

    const categories = new Set();
    products.forEach(product => {
        categories.add(product.category);
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <div class="rating">${"⭐".repeat(product.rating)}</div>
                <div class="seller">Seller: ${product.seller}</div>
                <div class="category">Category: ${product.category}</div>
            </div>
        `;
        productGrid.innerHTML += productCard;
    });

    categoryFilter.innerHTML = '<option value="">All Categories</option>';
    categories.forEach(category => {
        categoryFilter.innerHTML += `<option value="${category}">${category}</option>`;
    });
}

function filterProducts() {
    const searchQuery = document.getElementById("searchInput").value.toLowerCase();
    const selectedCategory = document.getElementById("categoryFilter").value;
    const selectedRating = document.getElementById("ratingFilter").value;

    const productGrid = document.getElementById("productGrid");
    productGrid.innerHTML = "";

    products
        .filter(product => 
            product.name.toLowerCase().includes(searchQuery) &&
            (selectedCategory === "" || product.category === selectedCategory) &&
            (selectedRating === "" || product.rating == selectedRating)
        )
        .forEach(product => {
            const productCard = `<div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <div class="rating">${"⭐".repeat(product.rating)}</div>
                <div class="seller">Seller: ${product.seller}</div>
                <div class="category">Category: ${product.category}</div>
            </div>`;
            productGrid.innerHTML += productCard;
        });
}

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
        document.getElementById("userName").textContent = "Welcome "+ userName
    } else {
        alert(data.message)
    }
}

function showSection(section) {
    document.getElementById("dashboardSection").style.display = section === "dashboard" ? "block" : "none";
    document.getElementById("profileSection").style.display = section === "profile" ? "block" : "none";
}


function logout() {
    alert("Logging out...");
    localStorage.removeItem("token");
    window.location.href = "../index.html";
}
function saveProfile() {
    alert("Profile updated successfully!");
}