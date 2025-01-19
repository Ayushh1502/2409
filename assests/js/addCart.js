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





// Function to add a product to local storage
// Function to add a product to local storage
function addProduct(productName, productPrice, productImage) {
    // Get the existing cart from local storage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product already exists in the cart
    const existingProduct = cart.find(product => product.name === productName);

    if (existingProduct) {
        // If the product exists, increase the quantity
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
        // If the product doesn't exist, create a new product object
        const product = {
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1 // Initialize quantity to 1
        };

        // Add the new product to the cart
        cart.push(product);
    }

    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    showNotification(`${productName} has been added to your cart!`);
}

let totalAmount = 0;

// Function to display the cart contents on the cart page
function displayCart() {
    const cartItemContainer = document.getElementById('cartItem');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemContainer.innerHTML = ''; // Clear the cart content

    if (cart.length === 0) {
        
        cartItemContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartItemContainer.classList.add('empty'); // Add the empty class
        const subtotalElement = document.getElementById('subtotal');
        subtotalElement.textContent = `$0`;
        return;
    }

   

    cart.forEach((product, index) => {
        product.quantity = Number(product.quantity) || 1;
        const totalPrice = product.price * product.quantity;
        totalAmount += totalPrice;

        // Truncate the product title if it's too long (e.g., max 30 characters)
        const truncatedTitle = product.name.length > 30 ? product.name.substring(0, 30) + '...' : product.name;

        const productDiv = document.createElement('div');
        productDiv.classList.add('cart-item-box');

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" />
            <div class="product-details">
                <h3 class="product-name">${truncatedTitle}</h3> <!-- Display truncated title -->
                <p class="product-quantity">Quantity: ${product.quantity}</p>
                <p class="product-total-price">Total Price: $${totalPrice.toFixed(2)}</p>
            </div>
            <button class="remove-button" onclick="removeFromCart(${index})">Remove</button>
        `;

        cartItemContainer.appendChild(productDiv);
    });

    // Update subtotal in the summary
    const subtotalElement = document.getElementById('subtotal');
    if (subtotalElement) {
        subtotalElement.textContent = `$${totalAmount.toFixed(2)}`;
    }
}

document.getElementById("purchase").addEventListener("click",()=>{

    if(totalAmount !== 0){
        showNotification("Purchase Successful! Thank you for your order.")

        setTimeout(()=>{

            window.location.href = "./productpage1.html"
            localStorage.removeItem("cart");

        },2500)
    }
    else{
        showNotification("There's nothing in your cart yet. Take a look at our latest items!")
    }
})





// Function to remove a product from the cart
function removeFromCart(index) {
    // Retrieve the cart from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart[index].quantity > 1) {
        // Decrease the quantity by 1 if there's more than one item
        cart[index].quantity -= 1;
    } else {
        // Remove the product entirely if the quantity is 1
        cart.splice(index, 1);
    }

    // Update the cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Re-render the cart
    displayCart();
}


document.addEventListener('DOMContentLoaded', () => {
    displayCart(); // Call displayCart after DOM is fully loaded
});
      // Retrieve product details from localStorage
    //   const cartItem = JSON.parse(localStorage.getItem('cartItem'));

    //   if (cartItem) {
    //     // Extract numeric value from price string
    //     const unitPrice = parseFloat(cartItem.price.replace(/[^0-9.-]+/g, ''));
    //     const totalPrice = (unitPrice * cartItem.quantity).toFixed(2);

    //     // Inject product details into the cart item box
    //     document.getElementById('cartItem').innerHTML = `
    //             <div>
    //                 <div class="cart-item-title">${cartItem.title}</div>
    //                 <div class="cart-item-prices">
    //                     <span class="original-price">${cartItem.offerPrice}</span>
    //                     <span class="discounted-price">US $${totalPrice}</span>
    //                     <span class="discount-percentage">(15% Off)</span>
    //                     <div>Quantity: ${cartItem.quantity}</div>
    //                 </div>
    //             </div>
    //         `;

    //     // Update summary details
    //     document.getElementById('itemPrice').innerText = `US $${totalPrice}`;
    //     document.getElementById('subtotal').innerText = `US $${totalPrice}`;
    //   }

    //   function removeCartItem() {
    //     localStorage.removeItem('cartItem');
    //     document.getElementById('cartItem').innerHTML = '';
    //     document.getElementById('itemPrice').innerText = '$0.00';
    //     document.getElementById('subtotal').innerText = '$0.00';
    //   }

    //   function goToCheckout() {
    //     // Redirect to checkout page
    //     window.location.href = 'checkout.html';
    //   }