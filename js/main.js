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

    // Delete Data
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('city').doc(id).delete();
    });

    // Edit Data
    editButton.addEventListener('click', (e) => {
        let element = e.target.parentElement;

        element.textContent = '';

        let form = document.createElement('form');
        let input = document.createElement('input');
        input.classList.add('input');
        let saveButton = document.createElement('button');
        let cancelButton = document.createElement('button');


        saveButton.textContent = 'Save';
        saveButton.classList.add('saveButton');
        cancelButton.textContent = 'Cancel';
        cancelButton.classList.add('cancelButton');

        input.defaultValue = doc.data().name;
        saveButton.setAttribute('data-id', doc.id);

        console.log(doc.data());
        form.appendChild(input);
        form.appendChild(saveButton);
        form.appendChild(cancelButton);

        element.appendChild(form);

        saveButton.addEventListener('click', (e) => {
            let id = e.target.getAttribute('data-id');
            db.collection('city').doc(id).update({
                name: input.value
            })

            element.textContent = '';
        
            div.textContent = input.value;

            li.appendChild(div);
            li.appendChild(editButton);
            li.appendChild(deleteButton);
            element.appendChild(li);
        })

        // cancel data
        cancelButton.addEventListener('click', (e) => {
            cityList.appendChild(li);
        })
    })


};


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

     // Delete Data
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('province').doc(id).delete();
    });

    // Edit Data
    editButton.addEventListener('click', (e) => {
        let element = e.target.parentElement;

        element.textContent = '';

        let form = document.createElement('form');
        let input = document.createElement('input');
        input.classList.add('input');
        let saveButton = document.createElement('button');
        let cancelButton = document.createElement('button');


        saveButton.textContent = 'Save';
        saveButton.classList.add('saveButton');
        cancelButton.textContent = 'Cancel';
        cancelButton.classList.add('cancelButton');

        input.defaultValue = doc.data().name;
        saveButton.setAttribute('data-id', doc.id);

        form.appendChild(input);
        form.appendChild(saveButton);
        form.appendChild(cancelButton);

        element.appendChild(form);

        saveButton.addEventListener('click', (e) => {
            e.preventDefault();
            let id = e.target.getAttribute('data-id');
            db.collection('province').doc(id).update({
                name: input.value
            })

            element.textContent = '';
        
            div.textContent = input.value;

            li.appendChild(div);
            li.appendChild(editButton);
            li.appendChild(deleteButton);
            element.appendChild(li);
        })

        // cancel data
        cancelButton.addEventListener('click', (e) => {
            provinceList.appendChild(li);
        })


    })

    
}


// saving data
provinceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('province').add({
        id: Math.floor(Math.random() * 100),
        name: provinceForm.name.value
    });
    provinceForm.name.value = '';
});

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