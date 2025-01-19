const BASE_URL = "https://b41web003webwizards-production-bc76.up.railway.app";


const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector("#loginForm #email2").value;
  const password = document.querySelector("#loginForm #password2").value;

  if (!email || !password) {
    showNotification("Email and password are required!");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/users/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      showNotification("Login successful! Redirecting to dashboard...");
      window.location.href = "index.html";
    } else {
      const error = await response.json();
      showNotification(`Login failed: ${error.message}`);
    }
  } catch (err) {
    showNotification("An error occurred. Please try again later.");
    console.error(err);
  }
});

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#signupForm #name").value;
  const email = document.querySelector("#signupForm #email").value;
  const password = document.querySelector("#signupForm #password").value;
  const confirmPassword = document.querySelector("#signupForm #confirm-password").value;

  if (!name || !email || !password || !confirmPassword) {
    showNotification("All fields are required!");
    return;
  }

  if (password !== confirmPassword) {
    showNotification("Passwords do not match!");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/users/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      showNotification("Account created successfully! You can now sign in.");
      container.classList.remove("right-panel-active");
    } else {
      const error = await response.json();
      showNotification(`Signup failed: ${error.message}`);
    }
  } catch (err) {
    showNotification("An error occurred. Please try again later.");
    console.error(err);
  }
});


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