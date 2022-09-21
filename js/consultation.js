

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

const firebaseConfig = {
    apiKey: "AIzaSyDGLn2Yqhwapd9znbJjGAOPzdHcm2Rmidg",
    authDomain: "consultation-form-97ed5.firebaseapp.com",
    databaseURL: "https://consultation-form-97ed5-default-rtdb.firebaseio.com",
    projectId: "consultation-form-97ed5",
    storageBucket: "consultation-form-97ed5.appspot.com",
    messagingSenderId: "22750241094",
    appId: "1:22750241094:web:3a7b3dd428fcf5380a8547"
};

//import firebaseConfig from './js/firebase.js';
firebase.initializeApp(firebaseConfig);

let formMessage = firebase.database().ref('CONSULTATION');
document.getElementById('consultationForm')
document.addEventListener('submit', formSubmit, sendMessage);

function formSubmit(e) {
    e.preventDefault();
    let email = document.querySelector('#email').value;
    let name = document.querySelector('#name').value;
    let telephone = document.querySelector('#telephone').value;
    let textarea = document.querySelector('#textarea').value;

    sendMessage(name, email, telephone, textarea);
    document.querySelector('.alert').style.display = 'block';
    setTimeout(function() {
        document.querySelector('.alert').style.display = 'none';
    }, 5000);
    document.getElementById('consultationForm').reset();
}

function sendMessage(name, email, telephone, textarea) {
    let newFormMessage = formMessage.push();
    newFormMessage.set({
        name: name,
        email: email,
        telephone: telephone,
        textarea: textarea
    });
}
