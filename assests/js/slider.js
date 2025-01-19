const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const playPauseButton = document.getElementById('play-pause');

let currentIndex = 0;
let autoSlide = true;
let interval = setInterval(nextSlide, 3000);

function updateSlider(index) {
  slider.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot) => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider(currentIndex);
}

dots.forEach((dot) => {
  dot.addEventListener('click', () => {
    currentIndex = parseInt(dot.dataset.index);
    updateSlider(currentIndex);
  });
});

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

playPauseButton.addEventListener('click', () => {
  autoSlide = !autoSlide;
  playPauseButton.textContent = autoSlide ? '❚❚' : '▶';
  if (autoSlide) {
    interval = setInterval(nextSlide, 3000);
  } else {
    clearInterval(interval);
  }
});