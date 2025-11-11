// Games functionality
function startCoinFlip() {
    const gameModal = document.getElementById('coinFlipGame');
    gameModal.classList.remove('hidden');
    
    // Create if not exists
    if (!gameModal.innerHTML) {
        gameModal.innerHTML = `
            <div class="game-content">
                <h3>Coin Flip 🎯</h3>
                <div class="coin" id="coin">
                    <div class="coin-front">HEADS</div>
                    <div class="coin-back">TAILS</div>
                </div>
                <div class="game-controls">
                    <button class="bet-btn" data-side="heads">HEADS</button>
                    <button class="bet-btn" data-side="tails">TAILS</button>
                </div>
                <button class="close-game">✕</button>
            </div>
        `;
        
        // Add event listeners
        gameModal.querySelector('.close-game').addEventListener('click', () => {
            gameModal.classList.add('hidden');
        });
        
        gameModal.querySelectorAll('.bet-btn').forEach(btn => {
            btn.addEventListener('click', flipCoin);
        });
    }
}

function flipCoin(e) {
    const side = e.target.dataset.side;
    const coin = document.getElementById('coin');
    const result = Math.random() > 0.5 ? 'heads' : 'tails';
    
    // Disable buttons during animation
    document.querySelectorAll('.bet-btn').forEach(btn => {
        btn.disabled = true;
    });
    
    // Flip animation
    coin.style.animation = 'flip 1s ease-in-out';
    
    setTimeout(() => {
        if (side === result) {
            showNotification('Победа! 🎉 Вы выиграли!');
            updateBalance(100); // Win 100 coins
        } else {
            showNotification('Повезет в следующий раз! 😔', 'error');
            updateBalance(-50); // Lose 50 coins
        }
        
        // Reset animation
        coin.style.animation = '';
        
        // Re-enable buttons
        document.querySelectorAll('.bet-btn').forEach(btn => {
            btn.disabled = false;
        });
    }, 1000);
}

function updateBalance(amount) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    user.balance += amount;
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('user_' + user.email, JSON.stringify(user));
    
    // Update display if balance element exists
    const balanceEl = document.querySelector('.user-balance');
    if (balanceEl) {
        balanceEl.textContent = user.balance;
    }
}

// Add coin flip animation to CSS
const gameStyle = document.createElement('style');
gameStyle.textContent = `
    @keyframes flip {
        0% { transform: rotateY(0deg); }
        50% { transform: rotateY(1800deg); }
        100% { transform: rotateY(3600deg); }
    }
    
    .game-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
    }
    
    .game-content {
        background: rgba(255,255,255,0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 20px;
        padding: 2rem;
        text-align: center;
        position: relative;
    }
    
    .close-game {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
    }
    
    .bet-btn {
        background: linear-gradient(45deg, #667eea, #764ba2);
        border: none;
        padding: 1rem 2rem;
        margin: 0 0.5rem;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .bet-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(102,126,234,0.3);
    }
    
    .bet-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;
document.head.appendChild(gameStyle);