const products = [
  {
    id: 1,
    title: "Classic Tailored Suit",
    price: 85000,
    image: "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?auto=format&fit=crop&q=80&w=400",
    category: "suits",
    featured: true
  },
  {
    id: 2,
    title: "Premium Cotton Shirt",
    price: 15000,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=400",
    category: "shirts",
    featured: true
  },
  {
    id: 3,
    title: "Minimalist Leather Jacket",
    price: 65000,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=400",
    category: "jackets",
    featured: true
  },
  {
    id: 4,
    title: "Slim Fit Chinos",
    price: 18000,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=400",
    category: "pants",
    featured: true
  },
  {
      id: 5,
      title: "Elegant Turtleneck",
      price: 12000,
      image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=400",
      category: "sweaters",
      featured: false
  },
  {
      id: 6,
      title: "Formal Oxford Shoes",
      price: 35000,
      image: "https://images.unsplash.com/photo-1614252339475-531eba835eb1?auto=format&fit=crop&q=80&w=400",
      category: "shoes",
      featured: false
  }
];

// formatting for Kazakhstan Tenge
const formatPrice = (price) => {
    return new Intl.NumberFormat('kk-KZ', { style: 'currency', currency: 'KZT', minimumFractionDigits: 0 }).format(price);
};

// Simple global cart array
let cart = JSON.parse(localStorage.getItem('elegance_cart')) || [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartUI();
    openCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('elegance_cart', JSON.stringify(cart));
}

function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function getCartCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

function updateCartUI() {
    const cartCountEl = document.querySelector('.cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPriceEl = document.getElementById('cart-total-price');
    
    if (cartCountEl) cartCountEl.textContent = getCartCount();
    
    if (cartItemsContainer) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
        } else {
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h4>${item.title}</h4>
                        <p>${formatPrice(item.price)} x ${item.quantity}</p>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash"></i></button>
                </div>
            `).join('');
        }
    }
    
    if (cartTotalPriceEl) {
        cartTotalPriceEl.textContent = formatPrice(getCartTotal());
    }
}

function openCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    if (sidebar && overlay) {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    }
}

function closeCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    if (sidebar && overlay) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }
}

// Render Featured Products
function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;
    
    const featured = products.filter(p => p.featured);
    container.innerHTML = featured.map(product => `
        <div class="product-card animate-on-scroll">
            <div class="product-img-wrapper">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
                <div class="product-overlay">
                    <button class="btn btn-primary" onclick="addToCart(${product.id})" data-i18n="btn_add_cart">Add to Cart</button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">${formatPrice(product.price)}</p>
            </div>
        </div>
    `).join('');
    
    if (typeof changeLanguage === 'function') {
        changeLanguage(localStorage.getItem('lang') || 'en');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    renderFeaturedProducts();
    
    // Cart Events
    const cartTrigger = document.getElementById('cart-trigger');
    const closeCartBtn = document.getElementById('close-cart');
    const cartOverlay = document.getElementById('cart-overlay');
    
    if (cartTrigger) cartTrigger.addEventListener('click', openCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
});
