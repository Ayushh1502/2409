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

function addProduct(){
    showNotification("hello")
}