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

const database = firebase.database();

function saveToFirebase(event) {
  let catalogImg = document.getElementById('catalogImg').value.trim();
  let catalogName = document.getElementById('catalogName').value.trim();
  let catalogDescription = document.getElementById('catalogDescription').value.trim();
  let catalogPrace = document.getElementById('catalogPrace').value.trim();
  let msgId = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

  if (catalogImg.length > 0) {
      writeMessageData(msgId, catalogImg, catalogName, catalogDescription, catalogPrace);
  }
  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('contactResult').innerHTML = '<p>Ваше сообщение отправлено.</p>';
  contactResult.style.color = 'red'
  return false;
};

function writeMessageData(msgId, image, name, description, price) {
  firebase.database().ref('CATALOG/' + msgId).set({
      image: image,
      name: name,
      description: description,
      price: price
  });
};

function getCatalog() {
    document.getElementById('resultMessages').innerHTML = '<table id="resultCatalog">';
    const table = document.getElementById("resultCatalog");
    table.style.margin = "0 auto"
    table.style.border = "solid grey 1px";
    table.style.borderRadius = "5px";
    const header = table.createTHead();
    const row = header.insertRow(0);
    const cell1 = row.insertCell(0);
    cell1.innerHTML = "id";
    const cell2 = row.insertCell(1);
    cell2.innerHTML = "картинка";
    const cell3 = row.insertCell(2);
    cell3.innerHTML = "имя";
    const cell4 = row.insertCell(3);
    cell4.innerHTML = "описание";
    const cell5 = row.insertCell(4);
    cell5.innerHTML = "цена";
    let i = 0;
    let body = table.createTBody();

const catalogRef = firebase.database().ref('CATALOG/');
    catalogRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            let row = body.insertRow(i);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);
            cell1.innerHTML = childSnapshot.key;
            childSnapshot.forEach(function(childValue) {
                let childKey = childValue.key;
                let childData = childValue.val();
                switch (childKey) {
                    case 'image':
                        cell2.innerHTML = childData;
                        break;
                    case 'name':
                        cell3.innerHTML = childData;
                        break;
                    case 'description':
                        cell4.innerHTML = childData;
                        break;
                    case 'price':
                        cell5.innerHTML = childData;
                        break;
                    default:
                        break;
                }
          });
          i = i++;
      });
  });
};

function getConsultation() {
  document.getElementById('resultMessagesCons').innerHTML = '<table id="resultConsultation">';
  const table = document.getElementById("resultConsultation");
  table.style.margin = "0 auto"
  table.style.border = "solid grey 1px";
  table.style.borderRadius = "5px";
  const header = table.createTHead();
  const row = header.insertRow(0);
  const cell1 = row.insertCell(0);
  cell1.innerHTML = "id";
  const cell2 = row.insertCell(1);
  //cell2.innerHTML = "email";
  const cell3 = row.insertCell(2);
  cell3.innerHTML = "имя";
  const cell4 = row.insertCell(3);
  cell4.innerHTML = "телефон";
  const cell5 = row.insertCell(4);
  cell5.innerHTML = "сообщение";
  let i = 0;
  let body = table.createTBody();

const catalogRef = firebase.database().ref('CONSULTATION/');
catalogRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        let row = body.insertRow(i);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        cell1.innerHTML = childSnapshot.key;
        childSnapshot.forEach(function(childValue) {
            let childKey = childValue.key;
            let childData = childValue.val();
                switch (childKey) {
                // case 'email':
                    // cell2.innerHTML = childData;
                    // break;
                case 'name':
                    cell3.innerHTML = childData;
                    break;
                case 'telephone':
                    cell4.innerHTML = childData;
                    break;
                case 'textarea':
                    cell5.innerHTML = childData;
                    break;
                default:
                    break;
                    }
            });
            i = i++;
        });
    });
};

function getRegistration() {
    document.getElementById('resultMessagesRegistration').innerHTML = '<table id="resultRegistration">';
    const table = document.getElementById("resultRegistration");
    table.style.margin = "0 auto"
    table.style.border = "solid grey 1px";
    table.style.borderRadius = "5px";
    const header = table.createTHead();
    const row = header.insertRow(0);
    const cell1 = row.insertCell(0);
    cell1.innerHTML = "id";
    const cell2 = row.insertCell(1);
    cell2.innerHTML = "email";
    const cell3 = row.insertCell(2);
    cell3.innerHTML = "password";
    const cell4 = row.insertCell(3);
    cell4.innerHTML = "repeatPassword";
    let i = 0;
    let body = table.createTBody();
    
const catalogRef = firebase.database().ref('REGISTRATION/');
    catalogRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        let row = body.insertRow(i);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        cell1.innerHTML = childSnapshot.key;
childSnapshot.forEach(function(childValue) {
    let childKey = childValue.key;
    let childData = childValue.val();
        switch (childKey) {
            case 'email':
                cell2.innerHTML = childData;
                break;
            case 'password':
                //cell3.innerHTML = childData;
                break;
            case 'repeatPassword':
                // cell4.innerHTML = childData;
                break;
            default:
                break;
                }
        });
            i = i++;
    });
  });
};