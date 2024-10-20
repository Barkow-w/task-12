const video = document.getElementById('video');
const play = document.getElementById('play');

const slides = document.querySelector('.container__list__slick__slider');
const dots = document.querySelectorAll('.container__list__slick__pagination__dot');
const playVideo = () => {
    play.style.left = '212px';
    let btn = document.querySelector('.header__content__play');
    setTimeout(() => {
        video.style.display = 'block';
        btn.style.display = 'none';
    }, 1000)

}

const slideCount = document.querySelectorAll('.container__list__slick__slider__item').length;

let currentIndex = 0;
let startX, endX;

const updateSlider = () => {
    const offset = -currentIndex * 20;
    slides.style.transform = `translateX(${offset}%)`;
    updateDots();
}

const updateDots = () => {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

const nextSlide = () => {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlider();
}

const prevSlide = () => {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlider();
}

slides.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX;
    slides.style.transition = 'none';
});

slides.addEventListener('touchmove', (e) => {
    endX = e.touches[0].pageX;
})

slides.addEventListener('touchend', () => {
    const diffX = endX - startX;

    if (diffX > 50) {
        prevSlide();
    } else if (diffX < -50) {
        nextSlide();
    }

    slides.style.transition = 'transform 0.5s ease';
    console.log('good')
});

slides.addEventListener('mouseleave', () => {
    slides.style.transition = 'transform 0.5s ease';
});

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        currentIndex = parseInt(dot.dataset.index);
        updateSlider();
    });
});

