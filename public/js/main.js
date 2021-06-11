// Slide trang dau shopee
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 1000); // Change image every 2 seconds
}

// Slide thoi trang shopee

let slidePosition = 0;
const slides = document.getElementsByClassName('product');
const totalSlides = slides.length;

// document.getElementById('carousel_button-next').addEventListener("click", function () {
//   moveToNextSlide();
// });
document.addEventListener('carousel_button-next', function() {
  slides.addEventListener('click', false)
})

// document.getElementById('carousel_button-prev').addEventListener("click", function () {
//   moveToNextSlide();
// });

document.addEventListener('carousel_button-prev', function() {
  slides.addEventListener('click', false)
})

