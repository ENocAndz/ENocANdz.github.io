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
    /*
    if(number == 0){
        imagechange(1);
        number=1;
    }
    else{
        imagechange(0)
        number=0;
    }*/
}

function imagechange(x){
    if(x==1){
        logo.src='img/logo-white.png';
        
    }
    else{
        logo.src='img/logo-no-background.png';
    }
}