// Authentication system
document.getElementById('registerForm').addEventListener('submit', handleRegister);
document.getElementById('loginForm').addEventListener('submit', handleLogin);

function handleRegister(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
        username: formData.get('username') || e.target[0].value,
        email: formData.get('email') || e.target[1].value,
        password: formData.get('password') || e.target[2].value,
        balance: 1000, // Starting balance
        joined: new Date().toISOString()
    };
    
    // Save user
    localStorage.setItem('user_' + userData.email, JSON.stringify(userData));
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    // Update UI
    showUserMenu(userData);
    closeModals();
    
    // Show success message
    showNotification('Аккаунт создан успешно! 🎉');
}

function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email') || e.target[0].value;
    const password = formData.get('password') || e.target[1].value;
    
    const user = localStorage.getItem('user_' + email);
    
    if (user) {
        const userData = JSON.parse(user);
        if (userData.password === password) {
            localStorage.setItem('currentUser', JSON.stringify(userData));
            showUserMenu(userData);
            closeModals();
            showNotification('Добро пожаловать! 👋');
        } else {
            showNotification('Неверный пароль! ❌', 'error');
        }
    } else {
        showNotification('Пользователь не найден! ❌', 'error');
    }
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? 'linear-gradient(45deg, #ff6b6b, #ee5a52)' : 'linear-gradient(45deg, #48cae4, #00b4d8)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);