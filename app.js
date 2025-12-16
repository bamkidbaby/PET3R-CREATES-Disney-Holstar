const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});


let carousel = document.querySelector('.carousel');
let sliders = [];

let slideIndex = 0;

const createSlide = () => {
    if (slideIndex >= movies.length) {
        slideIndex = 0;
    }

    //creating Dom element
    let slide = document.createElement('div');
    let imgElement = document.createElement('img');
    let content = document.createElement('div');
    let h1 = document.createElement('h1');
    let p = document.createElement('p');


    //attaching all elements

    h1.appendChild(document.createTextNode(movies[slideIndex].name));
    p.appendChild(document.createTextNode(movies[slideIndex].des));

    content.appendChild(h1);
    content.appendChild(p);
    slide.appendChild(content);
    slide.appendChild(imgElement);
    carousel.appendChild(slide);

    //setting up images which is in slider-data.js
    imgElement.src = movies[slideIndex].image;
    slideIndex++;

    //setting elements
    slide.className = 'slider';
    content.className = 'slide-content';
    h1.className = 'movie-title';
    p.className = 'movie-desc';

    sliders.push(slide);
    if (sliders.length > 8) {
        carousel.removeChild(sliders[0]);
        sliders.shift();
    }

    //adding sliding effect
    if (sliders.length > 1) {
        sliders[0].style.marginLeft =
            `calc(-100% - 30px)`;
    }


}

for (let i = 0; i < 6; i++) {
    createSlide();
}

setInterval(() => {
    createSlide();
}, 3000);



//video cards(play when hovered)
const videoCards = [...document.querySelectorAll('.video-card')];

videoCards.forEach(card => {
  const video = card.querySelector("video");

  card.addEventListener("mouseenter", () => video.play());
  card.addEventListener("mouseleave", () => video.pause());

  card.addEventListener("click", () => {
    video.paused ? video.play() : video.pause();
  });
});



//card slider
document.querySelectorAll('.slider-section').forEach(section => {
  const track = section.querySelector('.slider-track');
  const nextBtn = section.querySelector('.next');
  const prevBtn = section.querySelector('.prev');

  const scrollAmount = 300;

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  // Touch / drag support
  let isDown = false;
  let startX;
  let scrollLeft;

  track.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('mouseleave', () => isDown = false);
  track.addEventListener('mouseup', () => isDown = false);

  track.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
  });
});

