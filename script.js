"use strict";
const animals = [
    { hp: 100, hunger: 100, fun: 100, level: 1, alive: true, image: 'https://static.vecteezy.com/system/resources/previews/022/149/192/original/hamster-pet-in-pixel-art-style-vector.jpg' },
    { hp: 100, hunger: 100, fun: 100, level: 1, alive: true, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr7Q7-UPnRZhKnJcpYLBo25Kif8EwABnZsX3vVh2U0fw&s' },
    { hp: 100, hunger: 100, fun: 100, level: 1, alive: true, image: 'https://static.vecteezy.com/system/resources/previews/022/149/192/original/hamster-pet-in-pixel-art-style-vector.jpg' },
    { hp: 100, hunger: 100, fun: 100, level: 1, alive: true, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr7Q7-UPnRZhKnJcpYLBo25Kif8EwABnZsX3vVh2U0fw&s' },
    { hp: 100, hunger: 100, fun: 100, level: 1, alive: true, image: 'https://static.vecteezy.com/system/resources/previews/022/149/192/original/hamster-pet-in-pixel-art-style-vector.jpg' },
];
let selectedAnimal = null;
const hpBar = document.getElementById('hp');
const hungerBar = document.getElementById('hunger');
const funBar = document.getElementById('fun');
const hpPercent = document.getElementById('hp-percent');
const hungerPercent = document.getElementById('hunger-percent');
const funPercent = document.getElementById('fun-percent');
const levelText = document.getElementById('animal-level');
const animalImage = document.getElementById('animal-image');
const feedBtn = document.getElementById('feed-btn');
const playBtn = document.getElementById('play-btn');
const selectionScreen = document.getElementById('selection-screen');
const gameContainer = document.getElementById('game-container');
const petOptions = document.getElementById('pet-options');
const startGameBtn = document.getElementById('start-game-btn');
function displayPetOptions() {
    petOptions.innerHTML = '';
    animals.forEach((animal, index) => {
        const petOption = document.createElement('div');
        petOption.classList.add('pet-option');
        petOption.innerHTML = `<img src="${animal.image}" alt="Animal ${index + 1}">`;
        petOption.addEventListener('click', () => selectAnimal(index, petOption));
        petOptions.appendChild(petOption);
    });
}
function selectAnimal(index, element) {
    selectedAnimal = Object.assign({}, animals[index]);
    document.querySelectorAll('.pet-option').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    startGameBtn.disabled = false;
}
function startGame() {
    if (selectedAnimal) {
        selectionScreen.style.display = 'none';
        gameContainer.style.display = 'block';
        updateUI();
    }
}
function updateUI() {
    if (selectedAnimal) {
        hpBar.value = selectedAnimal.hp;
        hungerBar.value = selectedAnimal.hunger;
        funBar.value = selectedAnimal.fun;
        hpPercent.innerText = `${selectedAnimal.hp}%`;
        hungerPercent.innerText = `${selectedAnimal.hunger}%`;
        funPercent.innerText = `${selectedAnimal.fun}%`;
        levelText.innerText = `Level: ${selectedAnimal.level}`;
        animalImage.src = selectedAnimal.image;
    }
}
function feedAnimal() {
    if (selectedAnimal && selectedAnimal.alive) {
        selectedAnimal.hunger = Math.min(selectedAnimal.hunger + 20, 100);
        updateUI();
    }
}
function playWithAnimal() {
    if (selectedAnimal && selectedAnimal.alive) {
        selectedAnimal.fun = Math.min(selectedAnimal.fun + 20, 100);
        updateUI();
    }
}
function gameLoop() {
    if (selectedAnimal && selectedAnimal.alive) {
        selectedAnimal.hunger = Math.max(selectedAnimal.hunger - 1, 0);
        selectedAnimal.fun = Math.max(selectedAnimal.fun - 1, 0);
        if (selectedAnimal.hunger === 0 || selectedAnimal.fun === 0) {
            selectedAnimal.hp = Math.max(selectedAnimal.hp - 1, 0);
        }
        if (selectedAnimal.hp === 0) {
            selectedAnimal.alive = false;
            alert('Your animal has died!');
        }
        if (selectedAnimal.hunger > 0 && selectedAnimal.fun > 0) {
            selectedAnimal.level++;
        }
        updateUI();
    }
}
feedBtn.addEventListener('click', feedAnimal);
playBtn.addEventListener('click', playWithAnimal);
startGameBtn.addEventListener('click', startGame);
setInterval(gameLoop, 1000);
displayPetOptions();
