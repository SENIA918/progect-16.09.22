const navbar = document.querySelector(".navbar");
navbar.querySelector(".toggle").addEventListener("click", () => {
  navbar.classList.toggle("collapsed");
});
window.addEventListener("scroll", e => {
  let windowY = window.pageYOffset;
  let navbarHeight = document.querySelector(".navbar").offsetHeight;
  if (windowY > navbarHeight) navbar.classList.add("sticky");
  else navbar.classList.remove("sticky");
});

let slideIndex = 1;
showSlides(slideIndex);
    next.onclick = function () {
    showSlides(slideIndex += 1);
}
    prev.onclick = function() {
    showSlides(slideIndex -= 1);  
}
function showSlides(img) {
    let i;
    let slides = document.getElementsByClassName('item');
    let sliderDotsItem = document.getElementsByClassName('sliderDotsItem');
    if (img > slides.length) {
      slideIndex = 1
    }
    if (img < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    for (i = 0; i < sliderDotsItem.length; i++) {
        sliderDotsItem[i].className = sliderDotsItem[i].className.replace(' active', '');
    }
    slides[slideIndex - 1].style.display = 'block';
    sliderDotsItem[slideIndex - 1].className += ' active';
}
function autoSlider() {
    showSlides(slideIndex += 1);
}
setInterval(autoSlider, 5000);

const popup = document.querySelector(".popup-overlay");
    const btn = document.querySelector(".box-btn");
    const close = document.querySelector(".close");

    btn.addEventListener("click", function(event){
        event.preventDefault();
        popup.classList.remove("hidden");
    });

    popup.addEventListener("click", function(event) {
      e = event || window.event
      if (e.target == this) {
        popup.classList.add("hidden");
      }
    });
    
    close.addEventListener("click", function(event){
        event.preventDefault();
        popup.classList.add("hidden");
    });
   
    const firebaseConfig = {
      apiKey: "AIzaSyDGLn2Yqhwapd9znbJjGAOPzdHcm2Rmidg",
      authDomain: "consultation-form-97ed5.firebaseapp.com",
      databaseURL: "https://consultation-form-97ed5-default-rtdb.firebaseio.com",
      projectId: "consultation-form-97ed5",
      storageBucket: "consultation-form-97ed5.appspot.com",
      messagingSenderId: "22750241094",
      appId: "1:22750241094:web:3a7b3dd428fcf5380a8547"
    };
    firebase.initializeApp(firebaseConfig);
    
    let formMessage = firebase.database().ref('REGISTRATION');
    
    document.getElementById('registrationForm')
    document.addEventListener('submit', formSubmit, sendMessage);
    
  function formSubmit(e) {
    e.preventDefault();
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let passwordTwo= document.querySelector('#repeatPassword').value;
    sendMessage( email, password,passwordTwo);

      if (email ==='admin@123' && password == '111' && passwordTwo == '111'){
          document.location.href = 'html/admin.html';
      }
      document.getElementById('registrationForm').reset();
    }

    function sendMessage(email, password,repeatPassword) {
      let newFormMessage = formMessage.push();
      newFormMessage.set ({
        email: email,
        password: password,
        repeatPassword: repeatPassword
      });
    };