// ========================================
// DATA STORAGE - Fixed prices + status
// ========================================

let foodDonations = [
    {
        id: 1,
        foodName: "Vegetable Biryani",
        quantity: 50,
        pickupTime: "18:00",
        location: "Green Leaf Restaurant, MG Road",
        imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500",
        status: "available",
        price: 130,
        timestamp: new Date('2024-02-13T17:30:00')
    },
    {
        id: 2,
        foodName: "Mixed Sandwiches",
        quantity: 30,
        pickupTime: "19:30",
        location: "Sunrise Cafe, Park Street",
        imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500",
        status: "available",
        price: 60,
        timestamp: new Date('2024-02-13T18:00:00')
    },
    {
        id: 3,
        foodName: "Fresh Salad",
        quantity: 20,
        pickupTime: "17:00",
        location: "Healthy Bites, Central Plaza",
        imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
        status: "unavailable",
        price: 90,
        timestamp: new Date('2024-02-13T16:00:00')
    },
    {
        id: 4,
        foodName: "Paneer Tikka Masala",
        quantity: 40,
        pickupTime: "20:00",
        location: "Spice Garden, Kalamassery",
        imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500",
        status: "available",
        price: 100,
        timestamp: new Date('2024-02-13T18:30:00')
    },
    {
        id: 5,
        foodName: "Puttu & Kadala",
        quantity: 25,
        pickupTime: "11:30",
        location: "Alakapuri, Kaloor",
        imageUrl: "https://i.pinimg.com/736x/16/08/96/160896173c78aceb6b806d119a82a8e6.jpg",
        status: "unavailable",
        price: 50,
        timestamp: new Date('2024-02-13T10:00:00')
    },
    {
        id: 6,
        foodName: "Dal and Rice Combo",
        quantity: 60,
        pickupTime: "19:00",
        location: "Campus Canteen, Jain University",
        imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500",
        status: "available",
        price: 80,
        timestamp: new Date('2024-02-13T17:45:00')
    },
    {
        id: 7,
        foodName: "Chicken Biriyani",
        quantity: 30,
        pickupTime: "17:30",
        location: "Rahmath,Kakkanad ",
        imageUrl: "https://i.pinimg.com/1200x/de/77/02/de770233e68ea6d34a1c4e6c36bd19de.jpg",
        status: "available",
        price: 150,
        timestamp: new Date('2024-02-13T16:00:00')
    },
    {
        id: 8,
        foodName: "Al faham Mandi",
        quantity: 30,
        pickupTime: "20:00",
        location: "Al Sheba ,Chittethukara ",
        imageUrl: "https://i.pinimg.com/736x/12/18/b7/1218b788f587b267290d29f7336be359.jpg",
        status: "available",
        price: 160,
        timestamp: new Date('2024-02-13T16:00:00')
    },
    {
        id: 9,
        foodName: "Appam and Stew",
        quantity: 30,
        pickupTime: "10:00",
        location: "Ammas kitchen, Edappally ",
        imageUrl: "https://i.pinimg.com/1200x/0d/f8/9b/0df89b42ac5d8c9d36085187938c1fb2.jpg",
        status: "available",
        price: 99,
        timestamp: new Date('2024-02-13T09:00:00')
    }
];

let nextId = foodDonations.length + 1;

// ========================================
// PAGE NAVIGATION
// ========================================

const navLinks = document.querySelectorAll('.nav-link');
const footerLinks = document.querySelectorAll('.footer-link');
const pages = document.querySelectorAll('.page');
const ctaButtons = document.querySelectorAll('[data-navigate]');

function navigateToPage(pageName) {
    pages.forEach(page => page.classList.remove('active'));
    const targetPage = document.getElementById(`${pageName}-page`);
    if (targetPage) targetPage.classList.add('active');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageName) link.classList.add('active');
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pageName === 'receiver') renderFoodCards();
}

navLinks.forEach(link => link.addEventListener('click', e => {
    e.preventDefault();
    navigateToPage(link.dataset.page);
}));

footerLinks.forEach(link => link.addEventListener('click', e => {
    e.preventDefault();
    navigateToPage(link.dataset.page);
}));

ctaButtons.forEach(btn => btn.addEventListener('click', () => navigateToPage(btn.dataset.navigate)));

// ========================================
// DONOR FORM - FIXED (now creates newDonation)
// ========================================

const donationForm = document.getElementById('donation-form');
const successMessage = document.getElementById('success-message');

donationForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(donationForm);

    const newDonation = {
        id: nextId++,
        foodName: formData.get('foodName'),
        quantity: parseInt(formData.get('quantity')),
        pickupTime: formData.get('pickupTime'),
        location: formData.get('location'),
        imageUrl: formData.get('imageUrl') || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
        price: parseInt(formData.get('price')) || 99,
        status: 'available',
        timestamp: new Date()
    };

    foodDonations.unshift(newDonation);
    successMessage.classList.add('show');
    donationForm.reset();

    setTimeout(() => successMessage.classList.remove('show'), 5000);
    updateMealsSaved();
});

// ========================================
// RECEIVER PAGE - FIXED
// ========================================

const foodGrid = document.getElementById('food-grid');
const emptyState = document.getElementById('empty-state');
const statusFilter = document.getElementById('status-filter');

function renderFoodCards(filterStatus = 'all') {
    foodGrid.innerHTML = '';

    let filtered = foodDonations;
    if (filterStatus !== 'all') {
        filtered = foodDonations.filter(d => d.status === filterStatus);
    }

    if (filtered.length === 0) {
        emptyState.classList.add('show');
        foodGrid.style.display = 'none';
    } else {
        emptyState.classList.remove('show');
        foodGrid.style.display = 'grid';

        filtered.forEach(donation => {
            foodGrid.appendChild(createFoodCard(donation));
        });
    }
}

function createFoodCard(donation) {
    const card = document.createElement('div');
    card.className = 'food-card';
    card.dataset.id = donation.id;

    const statusClass = donation.status === 'available' ? 'status-available' : 'status-unavailable';
    const statusText = donation.status === 'available' ? 'Available' : 'Unavailable';
    const formattedTime = formatTime(donation.pickupTime);

    card.innerHTML = `
        <img src="${donation.imageUrl}" alt="${donation.foodName}" class="food-card-image" 
             onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500'">
        <div class="food-card-content">
            <div class="food-card-header">
                <h3 class="food-card-title">${donation.foodName}</h3>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
            <div class="food-card-info">
                <div class="info-item"><span class="info-icon">🍽️</span><span>${donation.quantity} servings</span></div>
                <div class="info-item"><span class="info-icon">💰</span><span>₹${donation.price}</span></div>
                <div class="info-item"><span class="info-icon">⏰</span><span>Pickup: ${formattedTime}</span></div>
                <div class="info-item"><span class="info-icon">📍</span><span>${donation.location}</span></div>
            </div>
            <button class="claim-btn" data-id="${donation.id}" ${donation.status === 'available' ? '' : 'disabled'}>
                ${donation.status === 'available' ? 'Buy Now' : 'Unavailable'}
            </button>
        </div>
    `;

    card.querySelector('.claim-btn').addEventListener('click', () => buyFood(donation.id));
    return card;
}

function formatTime(time24) {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${period}`;
}

function buyFood(donationId) {
    const donation = foodDonations.find(d => d.id === donationId);
    if (donation && donation.status === 'available') {
        donation.status = 'unavailable';
        renderFoodCards(statusFilter.value);
        showNotification('Purchase successful! 🎉 Thank you for supporting.');
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; top: 100px; right: 20px;
        background: linear-gradient(135deg, #27ae60, #2ecc71);
        color: white; padding: 1rem 1.5rem; border-radius: 12px;
        box-shadow: 0 4px 20px rgba(39,174,96,0.3); z-index: 10000;
        animation: slideInRight 0.3s ease; font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Filter change
statusFilter.addEventListener('change', e => renderFoodCards(e.target.value));

// ========================================
// MEALS SAVED COUNTER
// ========================================

function updateMealsSaved() {
    const el = document.getElementById('meals-saved');
    if (!el) return;
    const total = foodDonations.reduce((sum, d) => sum + d.quantity, 0);
    animateCounter(el, 12847 + total);
}

function animateCounter(element, target) {
    const current = parseInt(element.textContent.replace(/,/g, '')) || 0;
    const inc = (target - current) / 30;
    let val = current;
    const timer = setInterval(() => {
        val += inc;
        if ((inc > 0 && val >= target) || (inc < 0 && val <= target)) {
            val = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(val).toLocaleString();
    }, 30);
}

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    navigateToPage('home');
    updateMealsSaved();
    renderFoodCards();   // ← This will now show the 9 cards
});

// Utility functions (updated to use 'unavailable')
function getDonationStats() {
    const available = foodDonations.filter(d => d.status === 'available').length;
    const unavailable = foodDonations.filter(d => d.status === 'unavailable').length;
    return { total: foodDonations.length, available, unavailable };
}

window.foodBridgeUtils = {
    getDonationStats,
    viewDonations: () => console.table(foodDonations)
};