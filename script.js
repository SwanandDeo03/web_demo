// Product Database
const products = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        category: "smartphones",
        price: 999,
        description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system.",
        emoji: "📱"
    },
    {
        id: 2,
        name: "Samsung Galaxy S24",
        category: "smartphones",
        price: 899,
        description: "Premium Android smartphone with AI-powered features and stunning display.",
        emoji: "📱"
    },
    {
        id: 3,
        name: "MacBook Pro 16\"",
        category: "laptops",
        price: 2499,
        description: "Powerful laptop with M3 Max chip, perfect for professionals and creators.",
        emoji: "💻"
    },
    {
        id: 4,
        name: "Dell XPS 15",
        category: "laptops",
        price: 1799,
        description: "High-performance Windows laptop with stunning 4K OLED display.",
        emoji: "💻"
    },
    {
        id: 5,
        name: "Sony WH-1000XM5",
        category: "headphones",
        price: 399,
        description: "Industry-leading noise cancellation headphones with exceptional sound quality.",
        emoji: "🎧"
    },
    {
        id: 6,
        name: "AirPods Pro 2",
        category: "headphones",
        price: 249,
        description: "Premium wireless earbuds with active noise cancellation and spatial audio.",
        emoji: "🎧"
    },
    {
        id: 7,
        name: "Canon EOS R5",
        category: "cameras",
        price: 3899,
        description: "Professional mirrorless camera with 45MP sensor and 8K video recording.",
        emoji: "📷"
    },
    {
        id: 8,
        name: "Sony A7 IV",
        category: "cameras",
        price: 2499,
        description: "Full-frame mirrorless camera with 33MP sensor and advanced autofocus.",
        emoji: "📷"
    },
    {
        id: 9,
        name: "iPad Pro 12.9\"",
        category: "tablets",
        price: 1099,
        description: "Powerful tablet with M2 chip, perfect for creative professionals.",
        emoji: "📱"
    },
    {
        id: 10,
        name: "Samsung Galaxy Tab S9",
        category: "tablets",
        price: 899,
        description: "Premium Android tablet with S Pen and stunning AMOLED display.",
        emoji: "📱"
    },
    {
        id: 11,
        name: "Apple Watch Ultra 2",
        category: "smartwatches",
        price: 799,
        description: "Rugged smartwatch designed for athletes and outdoor adventures.",
        emoji: "⌚"
    },
    {
        id: 12,
        name: "Samsung Galaxy Watch 6",
        category: "smartwatches",
        price: 299,
        description: "Feature-rich smartwatch with health tracking and long battery life.",
        emoji: "⌚"
    },
    {
        id: 13,
        name: "Google Pixel 8 Pro",
        category: "smartphones",
        price: 999,
        description: "Flagship Android phone with exceptional camera and AI features.",
        emoji: "📱"
    },
    {
        id: 14,
        name: "HP Spectre x360",
        category: "laptops",
        price: 1299,
        description: "Convertible laptop with premium design and powerful performance.",
        emoji: "💻"
    },
    {
        id: 15,
        name: "Bose QuietComfort 45",
        category: "headphones",
        price: 329,
        description: "Comfortable over-ear headphones with excellent noise cancellation.",
        emoji: "🎧"
    },
    {
        id: 16,
        name: "Nikon Z9",
        category: "cameras",
        price: 5499,
        description: "Flagship mirrorless camera with 45MP sensor and pro-grade features.",
        emoji: "📷"
    }
];

// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    setupMobileMenu();
    
    // Load featured products on homepage
    if (document.getElementById('featured-products')) {
        displayFeaturedProducts();
    }
});

// Mobile Menu Toggle
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

// Update Cart Count
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElements.forEach(el => {
        if (el) el.textContent = totalItems;
    });
}

// Add to Cart
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            emoji: product.emoji,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show notification
    showNotification(`${product.name} added to cart!`);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// Update Cart Quantity
function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            displayCart();
        }
    }
}

// Display Featured Products
function displayFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    const featured = products.slice(0, 6);
    container.innerHTML = featured.map(product => createProductCard(product)).join('');
}

// Display All Products
function displayAllProducts() {
    const container = document.getElementById('products-grid');
    if (!container) return;

    const categoryFilter = document.getElementById('category-filter')?.value || 'all';
    let filteredProducts = products;

    if (categoryFilter !== 'all') {
        filteredProducts = products.filter(p => p.category === categoryFilter);
    }

    container.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

// Create Product Card HTML
function createProductCard(product) {
    return `
        <div class="product-card" onclick="viewProduct(${product.id})">
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toLocaleString()}</span>
                    <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

// View Product Detail
function viewProduct(productId) {
    localStorage.setItem('selectedProduct', productId);
    window.location.href = 'product-detail.html';
}

// Load Product Detail
function loadProductDetail() {
    const productId = parseInt(localStorage.getItem('selectedProduct'));
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        document.getElementById('product-detail-content').innerHTML = `
            <div style="text-align: center; padding: 4rem;">
                <h2>Product not found</h2>
                <a href="products.html" class="btn btn-primary">Back to Products</a>
            </div>
        `;
        return;
    }

    const container = document.getElementById('product-detail-content');
    container.innerHTML = `
        <div class="product-detail">
            <div class="product-detail-image">${product.emoji}</div>
            <div class="product-detail-info">
                <div class="product-detail-category">${product.category}</div>
                <h1>${product.name}</h1>
                <div class="product-detail-price">$${product.price.toLocaleString()}</div>
                <p class="product-detail-description">${product.description}</p>
                <div class="quantity-selector">
                    <button onclick="decreaseQuantity()">-</button>
                    <input type="number" id="product-quantity" value="1" min="1" onchange="updateQuantityInput()">
                    <button onclick="increaseQuantity()">+</button>
                </div>
                <button class="btn btn-primary" onclick="addToCart(${product.id}, parseInt(document.getElementById('product-quantity').value))">
                    Add to Cart
                </button>
            </div>
        </div>
    `;

    // Display related products
    displayRelatedProducts(product.category, product.id);
}

// Display Related Products
function displayRelatedProducts(category, currentProductId) {
    const container = document.getElementById('related-products');
    if (!container) return;

    const related = products
        .filter(p => p.category === category && p.id !== currentProductId)
        .slice(0, 4);

    if (related.length === 0) {
        container.parentElement.style.display = 'none';
        return;
    }

    container.innerHTML = related.map(product => createProductCard(product)).join('');
}

// Quantity Controls
let currentQuantity = 1;

function increaseQuantity() {
    const input = document.getElementById('product-quantity');
    if (input) {
        input.value = parseInt(input.value) + 1;
    }
}

function decreaseQuantity() {
    const input = document.getElementById('product-quantity');
    if (input && parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

function updateQuantityInput() {
    const input = document.getElementById('product-quantity');
    if (input && parseInt(input.value) < 1) {
        input.value = 1;
    }
}

// Filter Products
function filterProducts() {
    displayAllProducts();
}

// Sort Products
function sortProducts() {
    const sortValue = document.getElementById('sort-filter').value;
    const container = document.getElementById('products-grid');
    if (!container) return;

    let sortedProducts = [...products];
    const categoryFilter = document.getElementById('category-filter')?.value || 'all';
    
    if (categoryFilter !== 'all') {
        sortedProducts = sortedProducts.filter(p => p.category === categoryFilter);
    }

    switch (sortValue) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }

    container.innerHTML = sortedProducts.map(product => createProductCard(product)).join('');
}

// Filter by Category (from homepage)
function filterCategory(category) {
    localStorage.setItem('filterCategory', category);
    window.location.href = 'products.html';
}

// Display Cart
function displayCart() {
    const container = document.getElementById('cart-content');
    const summaryContainer = document.getElementById('cart-summary');
    
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h2>Your cart is empty</h2>
                <p>Add some products to get started!</p>
                <a href="products.html" class="btn btn-primary">Browse Products</a>
            </div>
        `;
        if (summaryContainer) summaryContainer.innerHTML = '';
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.emoji}</div>
            <div class="cart-item-info">
                <h3 class="cart-item-name">${item.name}</h3>
                <div class="cart-item-category">$${item.price.toLocaleString()} each</div>
                <div class="cart-item-controls">
                    <button class="btn btn-outline" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span style="font-weight: 600; min-width: 30px; text-align: center;">${item.quantity}</span>
                    <button class="btn btn-outline" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="btn btn-danger" onclick="removeFromCart(${item.id})" style="margin-left: 1rem;">Remove</button>
                </div>
            </div>
            <div class="cart-item-price">$${(item.price * item.quantity).toLocaleString()}</div>
        </div>
    `).join('');

    // Display summary
    if (summaryContainer) {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.1; // 10% tax
        const total = subtotal + tax;

        summaryContainer.innerHTML = `
            <h3>Order Summary</h3>
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>$${subtotal.toLocaleString()}</span>
            </div>
            <div class="summary-row">
                <span>Tax (10%):</span>
                <span>$${tax.toLocaleString()}</span>
            </div>
            <div class="summary-row total">
                <span>Total:</span>
                <span>$${total.toLocaleString()}</span>
            </div>
            <button class="btn btn-primary" style="width: 100%; margin-top: 1.5rem; padding: 15px;" onclick="checkout()">
                Proceed to Checkout
            </button>
        `;
    }
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.1;
    alert(`Thank you for your purchase!\n\nTotal: $${total.toLocaleString()}\n\nThis is a demo website. In a real application, you would be redirected to a payment gateway.`);
    
    // Clear cart after checkout
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// Show Notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: var(--secondary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Apply category filter when coming from homepage
window.addEventListener('DOMContentLoaded', function() {
    const filterCategory = localStorage.getItem('filterCategory');
    if (filterCategory && document.getElementById('category-filter')) {
        document.getElementById('category-filter').value = filterCategory;
        localStorage.removeItem('filterCategory');
        displayAllProducts();
    }
});

