let balance = 100.00;
let currentGame = "";

const emojis = ['🏎️', '💎', '🐯', '🔥', '👑', '🚀', '💰', '🎰', '🏁', '🦁', '⚡', '🐉'];
const adjs = ['Turbo', 'Golden', 'Mega', 'Fortune', 'Royal', 'Magic'];
const names = ['Car', 'Tiger', 'Dragon', 'Empire', 'Cash', 'Star'];

const lobby = document.getElementById('lobby');

// Criar 60 jogos aleatórios
for (let i = 1; i <= 60; i++) {
    const icon = emojis[Math.floor(Math.random() * emojis.length)];
    const name = `${adjs[Math.floor(Math.random() * adjs.length)]} ${names[Math.floor(Math.random() * names.length)]} ${i}`;
    
    const card = document.createElement('div');
    card.className = 'game-card';
    card.onclick = () => openGame(name, icon);
    card.innerHTML = `<span class="icon">${icon}</span><h3>${name}</h3>`;
    lobby.appendChild(card);
}

function openGame(name, icon) {
    currentGame = name;
    document.getElementById('game-title').innerText = name.toUpperCase();
    document.getElementById('game-screen').style.display = 'flex';
    document.getElementById('game-msg').innerText = "DEFINA SUA APOSTA";
    document.getElementById('r1').innerText = icon;
    document.getElementById('r2').innerText = icon;
    document.getElementById('r3').innerText = icon;
}

function closeGame() {
    document.getElementById('game-screen').style.display = 'none';
}

function playCurrentGame() {
    const bet = parseFloat(document.getElementById('bet-amount').value);
    const msg = document.getElementById('game-msg');

    if (isNaN(bet) || bet <= 0) return;
    if (balance < bet) { msg.innerText = "SEM SALDO!"; return; }

    balance -= bet;
    document.getElementById('main-balance').innerText = balance.toFixed(2);
    
    const reels = [document.getElementById('r1'), document.getElementById('r2'), document.getElementById('r3')];
    reels.forEach(r => r.classList.add('spinning'));
    document.getElementById('spinBtn').disabled = true;

    setTimeout(() => {
        reels.forEach(r => r.classList.remove('spinning'));
        document.getElementById('spinBtn').disabled = false;

        // --- LÓGICA 40% GANHO / 60% PERDA ---
        let win = Math.random() < 0.40;

        if (win) {
            const sym = reels[0].innerText;
            reels[1].innerText = sym; reels[2].innerText = sym;
            balance += (bet * 3);
            msg.innerText = `GANHOU! +R$ ${(bet * 3).toFixed(2)}`;
            msg.style.color = "#00FF00";
        } else {
            reels[2].innerText = '❌'; 
            msg.innerText = "NÃO FOI DESSA VEZ!";
            msg.style.color = "#FF6600";
        }
        document.getElementById('main-balance').innerText = balance.toFixed(2);
    }, 1000);
}
