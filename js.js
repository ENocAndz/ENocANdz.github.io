var toggle = document.querySelector('.container');
var links = document.querySelector('.links');
var logo = document.querySelector('.imagen');
var body = document.querySelector('body');
var enoc = document.querySelector('.enoc');


var number = 0;
toggle.onclick = function(){
    toggle.classList.toggle('active');
    body.classList.toggle('active');
    links.classList.toggle('active');
    logo.classList.toggle('active');
    enoc.classList.toggle('active');
}

function imagechange(x){
    if(x==1){
        logo.src='img/logo-white.png';
        
    }
    else{
        logo.src='img/logo-no-background.png';
    }
}

window.addEventListener("scroll",function (){
    const hd = document.querySelector('.hd');
    const scrolledClass = "scrolled";
    const scrollY = window.scrollY;
    if(scrollY>0){
        hd.classList.add(scrolledClass);
        console.log("mayor que yo")
    } else{
        hd.classList.remove(scrolledClass);
        console.log("Menormenor")
    }
});