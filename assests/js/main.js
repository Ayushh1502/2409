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
