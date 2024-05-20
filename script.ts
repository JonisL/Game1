interface Animal {
    hp: number;
    hunger: number;
    fun: number;
    level: number;
    alive: boolean;
    image: string;
}

const animals: Animal[] = [
    { hp: 100, hunger: 100, fun: 100, level: 1, alive: true, image: 'https://static.vecteezy.com/system/resources/previews/022/149/192/original/hamster-pet-in-pixel-art-style-vector.jpg' },
    { hp: 100, hunger: 100, fun: 100, level: 1, alive: true, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr7Q7-UPnRZhKnJcpYLBo25Kif8EwABnZsX3vVh2U0fw&s' },
    { hp: 100, hunger: 100, fun: 100, level: 1, alive: true, image: 'https://static.vecteezy.com/system/resources/previews/022/149/192/original/hamster-pet-in-pixel-art-style-vector.jpg' },
    { hp: 100, hunger: 100, fun: 100, level: 1, alive: true, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr7Q7-UPnRZhKnJcpYLBo25Kif8EwABnZsX3vVh2U0fw&s' },
    { hp: 100, hunger: 100, fun: 100, level: 1, alive: true, image: 'https://static.vecteezy.com/system/resources/previews/022/149/192/original/hamster-pet-in-pixel-art-style-vector.jpg' },
];

let selectedAnimal: Animal | null = null;

const hpBar = document.getElementById('hp') as HTMLProgressElement;
const hungerBar = document.getElementById('hunger') as HTMLProgressElement;
const funBar = document.getElementById('fun') as HTMLProgressElement;
const hpPercent = document.getElementById('hp-percent') as HTMLSpanElement;
const hungerPercent = document.getElementById('hunger-percent') as HTMLSpanElement;
const funPercent = document.getElementById('fun-percent') as HTMLSpanElement;
const levelText = document.getElementById('animal-level') as HTMLParagraphElement;
const animalImage = document.getElementById('animal-image') as HTMLImageElement;
const feedBtn = document.getElementById('feed-btn') as HTMLButtonElement;
const playBtn = document.getElementById('play-btn') as HTMLButtonElement;
const selectionScreen = document.getElementById('selection-screen') as HTMLDivElement;
const gameContainer = document.getElementById('game-container') as HTMLDivElement;
const petOptions = document.getElementById('pet-options') as HTMLDivElement;
const startGameBtn = document.getElementById('start-game-btn') as HTMLButtonElement;

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

function selectAnimal(index: number, element: HTMLElement) {
    selectedAnimal = { ...animals[index] };
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
