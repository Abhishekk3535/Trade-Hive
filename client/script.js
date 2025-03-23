const API_URL = "http://localhost:4000/api/auth/";

var swiper = new Swiper(".swiper-container", {
    loop: true,  // Infinite loop
    autoplay: { delay: 3000 }, // Auto-slide every 3 sec
    pagination: { el: ".swiper-pagination", clickable: true }, // Dots
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" } // Arrows
});


function loadPage(page){
    fetch(`infoPages/${page}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Page not found: ${page}`);
            }
            return response.text()
        })
        .then(data => {
            document.getElementById("Index-Container").innerHTML = data
        })
        .catch(error => console.log("Error loading page:", error))
}


function getStarted() {
    const token = localStorage.getItem("token"); // Get token

    if(!token) {
        window.location.href = "Login-Signup/login.html"
        return
    } else {
        window.location.href = "dashboard/dashboard.html"
        return
    }
}