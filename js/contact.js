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

ymaps.ready(function() {
    var myMap = new ymaps.Map('map', {
            center: [52.445184, 30.9919744],
            zoom: 9
        }, {
            searchControlProvider: 'yandex#search'
        }),

        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: blue; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Собственный значок метки',
            balloonContent: 'Это красивая метка'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'images/myIcon.gif',
            // Размеры метки.
            iconImageSize: [50, 42],

            iconImageOffset: [-5, -38]
        }),

        myPlacemarkWithContent = new ymaps.Placemark([52.445184, 30.9919744], {
            balloonContent: 'Мы находимя сдесь',
            iconContent: '&#9742;'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            iconImageHref: 'img/icons/loon-icon.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [15, 15],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        });

    myMap.geoObjects
        .add(myPlacemark)
        .add(myPlacemarkWithContent);
});

async function getWeather() {
    const url = 'http://api.openweathermap.org/data/2.5/weather?id=627907&lang=ru&appid=fff0026d1fd72a7c60e7894402f4345c';
    const res = await fetch(url);
    const data = await res.json();
    document.querySelector('.weatherTitle').textContent = data.name;
    document.querySelector('.weatherForecast').innerHTML = Math.round(data.main.temp - 273) + '&deg;' + 'C';
    document.querySelector('.weatherTime').textContent = data.weather[0]['description'];
}
getWeather();

navigator.geolocation.getCurrentPosition((position) => {
    document.querySelector('.latitude').innerHTML = 'широта:' + position.coords.latitude;
    document.querySelector('.longitude').innerHTML = 'долгота:' + position.coords.longitude;

});

const popup = document.querySelector(".popup-overlay");
const btn = document.querySelector(".box-btn");
const close = document.querySelector(".close");

btn.addEventListener("click", function(event) {
    event.preventDefault();
    popup.classList.remove("hidden");
});

popup.addEventListener("click", function(event) {
    e = event || window.event
    if (e.target == this) {
        popup.classList.add("hidden");
    }
});
close.addEventListener("click", function(event) {
    event.preventDefault();
    popup.classList.add("hidden");
});

const firebaseConfigs = {
    apiKey: "AIzaSyDGLn2Yqhwapd9znbJjGAOPzdHcm2Rmidg",
    authDomain: "consultation-form-97ed5.firebaseapp.com",
    databaseURL: "https://consultation-form-97ed5-default-rtdb.firebaseio.com",
    projectId: "consultation-form-97ed5",
    storageBucket: "consultation-form-97ed5.appspot.com",
    messagingSenderId: "22750241094",
    appId: "1:22750241094:web:3a7b3dd428fcf5380a8547"
};
firebase.initializeApp(firebaseConfigs);

let formMessages = firebase.database().ref('REGISTRATION');

document.getElementById('registrationForm')
document.addEventListener('submit', formSubmit, sendMessage);


function formSubmit(e) {
    e.preventDefault();

    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let passwordTwo = document.querySelector('#repeatPassword').value;

    sendMessage(email, password, passwordTwo);

    if (email === 'admin@123' && password == '111' && passwordTwo == '111') {
        document.location.href = '../html/admin.html';
    }

    document.getElementById('registrationForm').reset();
}

function sendMessage(email, password, repeatPassword) {
    let newFormMessage = formMessage.push();
    newFormMessage.set({
        email: email,
        password: password,
        repeatPassword: repeatPassword
    });
};
