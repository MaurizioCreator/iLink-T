const dots = document.getElementsByClassName('dot'),
    dotsBox = document.querySelector('.dots_list'),
    prevBtn = document.querySelector('.prev'),
    nextBtn = document.querySelector('.next'),
    slide = document.querySelector('.background-img'),
    slides = [
        'images/content/slide1.jpg',
        'images/content/slide2.jpg',
        'images/content/slide3.jpg'
    ];
let slideIndex = 0;


function showSlides(n) {
    if (n < 0) {
        slideIndex = slides.length - 1;
    } else if (n > slides.length - 1) {
        slideIndex = 0;
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    slide.src = slides[slideIndex];
    dots[slideIndex].classList.add('active');
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

prevBtn.onclick = function () {
    plusSlides(-1);
}

nextBtn.onclick = function () {
    plusSlides(1);
}

dotsBox.onclick = function (event) {
    for (let i = 0; i < dots.length; i++) {
        if (event.target.classList.contains('dot') && event.target === dots[i]) {
            currentSlide(i);
        }
    }
}

