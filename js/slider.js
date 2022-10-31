const FRAME_SPEED = 30;
const FRAME_TIME = 20;

const SLIDER_WIDTH = document.querySelector(".slider-wrap").offsetWidth;

let sliderTrack = document.querySelector(".slider-track");

let slides = document.querySelectorAll(".slider-wrap .slide");
let slidesLen = slides.length;

let sliderNav = document.querySelector(".slider-nav");
for(let i = 1; i <= slidesLen; i++) {
    let active = (i == 1) ? 'active-item' : '';
    sliderNav.innerHTML += `<li class="slider-nav-item ${active}" data-item-index="${i}"><button class="slider-nav-item-btn">${i}</button></li>`;   
}

let itemsLen = slides.length;

function createCloneTags(index) {
    let clone = slides[index].cloneNode(true);
    if (clone.classList.contains("active")) {
        clone.classList.remove("active");
    }    
    clone.classList.add("clone");
    slidesLen++;
    return clone;
}

let slideClone =  createCloneTags(slidesLen-1);
slideClone.dataset.slideIndex = 0;
sliderTrack.prepend(slideClone);

slideClone =  createCloneTags(0);
slideClone.dataset.slideIndex = slidesLen-1;
sliderTrack.appendChild(slideClone);

const SLIDER_TRACK_WIDTH = SLIDER_WIDTH * slidesLen;
sliderTrack.style.width = SLIDER_TRACK_WIDTH + 'px';

function removeActiveClass(elems, clsName) {
    for (let elem of elems) {
        if (elem.classList.contains(clsName)) {
            elem.classList.remove(clsName);
        }
    }
}

let items = document.querySelectorAll(".slider-nav-item");
let activeItem = items[0].dataset.itemIndex

let frame = -SLIDER_WIDTH;
sliderTrack.style.transform = 'translate3d(' + frame + 'px, 0px, 0px)';

let currentSlide = 1;

function showAnimationPrev(btn, funcName, stopFrame='-') {
    

    let stop = (stopFrame == '-') ? frame + SLIDER_WIDTH : stopFrame;
    let animation = setInterval(function() {  
        btn.removeEventListener('click', funcName);
        sliderTrack.style.transform = 'translate3d(' + frame + 'px, 0px, 0px)';
        if (frame >= stop) {
            clearInterval(animation);
            btn.addEventListener('click', funcName);
            return;
        }   
        frame += FRAME_SPEED;
    }, FRAME_TIME);
}

let prev = document.querySelector(".slider-prev");
prev.addEventListener('click', function handler() {
    if (frame >= -SLIDER_WIDTH) {
        frame = -SLIDER_TRACK_WIDTH + SLIDER_WIDTH;    
    }

    showAnimationPrev(prev, handler);

    let activeSlide = document.querySelector(".active");
    let nextSlideIndex = Number(activeSlide.dataset.slideIndex)-1;



    if (nextSlideIndex == 0) {
        nextSlideIndex = slidesLen - 2;
    }

    activeSlide.classList.remove("active");
    activeSlide = document.querySelector(`[data-slide-index="${nextSlideIndex}"]`);
    activeSlide.classList.add("active");

    removeActiveClass(items, 'active-item');
    items[nextSlideIndex-1].classList.add('active-item');  
    currentSlide = nextSlideIndex;
});

function showAnimationNext(btn, funcName, stopFrame = '-') { 
    
    let stop = (stopFrame == '-') ? frame - SLIDER_WIDTH : stopFrame;
    let animation = setInterval(function() { 
        btn.removeEventListener('click', funcName); 
        sliderTrack.style.transform = 'translate3d(' + frame + 'px, 0px, 0px)';
        if (frame <= stop) {
            clearInterval(animation);
            btn.addEventListener('click', funcName);
            return;
        }   
        frame -= FRAME_SPEED;
    }, FRAME_TIME);
}

let next = document.querySelector(".slider-next");
next.addEventListener('click', function handler() {
    if (frame <= -SLIDER_TRACK_WIDTH + (2*SLIDER_WIDTH)) {
        frame = 0;
    }  

    showAnimationNext(next, handler);

    let activeSlide = document.querySelector(".active");
    let nextSlideIndex = Number(activeSlide.dataset.slideIndex)+1;

    if (nextSlideIndex == slidesLen-1) {
        nextSlideIndex = 1;
    }

    activeSlide.classList.remove("active");
    activeSlide = document.querySelector(`[data-slide-index="${nextSlideIndex}"]`);
    activeSlide.classList.add("active");

    removeActiveClass(items, 'active-item');
    items[nextSlideIndex-1].classList.add('active-item');
    currentSlide = nextSlideIndex;   
});


for (let item of items) {
    item.addEventListener('click', function handler(){

    removeActiveClass(items, 'active-item');
    item.classList.add('active-item');    
    let itemIndex = Number(item.dataset.itemIndex);
          
    frame = -SLIDER_WIDTH*currentSlide;

    removeActiveClass(slides, 'active');
    slides[itemIndex-1].classList.add('active');  

    if (itemIndex >= currentSlide) {       
        currentSlide = itemIndex;
        let stop = -SLIDER_WIDTH*itemIndex;
        showAnimationNext(item, handler, stop);

    } else {       
        currentSlide = itemIndex; 
        let stop = -SLIDER_WIDTH*itemIndex;
        showAnimationPrev(item, handler, stop);
    }


    });
}



