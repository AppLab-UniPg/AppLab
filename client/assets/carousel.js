//slideshow
let slideIndex = 0;

function plusSlides(n) {
  slideIndex += n
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (slideIndex > slides.length) {
    slideIndex = 1 
  }
  if (slideIndex < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}

timeout();
function timeout() {
  setTimeout(function () {
      plusSlides(1);
      timeout();
  }, 5000);
}
