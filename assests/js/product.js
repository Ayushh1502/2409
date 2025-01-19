let container = document.querySelector(".product-grid");
let allProducts = []; // Store all products
let filteredProducts = []; // Store filtered products based on user input

async function fetchProduct() {
    try {
        let res = await fetch("./assests/js/products.json");
        let data = await res.json();
        allProducts = data; // Store the original products list
        filteredProducts = [...allProducts]; // Start with all products as filtered
        display(filteredProducts);
        populateCategories(allProducts); // Populate categories dropdown
    } catch (err) {
        console.log(err);
    }
}


// Display function
function display(productsToDisplay) {
    container.innerHTML = ""; // Clear previous content

    // Loop through the data array and create product cards
    productsToDisplay.forEach(product => {
        const imageSrc = product.image || "https://via.placeholder.com/150"; // Placeholder image if missing
        const title = product.title || "Untitled Product";
        const description = product.description || "No description available";
        const price = product.price || "Price not available";
        const category = product.category || "Uncategorized";
        const rating = product.rating.rate || 0; // Rating from 1 to 5
        const ratingCount = product.rating.count || 0; // Number of ratings
        
        // Discount simulation (you can replace this with real discount data if available)
        const discountPrice = (price * 0.9).toFixed(2); // Assuming 10% discount

        // Limit description to 100 characters initially
        const shortDescription = description.length > 100 ? description.slice(0, 100) + "..." : description;

        let div = document.createElement("div");
        div.classList.add("product-card");
        div.innerHTML = `
            <img src="${imageSrc}" alt="${title}" />
            <h1>${title}</h1>
            <p class="description" data-full-description="${description}">${shortDescription} <span class="more-description" onclick="toggleDescription(this)">Read More</span></p>
            <div class="price-rating-container">
                <p class="price">$${discountPrice} <span class="discount">$${price}</span></p>
                <p class="rating">Rating: ${rating} (${ratingCount} reviews)</p>
            </div>
            <p class="category">Category: ${category}</p>
            <button onclick="addProduct('${title}', ${discountPrice}, '${imageSrc}')">Add to Cart</button>
        `;

        container.appendChild(div); // Append the div to the container
    });

    document.getElementById("pFooter").style.display = "block";
}

// Toggle the description on "Read More" click
function toggleDescription(button) {
    const paragraph = button.closest('p'); // Find the closest paragraph element
    const fullDescription = paragraph.getAttribute("data-full-description");
    
    // Check if the paragraph has the "Read More" text
    if (button.textContent === "Read More") {
        paragraph.innerHTML = `${fullDescription} <span class="less-description" onclick="toggleDescription(this)">Show Less</span>`;
    } else {
        const shortDescription = fullDescription.length > 100 ? fullDescription.slice(0, 100) + "..." : fullDescription;
        paragraph.innerHTML = `${shortDescription} <span class="more-description" onclick="toggleDescription(this)">Read More</span>`;
    }
}

// Populate categories dropdown
function populateCategories(data) {
    const categories = [...new Set(data.map(product => product.category))];
    let categoryFilter = document.getElementById("categoryFilter");
    categories.forEach(category => {
        let option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Search functionality
function searchProduct() {
    const searchTerm = document.getElementById("searchBar").value.toLowerCase();
    filteredProducts = allProducts.filter(product => product.title.toLowerCase().includes(searchTerm));
    applyFilters(); // Apply the filters after the search
}

// Filter by Category
function filterByCategory() {
    const category = document.getElementById("categoryFilter").value;
    filteredProducts = allProducts.filter(product => !category || product.category === category);
    applyFilters(); // Apply the filters after the category filter
}

// Sort by Price (Low to High or High to Low)
function sortByPrice() {
    const order = document.getElementById("priceFilter").value;
    if (order === "low-to-high") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (order === "high-to-low") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }
    applyFilters(); // Apply the filters after sorting
}

// Filter by Rating
function filterByRating() {
    const minRating = parseInt(document.getElementById("ratingFilter").value);
    filteredProducts = allProducts.filter(product => !minRating || product.rating.rate >= minRating);
    applyFilters(); // Apply the filters after rating filter
}

// Apply all filters and display the products
function applyFilters() {
    // After applying all filters, display the filtered list
    display(filteredProducts);
}

fetchProduct(); // Fetch and display products initially
