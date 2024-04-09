
const apiUrl = 'https://randomuser.me/api/?results=12&inc=name,email,location,picture,dob,cell&noinfo';
const gallery = document.querySelector('.gallery');
let employees = [];

// INITIAL DISPLAY
async function getEmployees() {
    // get the data and display it
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayEmployees(data.results))
}

function displayEmployees(data) {
    // input data into usable array
    employees = data;

    // iterate over the array objects and prepare the HTML
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
        // add the cards to the page
        gallery.insertAdjacentHTML('beforeend', employeeHtml)
    });
}

getEmployees();

// MODAL 
function displayModal(card) {
    const bday = new Date(card.dob.date);

    // prepare modal HTML
    let modalHTML = `
    <div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${card.picture.medium}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${card.name.first} ${card.name.last}</h3>
            <p class="modal-text">${card.email}</p>
            <p class="modal-text cap">${card.location.city}</p>
            <hr>
            <p class="modal-text">${card.cell}</p>
            <p class="modal-text">${card.location.street.number} ${card.location.street.name}., 
                ${card.location.city}, ${card.location.state} ${card.location.postcode}</p>
            <p class="modal-text">Birthday: ${bday.getMonth() + 1}/${bday.getDate()}/${bday.getFullYear()}</p>
        </div>
    </div>
    `;

    // add the modal card to the page
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const closeButton = document.querySelector('.modal-close-btn');
    const modalContainer = document.querySelector('.modal-container');

    // close the modal window when the x is clicked
    closeButton.addEventListener('click', () => {
        modalContainer.remove();
    });
};


gallery.addEventListener('click', (e) => {
    if (e.target.closest('.card')) {
        const employeeCard = e.target.closest('.card')
        .querySelector('.card-info-container')
        .querySelector('#name')
        .textContent;

        // define which card was clicked
        function wasClicked(card) {
            const fullName = `${card.name.first} ${card.name.last}` 
            return fullName === employeeCard;
        }

        // display the modal window for the clicked employee card
        displayModal(employees.find(wasClicked));
    }
});