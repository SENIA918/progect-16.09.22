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

function getCatalog() {
    document.getElementById('resultMessages').innerHTML = '<table id="resultCatalog">';
    const table = document.getElementById("resultCatalog");
    let i = 0;
    let body = table.createTBody();

    const catalogRef = firebase.database().ref('CATALOG/');
    catalogRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            let row = body.insertRow(i);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let img = document.createElement('img');
            img.className = 'catalogImg'
            cell2.appendChild(img);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);
                
childSnapshot.forEach(function (childValue) {
    let childKey = childValue.key;
    let childData = childValue.val();
        switch (childKey) {
            case 'image':
                img.src = childData;
                break;
            case 'name':
                cell3.innerHTML = childData;
                break;
            case 'description':
                cell4.innerHTML = '' + childData;
                break;
            case 'price':
                cell5.innerHTML = 'цена :' + childData;
                break;
            default:
                break;
            }
        });
        i = i++;
    });
    function readIssues() {
        catalogRef.orderByChild("price").on("child_added", snap => {
            console.log(snap.val());    
        });
    }
    const priceCheque = document.getElementById('priceCheque');
        priceCheque.onclick = function () {
            readIssues();
        }
    });
};
getCatalog();

