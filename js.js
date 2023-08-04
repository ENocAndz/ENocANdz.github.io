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
const pCard = document.querySelector('.pongCard');
const wCard = document.querySelector('.weatherCard');
const gCard = document.querySelector('.gerizimCard');
const cCard = document.querySelector('.chatbot');
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
});

arrow.addEventListener('mouseout', () =>{
    pCard.classList.remove('flip');
    gCard.classList.remove('flip');
    wCard.classList.remove('flip');
});

// Onclick Projects script
gButton.onclick =function(){
    console.log('Hello')
    gCard.classList.add('visible');
    pCard.classList.remove('visible');
    wCard.classList.remove('visible');
    cCard.classList.remove('visible');
};
pButton.onclick= function(){
    pCard.classList.add('visible');
    gCard.classList.remove('visible');
    wCard.classList.remove('visible');
    cCard.classList.remove('visible');
};
wButton.onclick= function(){
    wCard.classList.add('visible');
    pCard.classList.remove('visible');
    gCard.classList.remove('visible');
    cCard.classList.remove('visible');
};
cButton.onclick = function(){
    cCard.classList.add('visible');
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

form.onsubmit = (e)=>{
    e.preventDefault();
    statusTxt.style.display = "block";
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "message.php",true);
    xhr.onload = ()=>{
        if(xhr.readyState == 4 && xhr.status == 200){
            if(response.indexof("Email and Message field is required!") != -1 || response.indexof("Enter a valid Email") || response.indexof("Failed to send your message")){
                statusTxt.style.color = "red";

            }else{
                form.reset();
                setTimeout(()=>{
                    statusTxt.style.display = "none";
                }, 3000)
            }
            statusTxt.innerText = response;
        }
    }
    let formData = new FormData(form);
    xhr.send(formData);
}