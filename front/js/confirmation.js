const orderHTML = document.getElementById("orderId");
const orderId = localStorage.orderId;

orderHTML.innerHTML = orderId;
localStorage.clear();
