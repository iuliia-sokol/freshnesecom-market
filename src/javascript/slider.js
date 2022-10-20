import Swiper, {
  Navigation,
  Autoplay,
  Keyboard,
  Mousewheel,
  A11y,
} from 'swiper';

Swiper.use([Navigation, Autoplay, Keyboard, Mousewheel, A11y]);
const swiper = new Swiper('.swiper', {
  speed: 1200,
  spaceBetween: 32,
  slidesPerView: 3,
  slidesPerGroup: 1,
  rewind: true,
  watchOverflow: true,
  grabCursor: true,
  simulateTouch: true,
  initialSlide: 1,
  //   setWrapperSize: false,
  //   loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  mousewheel: {
    sensitivity: 1,
    eventsTarget: '.swiper-slide',
  },
  autoplay: {
    // delay: 1200,
    // stopOnLastSlide: false,
    // disableOnInteraction: false,
  },
  a11y: {
    enabled: true,
    prevSlideMessage: 'Previous slide',
    nextSlideMessage: 'Next slide',
    firstSlideMessage: 'This is the first slide',
    lastSlideMessage: 'This is the last slide',
  },
});
console.log(swiper);

let sliderBlock = document.querySelector('.swiper');
sliderBlock.addEventListener('mouseleave', function (e) {
  swiper.params.autoplay.disableOnInteraction = false;
  swiper.params.autoplay.delay = 1200;
  swiper.autoplay.start();
});
sliderBlock.addEventListener('mouseenter', function (e) {
  swiper.autoplay.stop();
});

// let sliderBlock = document.querySelector('.swiper');
// sliderBlock.addEventListener('mouseenter', function (e) {
//   swiper.params.autoplay.disableOnInteraction = false;
//   swiper.params.autoplay.delay = 1200;
//   swiper.autoplay.start();
// });
// sliderBlock.addEventListener('mouseleave', function (e) {
//   swiper.autoplay.stop();
// });
