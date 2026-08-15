const API_BASE_URL =
    "https://rentx-production-513d.up.railway.app";
fetch(`${API_BASE_URL}/user/all`)

.then(res => res.json())

.then(users => {

    document
    .getElementById(
    "usersCount"
    )

    .innerText =
    users.length;

    const container =

    document
    .getElementById(
    "userContainer"
    );

    users.forEach(user => {

        container.innerHTML += `

        <div class="user-card">

            <h3>
            ${user.name}
            </h3>

            <p>
            ${user.email}
            </p>

        </div>

        `;

    });

});

fetch(`${API_BASE_URL}/vehicle/all`)

.then(res => res.json())

.then(data => {

    document
    .getElementById(
    "vehicleCount"
    )

    .innerText =
    data.length;

});

fetch(`${API_BASE_URL}/booking/all`)

.then(res => res.json())

.then(data => {

    document
    .getElementById(
    "bookingCount"
    )

    .innerText =
    data.length;

});