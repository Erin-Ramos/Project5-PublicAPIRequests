const randomUserURL = 'https://randomuser.me/api/?results=12';

async function getEmployees() {
    try {
        const res = await fetch(randomUserURL)
        if (!res.ok) throw new Error('Oops! Something went wrong.');

        const data = await res.json();
        displayEmployees(data);
    } catch (error) {
        console.log(error);
    }

}

function displayEmployees(data) {
    // for each result - display: image, first and last name, email, and city
    data.forEach((results) => {
        
        employeeHtml = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">first last</h3>
                <p class="card-text">email</p>
                <p class="card-text cap">city, state</p>
            </div>
        </div>
        `;
    })
    document.querySelector('.gallery').insertAdjacentHTML('beforeend', 'employeeHtml')
}
