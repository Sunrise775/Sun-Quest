/*=========================================
            SUN QUEST
        1 Mile at a Time
=========================================*/



/*==========================
        PAGE LOADER
===========================*/

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    const nav = document.querySelector("nav");

    if(nav){
        nav.style.opacity = "0";
    }

    setTimeout(() => {

        loader.style.transition = "opacity 3s ease";

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.remove();

            if(nav){

                nav.style.transition = "opacity 2s ease";

                nav.style.opacity = "1";

            }

            startHeroAnimation();

        },3000);

    },3000);

});


/*==========================
      SMOOTH SCROLL
===========================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});



/*==========================
    ACTIVE NAVIGATION
===========================*/

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 180;

        const sectionHeight = section.clientHeight;

        if(pageYOffset >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});



/*==========================
     SCROLL REVEAL
===========================*/

const revealElements = document.querySelectorAll("section");

const revealOnScroll = () => {

    revealElements.forEach(element => {

        const windowHeight = window.innerHeight;

        const revealTop = element.getBoundingClientRect().top;

        const revealPoint = 120;

        if(revealTop < windowHeight - revealPoint){

            element.classList.add("show");

        }

    });

};

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();



/*==========================
      HERO PARALLAX
===========================*/

const heroVideo = document.getElementById("hero-video");

window.addEventListener("scroll",()=>{

    const scroll = window.scrollY;

    if(heroVideo){

        heroVideo.style.transform =
        `scale(${1.1 + scroll * 0.00015})
         translateY(${scroll * 0.15}px)`;

        heroVideo.style.filter =
        `blur(8px) brightness(${1 - scroll * 0.0006})`;

    }

});



/*==========================
     BACK TO TOP BUTTON
===========================*/

const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.id = "topBtn";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

    if(window.scrollY > 600){

        topButton.style.opacity = "1";

        topButton.style.pointerEvents = "auto";

    }

    else{

        topButton.style.opacity = "0";

        topButton.style.pointerEvents = "none";

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

function animateElement(selector, delay){

    const element = document.querySelector(selector);

    if(!element) return;

    setTimeout(()=>{

        element.style.transition="all 2.5s ease";

        element.style.opacity="1";

        element.style.transform="translateY(0)";

    },delay);

}

function startHeroAnimation(){

    animateElement(".hero-title",0);

    animateElement(".hero-tagline",1500);

    animateElement(".hero-description",3000);

    animateElement(".hero-content .btn",4500);

}
const navbar = document.getElementById("navbar");

window.addEventListener("scroll",()=>{

    if(window.scrollY>80){

        navbar.classList.add("scrolled");

    }

    else{

        navbar.classList.remove("scrolled");

    }

});
const menuBtn =
document.getElementById("menuBtn");

const navMenu =
document.getElementById("navMenu");

menuBtn.addEventListener("click",()=>{

navMenu.classList.toggle("show");

});
/*======================================
        COUNTER ANIMATION
=======================================*/

const counters = document.querySelectorAll(".counter");

let counterStarted = false;

function startCounters(){

    if(counterStarted) return;

    const stats = document.getElementById("stats");

    const top = stats.getBoundingClientRect().top;

    if(top < window.innerHeight - 100){

        counterStarted = true;

        counters.forEach(counter=>{

            const target = +counter.dataset.target;

            let count = 0;

            const speed = target / 120;

            const update = ()=>{

                count += speed;

                if(count < target){

                    counter.innerText =
                    Math.floor(count).toLocaleString();

                    requestAnimationFrame(update);

                }

                else{

                    counter.innerText =
                    target.toLocaleString();

                }

            }

            update();

        });

    }

}

window.addEventListener("scroll",startCounters);

startCounters();
/*======================================
        LIGHTBOX
=======================================*/

const galleryImages =
document.querySelectorAll(".gallery-card img");

const lightbox =
document.getElementById("lightbox");

const lightboxImg =
document.getElementById("lightboxImage");

const closeBtn =
document.getElementById("closeLightbox");

const nextBtn =
document.getElementById("nextImage");

const prevBtn =
document.getElementById("prevImage");

let currentImage = 0;

galleryImages.forEach((img,index)=>{

    img.addEventListener("click",()=>{

        currentImage=index;

        showImage();

    });

});

function showImage(){

    lightbox.classList.add("show");

    lightboxImg.src =
    galleryImages[currentImage].src;

    lightboxImg.alt =
    galleryImages[currentImage].alt;

}

closeBtn.onclick=()=>{

    lightbox.classList.remove("show");

};

nextBtn.onclick=()=>{

    currentImage++;

    if(currentImage>=galleryImages.length){

        currentImage=0;

    }

    showImage();

};

prevBtn.onclick=()=>{

    currentImage--;

    if(currentImage<0){

        currentImage=galleryImages.length-1;

    }

    showImage();

};

document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("show")) return;

    if(e.key==="Escape"){

        lightbox.classList.remove("show");

    }

    if(e.key==="ArrowRight"){

        nextBtn.click();

    }

    if(e.key==="ArrowLeft"){

        prevBtn.click();

    }

});

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.classList.remove("show");

    }

});
/*=========================================
        ROAD SO FAR
=========================================*/

const places={

surigao:{

title:"📍 Surigao City",

text:"My hometown and where my motorcycle journey truly began. Every ride reminds me that every great adventure starts close to home."

},

butuan:{

title:"📍 Siargao",

text:"One of my favorite rides, filled with long highways and memorable moments."

},

bislig:{

title:"📍 Bislig",

text:"Known for its beautiful scenery and unforgettable roads."

},

tandag:{

title:"📍 Albay",

text:"A peaceful destination with relaxing coastal roads."

},

davao:{

title:"📍Dinagat Island",

text:"A major destination that challenged both rider and motorcycle."

},

};

const locations=document.querySelectorAll(".location");

const card=document.getElementById("locationCard");

locations.forEach(location=>{

location.addEventListener("click",()=>{

locations.forEach(item=>item.classList.remove("active"));

location.classList.add("active");

const data=places[location.dataset.place];

card.innerHTML=`

<h2>${data.title}</h2>

<p>${data.text}</p>

<a class="story-btn"
href="journal.html">

Read Full Story →

</a>

`;

});

});