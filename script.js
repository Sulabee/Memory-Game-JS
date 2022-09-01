const section = document.querySelector('section');
const lives = document.querySelector('.Lives');
let tries = 10;


lives.textContent = tries;

const backImg = './images/d6dlsyg-52f89407-773a-464f-93d3-4648cc91f3fb.jpg';

const getData = () => [{imgSrc:'./images/2wafu1bmcz_b21fc8e6.jpeg' , id : 1},
                      {imgSrc:'./images/12_-_The_Mystical_King_Cobra_and_Coffee_Forests.jpg' , id : 2},
                      {imgSrc:'./images/1800.jpg' , id : 3},
                      {imgSrc:'./images/322868_1100-800x825.jpg' , id : 4},
                      {imgSrc:'./images/cat-talk-eyes-553942-hero-df606397b6ff47b19f3ab98589c3e2ce.jpg' , id : 5},
                      {imgSrc:'./images/istockphoto-831411248-170667a.jpg' , id : 6},
                      {imgSrc:'./images/jaguar-square-1-400x400.jpg.optimal.jpg' , id : 7},
                      {imgSrc:'./images/VIER PFOTEN_2017-10-20_164-3854x2667-1920x1329.jpg' , id : 8},
                      {imgSrc:'./images/2wafu1bmcz_b21fc8e6.jpeg' , id : 1},
                      {imgSrc:'./images/12_-_The_Mystical_King_Cobra_and_Coffee_Forests.jpg' , id : 2},
                      {imgSrc:'./images/1800.jpg' , id : 3},
                      {imgSrc:'./images/322868_1100-800x825.jpg' , id : 4},
                      {imgSrc:'./images/cat-talk-eyes-553942-hero-df606397b6ff47b19f3ab98589c3e2ce.jpg' , id : 5},
                      {imgSrc:'./images/istockphoto-831411248-170667a.jpg' , id : 6},
                      {imgSrc:'./images/jaguar-square-1-400x400.jpg.optimal.jpg' , id : 7},
                      {imgSrc:'./images/VIER PFOTEN_2017-10-20_164-3854x2667-1920x1329.jpg' , id : 8}
                     ];


const randomize = () => {
    cardData = getData();
    cardData.sort(()=>Math.random() - 0.5);
    return cardData;
}


const generateCards = () => {
    const cardData = randomize();
    
    cardData.forEach((item) => {
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('img');
        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';
        face.src = item.imgSrc;
        back.src = backImg;
        card.setAttribute('cardid',item.id);
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click',(e) => {
            card.classList.toggle('flipcard');
            checkCards(e);
        })
    });
}


const checkCards = (e) => {

    clickedCard = e.target;
    clickedCard.classList.add('flipped');

    flippedCards = document.querySelectorAll('.flipped');
    rightCards = document.querySelectorAll('.flipcard');

    if(flippedCards.length === 2){
        if(flippedCards[0].getAttribute('cardid') === flippedCards[1].getAttribute('cardid') ){
            console.log('Match');
            flippedCards.forEach((card) =>{
                card.classList.remove('flipped');
                card.style.pointerEvents = 'none';
            })
        }
        else{
            console.log('Wrong');
            flippedCards.forEach((card) =>{
                card.classList.remove('flipped');
                setTimeout(() => card.classList.remove('flipcard'),850);
            })
            tries--;
            lives.textContent = tries;
            if(tries === 0){
                restart("Loser");
            }
        }
    }

    if(rightCards.length === 16){
        restart('Winner !');
    }

}

const restart = (text) => {

    let cardData = randomize();
    let cards = document.querySelectorAll('.card');
    let faces = document.querySelectorAll('.face');
    section.style.pointerEvents = 'none';

    cardData.forEach((item,index) => {
        cards[index].classList.remove('flipcard');
        setTimeout(()=>{
            cards[index].style.pointerEvents = 'all';
            faces[index].src = item.imgSrc;
            cards[index].setAttribute('cardid',item.id);
            section.style.pointerEvents = 'all';
        } , 1000);  
    })
    
    tries = 10;
    lives.textContent = tries;
    setTimeout(()=>window.alert(text),100);
}

generateCards();