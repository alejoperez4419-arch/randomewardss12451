/* =========================
   ELEMENTS
========================= */
const sections = document.querySelectorAll(".section");
const btnNext = document.getElementById("btnNext");
const btnHome = document.getElementById("btnHome");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const rewardsBox = document.getElementById("rewards");

/* =========================
   DATABASE
========================= */

// 12 jugadores
const players = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    img: `${i + 1}.png`
}));

// Coins
const coins = [10000, 20000, 30000, 50000, 80000, 100000];

// GP
const gp = [50000, 100000, 200000, 300000, 500000, 1000000];

// ePoints ✅
const epoints = [500, 1000, 1500, 2000, 3000, 5000];

// Combos completos (Coins + GP + ePoints)
const combos = [
    { coins: 10000, gp: 50000, epoints: 500 },
    { coins: 20000, gp: 100000, epoints: 1000 },
    { coins: 30000, gp: 200000, epoints: 1500 },
    { coins: 50000, gp: 300000, epoints: 2000 },
    { coins: 80000, gp: 500000, epoints: 3000 },
    { coins: 100000, gp: 1000000, epoints: 5000 }
];

/* =========================
   HELPERS
========================= */

function showSection(id) {
    sections.forEach(section => section.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function getRandomItems(array, count) {
    return [...array]
        .sort(() => Math.random() - 0.5)
        .slice(0, count);
}

/* =========================
   EVENTS
========================= */

btnNext.addEventListener("click", () => {
    showSection("section2");
    startLoading();
});

btnHome.addEventListener("click", () => {
    showSection("section1");
});

/* =========================
   LOADING BAR
========================= */

function startLoading() {
    let progress = 0;
    progressBar.style.width = "0%";
    progressText.textContent = "0%";

    const interval = setInterval(() => {
        progress++;
        progressBar.style.width = progress + "%";
        progressText.textContent = progress + "%";

        if (progress >= 100) {
            clearInterval(interval);
            generateRewards();
            showSection("section3");
        }
    }, 10); // 100 * 10ms = 1 segundo
}

/* =========================
   GENERATE REWARDS
========================= */

function generateRewards() {
    rewardsBox.innerHTML = "";

    // 🎮 3 jugadores random
    const freePlayers = getRandomItems(players, 3);

    freePlayers.forEach(player => {
        rewardsBox.innerHTML += `
            <div class="reward-card">
                <img src="${player.img}" alt="Player">
            </div>
        `;
    });

    // 🎁 Combo random (Coins + GP + ePoints)
    const combo = combos[Math.floor(Math.random() * combos.length)];

    rewardsBox.innerHTML += `
        <div class="reward-card">
            <img src="coin.png">
            <p>${combo.coins} Coins</p>
        </div>

        <div class="reward-card">
            <img src="gp.png">
            <p>${combo.gp} GP</p>
        </div>

        <div class="reward-card">
            <img src="epoints.png">
            <p>${combo.epoints} ePoints</p>
        </div>
    `;
}

