// HAN Memory
// Made by: Dilano Walda
const section = document.querySelector('section');
const playerScoreCounter = document.querySelector(".playerScoreCounter");
const playerLivesCounter = document.querySelector(".playerLivesCounter");
let playerScore = 0;
let playerLives = 8;

//Score + Lives counter
playerScoreCounter.textContent = playerScore;
playerLivesCounter.textContent = playerLives;

//All the different cards
const getCardData = () => [
    { imgSrc: './img/cod.jpg', name: "Call of Duty" },
    { imgSrc: './img/csgo.jpg', name: "Counter strike: Global Offensive" },
    { imgSrc: './img/f1.jpg', name: "F1 2021" },
    { imgSrc: './img/gt7.jpg', name: "Gran turrismo 7" },
    { imgSrc: './img/gta.jpg', name: "Grand Theft Auto 5" },
    { imgSrc: './img/horizon.jpg', name: "Horizon Zero Dawn" },
    { imgSrc: './img/horizon5.jpg', name: "Forza Horizon 5" },
    { imgSrc: './img/minecraft.jpg', name: "Minecraft" },
    { imgSrc: './img/cod.jpg', name: "Call of Duty" },
    { imgSrc: './img/csgo.jpg', name: "Counter strike: Global Offensive" },
    { imgSrc: './img/f1.jpg', name: "F1 2021" },
    { imgSrc: './img/gt7.jpg', name: "Gran turrismo 7" },
    { imgSrc: './img/gta.jpg', name: "Grand Theft Auto 5" },
    { imgSrc: './img/horizon.jpg', name: "Horizon Zero Dawn" },
    { imgSrc: './img/horizon5.jpg', name: "Forza Horizon 5" },
    { imgSrc: './img/minecraft.jpg', name: "Minecraft" },
];

//Randomize cards order in array
const randomizeCardData = () => {
    const cardData = getCardData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};

//Cards generator
const cardsGenerator = () => {
    //Randomize cards array
    const cardData = randomizeCardData();
    //Generate cards
    cardData.forEach(item => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";
        //Fill card with data
        face.src = item.imgSrc;
        card.setAttribute("name", item.name);
        //Show card in section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);
        //Wait for click
        card.addEventListener("click", (e) => {
            card.classList.toggle("toggleCard");
            checkCards(e);
        })
    });
};

//Check clicked cards
const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".toggleCard")
    console.log(flippedCards);
    flippedCards.forEach(card => {
        card.style.pointerEvents = "none";
    });
    //Check if there are 2 flipped cards
    if (flippedCards.length === 2) {
        section.style.pointerEvents = "none";
        //Check if the flipped cards are equal
        //If cards are equal:
        if (flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")) {
            console.log("Match!");
            flippedCards.forEach(card => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            })
            //Up the player score by 1
            playerScore++;
            playerScoreCounter.textContent = playerScore;
        }
        //If cards are not equal:
        else {
            console.log("Wrong!")
            flippedCards.forEach(card => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "all";
                setTimeout(() => card.classList.remove("toggleCard"), 1500);
            });
            //Remove a player live
            playerLives--;
            playerLivesCounter.textContent = playerLives;
            //If players lives equals 0 restart game+score and show score
            if (playerLives === 0) {
                setTimeout(() => {
                    restartGame("You lost and got a score of " + playerScore + " points!");
                    playerScore = 0;
                    playerScoreCounter.textContent = playerScore;
                }, 1500);
            }
        }
    }

    //Check if player wins
    if (toggleCard.length === 16) {
        restartGame("Next Round, Keep it up!");
    }
    //Make section clickable again after checking cards
    setTimeout(() => section.style.pointerEvents = "all", 1500)
}

//Restart game with text for alert box
const restartGame = (text) => {
    let cardData = randomizeCardData();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents = "none";
    cardData.forEach((item, index) => {
        cards[index].classList.remove("toggleCard");
        //Use randomize cardData
        setTimeout(() => {
            cards[index].style.pointerEvents = "all";
            faces[index].src = item.imgSrc;
            cards[index].setAttribute('name', item.name);
            section.style.pointerEvents = "all";
        }, 2500);

    });
    //Show alert box with text
    setTimeout(() => window.alert(text, 100));
    //Reset player lives
    playerLives = 8;
    playerLivesCounter.textContent = playerLives;
}

cardsGenerator();