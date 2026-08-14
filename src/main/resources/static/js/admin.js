fetch(
"http://localhost:8080/user/all"
)

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

fetch(
"http://localhost:8080/vehicle/all"
)

.then(res => res.json())

.then(data => {

    document
    .getElementById(
    "vehicleCount"
    )

    .innerText =
    data.length;

});

fetch(
"http://localhost:8080/booking/all"
)

.then(res => res.json())

.then(data => {

    document
    .getElementById(
    "bookingCount"
    )

    .innerText =
    data.length;

});