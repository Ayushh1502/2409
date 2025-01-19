// let loginForm = document.querySelector('.login-form');

// document.querySelector('#login-btn').onclick = () =>{
//     loginForm.classList.toggle('active');
//     navbar.classList.remove('active');
// }

// let navbar = document.querySelector('.navbar');

// document.querySelector('#menu-btn').onclick = () =>{
//     navbar.classList.toggle('active');
//     loginForm.classList.remove('active');
// }

// window.onscroll = () =>{
//     loginForm.classList.remove('active');
//     navbar.classList.remove('active');
// }


let login= document.getElementById("start");
login.addEventListener("click", ()=> {
    window.location="login.html";
})

let token = localStorage.getItem("token")
let userName = document.getElementById("loggedIn")

if(token){
    login.style.display = "none"

    const user = localStorage.getItem("user")

    const parsedUser = JSON.parse(user); // Parse the stored user data
    const username = parsedUser.name; // Access the user's name
    userName.textContent = `Welcome, ${username}! It's great to have you here! 🎉`;
    console.log(username)
    userName.style.display = "block"
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // Style the notification
    notification.style.position = 'fixed';
    notification.style.top = '100px'; // Below the header
    notification.style.left = '50%'; // Center horizontally
    notification.style.transform = 'translateX(-50%)'; // Adjust for centering
    notification.style.backgroundColor = '#4CAF50';
    notification.style.color = 'white';
    notification.style.padding = '15px';
    notification.style.zIndex = '1000';
    notification.style.borderRadius = '5px';
    notification.style.fontSize = '18px'; // Increased font size
    notification.style.opacity = '0'; // Start hidden
    notification.style.transition = 'opacity 0.5s ease'; // Animation for fade-in/out
    
    // Append to body
    document.body.appendChild(notification);

    // Trigger the fade-in effect
    setTimeout(() => {
        notification.style.opacity = '1'; // Fade in
    }, 10);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0'; // Fade out
        setTimeout(() => {
            notification.remove(); // Remove after fade out
        }, 500); // Match this duration with the transition duration
    }, 3000);
}

// Example usage
// showNotification('This is a reusable notification!');
