// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check auth status
    checkAuthStatus();
    
    // Initialize event listeners
    initEventListeners();
    
    // Start animations
    startAnimations();
}

function initEventListeners() {
    // Auth button
    document.getElementById('authBtn').addEventListener('click', showAuthModal);
    
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', switchAuthTab);
    });
    
    // Game buttons
    document.querySelectorAll('.game-btn').forEach(btn => {
        btn.addEventListener('click', handleGameStart);
    });
    
    // Modal close
    document.querySelectorAll('.close').forEach(close => {
        close.addEventListener('click', closeModals);
    });
    
    // Click outside modal to close
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('authModal');
        if (event.target === modal) {
            closeModals();
        }
    });
}

function checkAuthStatus() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        showUserMenu(JSON.parse(user));
    }
}

function showUserMenu(user) {
    document.getElementById('authBtn').classList.add('hidden');
    const userMenu = document.getElementById('userMenu');
    userMenu.classList.remove('hidden');
    userMenu.querySelector('.username').textContent = user.username;
}

function showAuthModal() {
    document.getElementById('authModal').style.display = 'block';
}

function closeModals() {
    document.getElementById('authModal').style.display = 'none';
}

function switchAuthTab(e) {
    const tab = e.target.dataset.tab;
    
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Show corresponding form
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });
    document.getElementById(tab + 'Form').classList.add('active');
}

function startAnimations() {
    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Observe game cards
    document.querySelectorAll('.game-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

function handleGameStart(e) {
    const game = e.target.dataset.game;
    if (!localStorage.getItem('currentUser')) {
        showAuthModal();
        return;
    }
    
    switch(game) {
        case 'coinflip':
            startCoinFlip();
            break;
        case 'slots':
            startSlots();
            break;
        case 'predict':
            startPricePredict();
            break;
    }
}