const product = 

async function addProduct() {
    const url = 'https://fakestoreapi.com/products'; // Replace with your API endpoint
    try {
        const response = await fetch(url, {
            method: 'POST', // Specify the request method
            headers: {
                'Content-Type': 'application/json', // Specify the content type
            },
            body: JSON.stringify(product), // Convert product object into JSON string
        });

        if (!response.ok) { // Check if the response is successful (status 2xx)
            throw new Error('Failed to add product');
        }

        const data = await response.json(); // Parse the JSON response
        console.log('Product added successfully:', data); // Handle the success response

    } catch (error) {
        console.error('Error:', error); // Handle errors (network issues, etc.)
    }
}

// Call the async function to add the product
addProduct();