// observer para hacer el fade in y animacion para contenido hidden
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('show');

        }else{
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el)=> observer.observe(el));
var toggle = document.querySelector('.container');
var links = document.querySelector('.links');
var logo = document.querySelector('.imagen');
var body = document.querySelector('body');
var enoc = document.querySelector('.enoc');
var toggleImg = document.getElementById('toggleImg');
const pCard = document.querySelector('.pongCard');
const wCard = document.querySelector('.weatherCard');
const gCard = document.querySelector('.gerizimCard');
const sCard = document.querySelector('.skullCard');
const arrow = document.querySelector('.buttonArrow');
const gButton = document.querySelector('.gButton'); 
const pButton = document.querySelector('.pButton'); 
const wButton = document.querySelector('.wButton'); 
const cButton = document.querySelector('.cButton'); 
const circles = document.querySelectorAll(".circles");
const form = document.querySelector("form"),
statusTxt = form.querySelector(".buttondiv span");



const coords = {x :0, y:0};

//this part is for dark mode
var number = 0;

toggle.onclick = function(){
    toggle.classList.toggle('active');
    body.classList.toggle('active');
    links.classList.toggle('active');
    logo.classList.toggle('active');
    enoc.classList.toggle('active');
    circles.forEach(circle => {
        circle.classList.toggle('active');
    })
    if (toggle.classList.contains('active')) {
        toggleImg.style.opacity = 0; 
        setTimeout(function() {
            toggleImg.src = 'img/MoonB.png'; 
            toggleImg.style.opacity = 1; 
        }, 300); 
    } else {
        toggleImg.style.opacity = 0; 
        setTimeout(function() {
            toggleImg.src = 'img/sunB.png';
            toggleImg.style.opacity = 1; 
        }, 300); 
    }
}



window.addEventListener("scroll",function (){
    const hd = document.querySelector('.hd');
    const scrolledClass = "scrolled";
    const scrollY = window.scrollY;
    if(scrollY>0){
        hd.classList.add(scrolledClass);
        
    } else{
        hd.classList.remove(scrolledClass);
        
    }
});

//Arrow infoProjects script
arrow.addEventListener('mouseover', ()=>{
    pCard.classList.add('flip');
    gCard.classList.add('flip');
    wCard.classList.add('flip');
    sCard.classList.add('flip');
});

arrow.addEventListener('mouseout', () =>{
    pCard.classList.remove('flip');
    gCard.classList.remove('flip');
    wCard.classList.remove('flip');
    sCard.classList.remove('flip');
});

// Onclick Projects script
gButton.onclick =function(){
    console.log('Hello')
    gCard.classList.add('visible');
    pCard.classList.remove('visible');
    wCard.classList.remove('visible');
    sCard.classList.remove('visible');
};
pButton.onclick= function(){
    pCard.classList.add('visible');
    gCard.classList.remove('visible');
    wCard.classList.remove('visible');
    sCard.classList.remove('visible');
};
wButton.onclick= function(){
    wCard.classList.add('visible');
    pCard.classList.remove('visible');
    gCard.classList.remove('visible');
    sCard.classList.remove('visible');
};
cButton.onclick = function(){
    sCard.classList.add('visible');
    pCard.classList.remove('visible');
    wCard.classList.remove('visible');
    gCard.classList.remove('visible');
};

//Cursor Animation

circles.forEach(function (circle) {
    circle.x = 0;
    circle.y = 0;
});

window.addEventListener("mousemove",function(e){
    coords.x = e.clientX;
    coords.y = e.clientY;
    console.log(coords.x,coords.y);
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach(function (circle, index) {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";

        circle.style.scale = (10-index)/circles.length;
        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });
    requestAnimationFrame(animateCircles);
}

animateCircles();

