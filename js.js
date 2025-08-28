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

const slotTexts = document.querySelectorAll('.movementText h1');
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el)=> observer.observe(el));
var toggle = document.querySelector('.container');
var links = document.querySelector('.links');
var logo = document.querySelector('.imagen');
var body = document.querySelector('body');
var enoc = document.querySelector('.enoc');
var toggleImg = document.getElementById('toggleImg');

const pCards = document.querySelectorAll('.pCardImg');



const circles = document.querySelectorAll(".circles");
const form = document.querySelector("form"),

statusTxt = form.querySelector(".buttondiv span");

pCards.forEach(card => {
  const image = card.querySelector('.card-image');

  let blurTimeout;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const moveX = (x / rect.width - 0.5) * 20;
    const moveY = (y / rect.height - 0.5) * 20;

    image.style.transform = `translate(${moveX}px, ${moveY}px)`;
    // Don't apply blur here — only on enter
  });

  card.addEventListener('mouseenter', () => {
    // Apply initial blur
    image.style.filter = 'blur(2px)';

    // Clear any existing timeout
    clearTimeout(blurTimeout);

    // Unblur after 300ms
    blurTimeout = setTimeout(() => {
      image.style.filter = 'blur(0)';
    }, 300);
  });

  card.addEventListener('mouseleave', () => {
    // Reset transform and blur when mouse leaves
    image.style.transform = 'scale(1) translate(0, 0)';
    image.style.filter = 'blur(0)';
    clearTimeout(blurTimeout); // Just in case
  });
});

// function decodingEffect(target, speed = 50) {
//   const originalText = target.dataset.text || target.textContent;
//   target.dataset.text = originalText; // store for reuse

//   const characters = "AHKE34JK*!ASNRCEGAZ8742";
//   let iterations = 0;

//   const interval = setInterval(() => {
//     target.textContent = originalText
//       .split("")
//       .map((char, index) => {
//         if (index < iterations) return originalText[index];
//         return characters[Math.floor(Math.random() * characters.length)];
//       })
//       .join("");

//     if (iterations >= originalText.length) {
//       clearInterval(interval);
//       target.dataset.animating = "false"; // Reset the flag after animation
//     }

//     iterations += 1;
//   }, speed);
// }

// // Intersection Observer to trigger effect on scroll-in
// const observer2 = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     const el = entry.target;

//     if (entry.isIntersecting) {
//       if (el.dataset.animating !== "true") {
//         el.dataset.animating = "true"; // prevent repeat while animating
//         decodingEffect(el);
//       }
//     } else {
//       // Reset the animating flag so it can re-trigger next time
//       el.dataset.animating = "false";
//     }
//   });
// }, {
//   threshold: 0.5, // adjust as needed
// });

// // Attach observer to all elements with the class "decode-text"
// document.querySelectorAll('.decode-text').forEach((el) => {
//   observer2.observe(el);
// });

const slotObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;

      // Add the animation class
      el.classList.add('slot-enter');

      // Optional: Remove observer if you want the animation only once
    //   observer.unobserve(el);

      // If you want it to be repeatable, comment out the line above,
      // and optionally remove the class when leaving viewport like this:
      // else you can also listen for animationend event and remove class there
    }
  });
}, { threshold: 0.5 });

slotTexts.forEach(el => {
  slotObserver.observe(el);
});

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


// Onclick Projects script

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

gsap.registerPlugin(ScrollTrigger);

const splitTypes = document.querySelectorAll('.reveal');
splitTypes.forEach((char) => {
    const text = new SplitType(char, { types: 'chars'});
    gsap.from(text.chars, {
        scrollTrigger: {
            trigger: char,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play play reverse reverse",
        },
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 1,
        ease: "power2.out"
    });
});

const decodeTypes = document.querySelectorAll('.decode-text');


decodeTypes.forEach((element) => {
  const splitText = new SplitType(element, { types: 'chars' });

  // Store original letters in data attribute once
  splitText.chars.forEach(char => {
    char.dataset.original = char.textContent;
  });

  ScrollTrigger.create({
    trigger: element,
    start: "top 80%",
    onEnter: () => {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const scrambleDuration = 100;  // total scramble time before decoding
      const scrambleInterval = 30;
      const decodeInterval = 100;

      // Scramble all letters at once
      let scrambleStart = Date.now();
      let scrambleTimer = setInterval(() => {
        splitText.chars.forEach(char => {
          char.textContent = letters[Math.floor(Math.random() * letters.length)];
        });

        if (Date.now() - scrambleStart > scrambleDuration) {
          clearInterval(scrambleTimer);

          // Start decoding letters one by one
          splitText.chars.forEach((char, index) => {
            setTimeout(() => {
              let decodeStart = Date.now();
              let decodeTimer = setInterval(() => {
                if (Date.now() - decodeStart < scrambleDuration) {
                  char.textContent = letters[Math.floor(Math.random() * letters.length)];
                } else {
                  char.textContent = char.dataset.original;
                  clearInterval(decodeTimer);
                }
              }, scrambleInterval);
            }, index * decodeInterval);
          });
        }
      }, scrambleInterval);
    },
    onLeaveBack: () => {
      // Reset immediately on scroll back
      splitText.chars.forEach(char => {
        char.textContent = char.dataset.original;
      });
    }
  });
});

let svg = document.querySelector('svg');
let path = svg.querySelector('path');
const pathLength = path.getTotalLength();

console.log(pathLength);

gsap.set(path, {
    strokeDasharray: pathLength
});

gsap.fromTo(path, {
    strokeDashoffset: pathLength
}, {
    strokeDashoffset: 0,
    duration: 2,
    ease: "power2.inOut",
    scrollTrigger: {
        trigger: svg,
        start: "top top",
        end: "bottom bottom",
        scrub:1,
    }
});

function showSmallScreenModal() {
  if (window.visualViewport.width < 768 && !localStorage.getItem('dismissedSmallScreenModal')) {
    const modal = document.getElementById('screenModal');
    
    // Show modal with animation
    modal.classList.add('show');

    // Close button
    document.getElementById('modalClose').addEventListener('click', () => {
      console.log("clock ok")
      modal.classList.remove('show');
      localStorage.setItem('dismissedSmallScreenModal', 'true');
      setTimeout(() => modal.style.display = 'none', 500); // wait for fade-out
    });
  }
}

// Run on load
window.addEventListener('load', showSmallScreenModal);

// Optional: also handle resize to show modal if they rotate device
window.addEventListener('resize', showSmallScreenModal);

// const lenis = new Lenis()
// lenis.on('scroll', (e) => {
//     console.log(e)
// })

// function raf(time){
//     lenis.raf(time)
//     requestAnimationFrame(raf)
// }
// requestAnimationFrame(raf)

