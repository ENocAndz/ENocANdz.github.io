

gsap.registerPlugin(ScrollTrigger);

const redirectUrl = document.body.dataset.redirectUrl

const contents = gsap.utils.toArray(".slide");
let totalWidth = 0;
let horizontalScroll;

function createHorizontalScroll() {


    if (window.visualViewport && window.visualViewport.width > 768){
  // Kill old tween + scrollTrigger if they exist
        if (horizontalScroll) {
            horizontalScroll.scrollTrigger.kill();
            horizontalScroll.kill();
        }
      console.log(window.innerWidth)
      // Recalculate total width
      totalWidth = 0;
      contents.forEach(item => totalWidth += item.offsetWidth);
      
      // Create tween again with new totalWidth
      horizontalScroll = gsap.to(contents, {
          x: () => -(totalWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
              id: "horizontalScroll",
              trigger: ".horizontal-container",
              start: "top top",
              end: () => "+=" + (totalWidth - window.innerWidth),
              pin: true,
              scrub: 1,
              snap: progress => {
                  const slides = contents.length;
        return Math.round(progress * (slides - 1)) / (slides - 1);
      },
      markers: false
    }
});
}else{    
    if(horizontalScroll){
        horizontalScroll.scrollTrigger.kill();
        horizontalScroll.kill();
    }
}
}

// Initialize
createHorizontalScroll();

// Rebuild on resize
// scrable text animation
// gsap.registerPlugin(ScrambleTextPlugin) 

//bar scrolling code 
const barInner = document.querySelector('#bar-inner');
let progress = 0;
let decayInterval = null;
let holdInterval = null;
// const redirectUrl = "https://example.com"; // your target URL

function updateBar() {
    barInner.style.width = `${progress}%`;
}

function startDecay() {
    if (decayInterval) return;
    decayInterval = setInterval(() => {
        if (progress > 0) {
            progress -= 1;
            updateBar();
        } else {
            clearInterval(decayInterval);
            decayInterval = null;
        }
    }, 50);
}

// Horizontal end check
function isAtHorizontalEnd() {
    const st = ScrollTrigger.getById("horizontalScroll");
    return st && st.progress >= 0.999;
}

// Vertical bottom check
function isAtVerticalEnd() {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2;
}

// DESKTOP: horizontal scroll
window.addEventListener('wheel', (e) => {
    const scrollingDown = e.deltaY > 0;
    const isDesktop = window.visualViewport && window.visualViewport.width > 768;

    if (isDesktop) {
        const atEnd = isAtHorizontalEnd();
        if (atEnd && scrollingDown) {
            e.preventDefault();
            progress += 6;
            if (progress > 100) progress = 100;
            updateBar();

            clearInterval(decayInterval);
            decayInterval = null;

            if (progress >= 100) window.location.href = redirectUrl;
        } else {
            startDecay();
        }

        clearTimeout(barInner._decayTimeout);
        barInner._decayTimeout = setTimeout(() => startDecay(), 300);
    }
});

// MOBILE: vertical hold-to-fill
let touchStartY = 0;
let isDraggingUp = false;

window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

window.addEventListener('touchmove', (e) => {
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY - touchY; // positive if dragging up

    // Only trigger if dragging upwards at the bottom
    if (deltaY > 0 && isAtVerticalEnd()) {
        if (!holdInterval) {
            holdInterval = setInterval(() => {
                progress += 5 // fill speed
                if (progress > 100) progress = 100;
                updateBar();

                if (progress >= 100) {
                    clearInterval(holdInterval);
                    window.location.href = redirectUrl;
                }
            }, 100);
        }
    } else {
        // not dragging up or not at bottom
        clearInterval(holdInterval);
        holdInterval = null;
        startDecay();
    }
});

window.addEventListener('touchend', () => {
    clearInterval(holdInterval);
    holdInterval = null;
    startDecay();
});

// change scroll navigation text
function updateDragText() {
    const message = document.getElementById("dragMessage");

    if (window.innerWidth > 768) {
      // For wider screens
      message.textContent = "haz scroll hacia abajo.";
    } else {
      // For smaller devices
      message.textContent = "Mantén pulsado y arrastra hacia arriba.";
    }
  }

  // Run on load
  updateDragText();

  // Also run on resize, so it updates dynamically
  window.addEventListener("resize", updateDragText);

// text reveal gsap

function revealAnimation() {
    const splitTypes = document.querySelectorAll('.reveal');

    if (window.visualViewport && window.visualViewport.width > 768) {
        // Horizontal scroll animation
        splitTypes.forEach((char) => {
            const bg = char.dataset.bgColor;
            const fg = char.dataset.fgColor;
            const text = new SplitType(char, { types: 'words, chars' });
            gsap.from(text.chars, {
                color: bg,
                duration: 0.3,
                stagger: 0.02,
                scrollTrigger: {
                    trigger: char,
                    containerAnimation: horizontalScroll,
                    start: "left-=50% center",
                    end: "right+=50% center",
                    toggleActions: "play reverse play reverse",
                    scrub: false,
                    markers: false
                }
            });
        });
    } else {
        // Vertical scroll animation for small devices
        console.log("vertical scroll animation");
        splitTypes.forEach((char) => {
            const bg = char.dataset.bgColor;
            const fg = char.dataset.fgColor;
            const text = new SplitType(char, { types: 'words, chars' });
            gsap.from(text.chars, {
                color: bg,
                duration: 0.3,
                stagger: 0.02,
                scrollTrigger: {
                    trigger: char,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play reverse play reverse",
                    scrub: false,
                    markers: false
                }
            });
        });
    }
}
revealAnimation()


window.addEventListener("resize", () => {
  createHorizontalScroll();
  ScrollTrigger.refresh();
  revealAnimation()
});
//menu
function toggleMenu() {
    const menu = document.getElementById('menuOptions');
    menu.classList.toggle("open"); // toggle the .open class instead of display
}

// Optional: click outside to close
document.addEventListener("click", function(event) {
  const menu = document.getElementById('menuOptions');
  const button = document.querySelector(".menu-button");

  // Close only if it's open and the click is outside
  if (menu.classList.contains("open") && 
      !menu.contains(event.target) && 
      !button.contains(event.target)) {
    menu.classList.remove("open");
  }
});

//lenis
const lenis = new Lenis()
lenis.on('scroll',(e)=>{
  // console.log(e)
})

function raf(time){
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)