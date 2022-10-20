// let position = 0;
// const slidesToShow = 3;
// const slidesToScroll = 2;
// const container = document.querySelector(".feedback-slider");
// const track = document.querySelector(".slider-track");
// const items = document.querySelectorAll(".feedback-item");
// const btnPrev = document.querySelector(".btn-prev");
// const btnNext = document.querySelector(".btn-next");
// const itemsCount = items.length;
// const itemWidth = container.clientWidth / slidesToShow;
// const movePosition = slidesToScroll * itemWidth;

// items.forEach((item) => {
//   item.style.minWidth = `$(itemWidth)px`;
// });

// btnNext.addEventListener("click", () => {
//   const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
//   position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
//   setPosition();
//   checkBtns();
// });
// btnPrev.addEventListener("click", () => {
//   const itemsLeft = Math.abs(position) / itemWidth;
//   position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
//   setPosition();
//   checkBtns();
// });

// const setPosition = () => {
//   track.style.transform = `translateX(${position}px)`;
// };
// const checkBtns = () => {
//   btnPrev.disabled = position === 0;
//   btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
// };
// checkBtns();

const swiper = new Swiper(".swiper", {
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
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  mousewheel: {
    sensitivity: 1,
    eventsTarget: ".swiper-slide",
  },
  //   autoplay: {
  //     delay: 1200,
  //     stopOnLastSlide: false,
  //     disableOnInteraction: false,
  //   },
  a11y: {
    enabled: true,
    prevSlideMessage: "Previous slide",
    nextSlideMessage: "Next slide",
    firstSlideMessage: "This is the first slide",
    lastSlideMessage: "This is the last slide",
  },
});
// let sliderBlock = document.querySelector(".swiper");
// sliderBlock.addEventListener("mouseleave", function (e) {
//   swiper.params.autoplay.disableOnInteraction = false;
//   swiper.params.autoplay.delay = 1200;
//   swiper.autoplay.start();
// });
// sliderBlock.addEventListener("mouseenter", function (e) {
//   swiper.autoplay.stop();
// });

let sliderBlock = document.querySelector(".swiper");
sliderBlock.addEventListener("mouseenter", function (e) {
  swiper.params.autoplay.disableOnInteraction = false;
  swiper.params.autoplay.delay = 1200;
  swiper.autoplay.start();
});
sliderBlock.addEventListener("mouseleave", function (e) {
  swiper.autoplay.stop();
});
