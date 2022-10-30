let sliderWrap = document.querySelector(".slider-wrap");
let sliderInner = document.querySelector(".slider-inner");
let slides = document.querySelectorAll(".slider-wrap .slide");

let slidesLen = slides.length;

function createClone(index) {
    let clone = slides[index].cloneNode(true);
    clone.classList.remove("active");
    clone.classList.add("clone");
    slidesLen++;
    return clone;
}

// let clone =  createClone(slidesLen-1);
// clone.dataset.slideIndex = 0;
// sliderInner.prepend(clone);

clone =  createClone(0);
clone.dataset.slideIndex = slidesLen-1;
sliderInner.appendChild(clone);

// sliderInner.style.transform = 'translate3d(-' + sliderWrap.offsetWidth + 'px, 0px, 0px)';

console.log(slidesLen);

let sliderInnerWith = sliderWrap.offsetWidth * slidesLen + 'px';
sliderInner.style.width = sliderInnerWith;



let transformValueX = 0;
let frame = 0;

let prev = document.querySelector(".slider-prev");
let next = document.querySelector(".slider-next");


prev.addEventListener('click', function() {
    
    let activeSlide = document.querySelector(".active");
    let nextSlideIndex = Number(activeSlide.dataset.slideIndex)+1;

    transformValueX = (nextSlideIndex-1)*sliderWrap.offsetWidth;  

    if (nextSlideIndex == slidesLen) {
        nextSlideIndex = 1;


    }

    activeSlide.classList.remove("active");
    activeSlide = document.querySelector(`[data-slide-index="${nextSlideIndex}"]`);
    activeSlide.classList.add("active");
       
    let animation = setInterval(function() {  
        sliderInner.style.transform = 'translate3d(-' + frame + 'px, 0px, 0px)';
        if (frame >= transformValueX) {
            clearInterval(animation);
            return;
        }
        frame += 15;
    }, 20);

    if (frame == sliderWrap.offsetWidth * (slidesLen-1)) {
        frame = 0;
    }

});



///-------------------------------------------------------------------------

// let sliderWrap = document.querySelector(".slider-wrap");
// let sliderInner = document.querySelector(".slider-inner");
// let slides = document.querySelectorAll(".slider-wrap .slide");

// let slidesLen = slides.length;

// function createClone(index) {
//     let clone = slides[index].cloneNode(true);
//     clone.classList.remove("active");
//     clone.classList.add("clone");
//     slidesLen++;
//     return clone;
// }

// let clone =  createClone(slidesLen-1);
// clone.dataset.slideIndex = 0;
// sliderInner.prepend(clone);

// clone =  createClone(0);
// clone.dataset.slideIndex = slidesLen-1;
// sliderInner.appendChild(clone);

// sliderInner.style.transform = 'translate3d(-' + sliderWrap.offsetWidth + 'px, 0px, 0px)';

// console.log(slidesLen);

// let sliderInnerWith = sliderWrap.offsetWidth * slidesLen + 'px';
// sliderInner.style.width = sliderInnerWith;



// let transformValueX = 0;
// let frame = 0;

// let prev = document.querySelector(".slider-prev");
// let next = document.querySelector(".slider-next");


// prev.addEventListener('click', function() {
    
//     let activeSlide = document.querySelector(".active");
//     let nextSlideIndex = Number(activeSlide.dataset.slideIndex)+1;

//     transformValueX = (nextSlideIndex-1)*sliderWrap.offsetWidth;  

//     if (nextSlideIndex == slidesLen) {
//         nextSlideIndex = 1;


//     }

//     activeSlide.classList.remove("active");
//     activeSlide = document.querySelector(`[data-slide-index="${nextSlideIndex}"]`);
//     activeSlide.classList.add("active");
       
//     let animation = setInterval(function() {  
//         sliderInner.style.transform = 'translate3d(-' + frame + 'px, 0px, 0px)';
//         if (frame >= transformValueX) {
//             clearInterval(animation);
//             return;
//         }
//         frame += 15;
//     }, 20);

//     if (frame == sliderWrap.offsetWidth * (slidesLen-1)) {
//         frame = 0;
//     }

// });