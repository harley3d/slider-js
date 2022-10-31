let divSliderWrap = document.querySelector(".slider-wrap");
let divSliderInner = document.querySelector(".slider-inner");

let divSlides = document.querySelectorAll(".slider-wrap .slide");
let divSlidesLen = divSlides.length;

function createClone(index) {
    let clone = divSlides[index].cloneNode(true);
    clone.classList.remove("active");
    clone.classList.add("clone");
    divSlidesLen++;
    return clone;
}

let divClone =  createClone(divSlidesLen-1);
divClone.dataset.slideIndex = 0;
divSliderInner.prepend(divClone);

divClone =  createClone(0);
divClone.dataset.slideIndex = divSlidesLen-1;
divSliderInner.appendChild(divClone);

let divSliderInnerWith = divSliderWrap.offsetWidth * divSlidesLen;
divSliderInner.style.width = divSliderInnerWith + 'px';



let frame = -divSliderWrap.offsetWidth;

divSliderInner.style.transform = 'translate3d(-600px, 0px, 0px)';

let prev = document.querySelector(".slider-prev");



prev.addEventListener('click', function handler() {

    if (frame >= -divSliderWrap.offsetWidth) {
        frame = -divSliderInnerWith + divSliderWrap.offsetWidth;    
    }
    
   
    let stop = frame + divSliderWrap.offsetWidth;
    let animation = setInterval(function() {  
        prev.removeEventListener('click', handler);
        divSliderInner.style.transform = 'translate3d(' + frame + 'px, 0px, 0px)';
        if (frame >= stop) {
            clearInterval(animation);
            prev.addEventListener('click', handler);
            return;
        }   
        frame += 15;
    }, 20);

    let activeSlide = document.querySelector(".active");
    let nextSlideIndex = Number(activeSlide.dataset.slideIndex)-1;

    if (nextSlideIndex == 0) {
        nextSlideIndex = divSlidesLen - 2;
    }

    activeSlide.classList.remove("active");
    activeSlide = document.querySelector(`[data-slide-index="${nextSlideIndex}"]`);
    activeSlide.classList.add("active");

});


let next = document.querySelector(".slider-next");
next.addEventListener('click', function handler() {
    if (frame <= -divSliderInnerWith + (2*divSliderWrap.offsetWidth)) {
        frame = 0;
    }   
    
    let stop = frame - divSliderWrap.offsetWidth;
    let animation = setInterval(function() { 
        next.removeEventListener('click', handler); 
        divSliderInner.style.transform = 'translate3d(' + frame + 'px, 0px, 0px)';
        if (frame <= stop) {
            clearInterval(animation);
            next.addEventListener('click', handler);
            return;
        }   
        frame -= 15;
    }, 20);




    let activeSlide = document.querySelector(".active");
    let nextSlideIndex = Number(activeSlide.dataset.slideIndex)+1;

    transformValueX = (nextSlideIndex-1)*divSliderWrap.offsetWidth;  

    if (nextSlideIndex == divSlidesLen-1) {
        nextSlideIndex = 1;
    }

    activeSlide.classList.remove("active");
    activeSlide = document.querySelector(`[data-slide-index="${nextSlideIndex}"]`);
    activeSlide.classList.add("active");


});





