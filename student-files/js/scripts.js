
const apiUrl = 'https://randomuser.me/api/?results=12&inc=name,email,location,picture,dob,cell&noinfo';
const gallery = document.querySelector('.gallery');
let employees = [];

// INITIAL DISPLAY STUFF 
async function getEmployees() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayEmployees(data.results))
}

function displayEmployees(data) {
    employees = data;

    data.forEach((employee) => {
        employeeHtml = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        </div>
        `;
        gallery.insertAdjacentHTML('beforeend', employeeHtml)
    });
}

getEmployees();

// MODAL STUFF

gallery.addEventListener('click', (e) => {
    if (e.target.closest('.card')) {
        const employeeCard = e.target.closest('.card')
        .querySelector('.card-info-container')
        .querySelector('#name')
        .textContent;
        
        displayModal(employeeCard);
    }
});

function displayModal(card) {
    console.log(card);
    let {
        name,
        dob,
        phone,
        email,
        location: { city, street, state, postcode },
        picture
    } = employees[card];

    let date = new Date(dob.date);

    let modalHTML = `
    <div class="modal-container">
        <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
                <p class="modal-text">${email}</p>
                <p class="modal-text cap">${city}, ${state}</p>
                <hr>
                <p class="modal-text">${phone}</p>
                <p class="modal-text">${street}, ${state}, ${postcode}</p>
                <p class="modal-text">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
            </div>
        </div>
    </div>
    `;
}