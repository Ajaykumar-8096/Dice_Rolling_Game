let wins = 0;
let losses = 0;
let ties = 0;

const rollBtn = document.getElementById("rollBtn");
const userDice = document.getElementById("userDice");
const cpuDice = document.getElementById("cpuDice");
const resultText = document.getElementById("resultText");
const rollSound = document.getElementById("rollSound");

rollBtn.addEventListener("click", () => {
    rollSound.play();

    fetch("/roll")
        .then(response => response.json())
        .then(data => {
            const userRoll = data.dice;
            const cpuRoll = Math.floor(Math.random() * 6) + 1;

            userDice.src = `/static/dice${userRoll}.png`;
            cpuDice.src = `/static/dice${cpuRoll}.png`;

            if (userRoll > cpuRoll) {
                wins++;
                resultText.innerText = "🎉 You Win!";
            } 
            else if (userRoll < cpuRoll) {
                losses++;
                resultText.innerText = "😢 You Lose!";
            } 
            else {
                ties++;
                resultText.innerText = "🤝 It's a Tie!";
            }

            document.getElementById("wins").innerText = wins;
            document.getElementById("losses").innerText = losses;
            document.getElementById("ties").innerText = ties;
        });
});
