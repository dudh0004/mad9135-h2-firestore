const cityList = document.querySelector('#city-list');
const cityForm = document.querySelector('#add-city-form');


function renderCity(doc){
    let li = document.createElement('li');
    li.setAttribute('data-id', doc.id);
    let div = document.createElement('span')
    let deleteButton = document.createElement('button');
    let editButton = document.createElement('button');

    editButton.classList.add('editButton');
    deleteButton.classList.add('deleteButton');

    deleteButton.textContent = 'Delete';
    div.textContent = doc.data().name;
    editButton.textContent = 'Edit';
    li.appendChild(div);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    cityList.appendChild(li);
}


// saving data
cityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('city').add({
        id: Math.floor(Math.random() * 100),
        name: cityForm.name.value
    });
    cityForm.name.value = '';
});


// real-time listener for cities collection
db.collection('city').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderCity(change.doc);
        } else if (change.type == 'removed'){
            let li = cityList.querySelector('[data-id=' + change.doc.id + ']');
            cityList.removeChild(li);
        }
    });
});




const provinceList = document.querySelector('#province-list');
const provinceForm = document.querySelector('#add-province-form');


function renderProvince(doc){
    let li = document.createElement('li');
    li.setAttribute('data-id', doc.id);
    let div = document.createElement('span')
    let deleteButton = document.createElement('button');
    let editButton = document.createElement('button');

    editButton.classList.add('editButton');
    deleteButton.classList.add('deleteButton');

    deleteButton.textContent = 'Delete';
    div.textContent = doc.data().name;
    editButton.textContent = 'Edit';
    li.appendChild(div);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    provinceList.appendChild(li);
}


// real-time listener for province collection
db.collection('province').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderProvince(change.doc);
        } else if (change.type == 'removed'){
            let li = provinceList.querySelector('[data-id=' + change.doc.id + ']');
            provinceList.removeChild(li);
        }
    });
});