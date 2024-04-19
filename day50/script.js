let screens=document.querySelectorAll('.screen');
let startBtn=document.querySelector('#start-btn');
let chooseInsects=document.querySelectorAll('.choose-insect-btn');
let timeEl=document.querySelector('.time')
let scoreEl=document.querySelector('.score')
let gameContainer=document.querySelector('.game-container');
let second=0;
let minute=0;
let score=0;
let selectedInsect='';

startBtn.addEventListener('click', function(){
    screens[0].classList.add('up')
})

chooseInsects.forEach((btn)=>{
    btn.addEventListener('click', function(){
        let img=btn.querySelector('img');
        let source=img.getAttribute('src');
        selectedInsect=source;
        screens[1].classList.add('up');
        setTimeout(createInsect,500);
        startGame();
    })
})
function startGame() {
    setInterval(increase,1000)
}
function increase() {
    second++;
    // console.log(second)
    if(second<10){
        second=`0${second}`
    }
   
    if(second>=60){
        second=0;
        minute++;
        if(minute<10){
            minute=`0${minute}`
        }
    }
    timeEl.innerHTML=`Time: ${minute}:${second}`
}
function createInsect(){
    let newInsect=document.createElement('span');
    newInsect.classList.add('newInsect');
    newInsect.innerHTML=`<img src=${selectedInsect} alt="" style='transform:rotate(${Math.random()*360}deg)'>`;
    gameContainer.appendChild(newInsect)
    let {x,y}=randomlocation();
    newInsect.style.top=`${y}px`
    newInsect.style.left=`${x}px`
    newInsect.addEventListener('click',catchInsect)

}
function randomlocation(){
    let height=window.innerHeight;
    let width=window.innerWidth;
    let x=Math.random()*(width-50);
    let y=Math.random()*(height-50);
    return{x,y}
}
function catchInsect(){
    score++;
    scoreEl.innerHTML=score;
    this.classList.add('caught');
    setTimeout(()=>{this.remove},1000)
    setTimeout(createInsect(),200)
    setTimeout(createInsect(),200)
}