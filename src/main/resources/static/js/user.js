const API_BASE_URL =
    "https://rentx-production-513d.up.railway.app";

const userId =
    localStorage.getItem("userId");


/* CHECK LOGIN */

if (!userId) {

    alert("Please Login First");

    window.location.href =
        "login.html";
}


let allVehicles = [];


/* LOAD VEHICLES */

function loadVehicles() {

    fetch(`${API_BASE_URL}/vehicle/all`)

        .then(res => res.json())

        .then(data => {

            allVehicles = data;

            displayVehicles(data);

        })

        .catch(error => {

            console.log(error);

            alert("Unable to load vehicles");

        });

}


/* DISPLAY VEHICLES */

function displayVehicles(vehicles) {

    const container =
        document.getElementById("vehicleContainer");

    container.innerHTML = "";


    vehicles.forEach(vehicle => {

        container.innerHTML += `

        <div class="card">

            <img src="${
                vehicle.imageBase64
                ? `data:image/jpeg;base64,${vehicle.imageBase64}`
                : "https://via.placeholder.com/300"
            }">

            <div class="info">

                <h2>${vehicle.name}</h2>

                <p>${vehicle.type}</p>

                <h3>Rs. ${vehicle.price}</h3>

                <button
                    onclick="openModal(${vehicle.id})">

                    View Details

                </button>

            </div>

        </div>

        `;

    });

}


/* SEARCH VEHICLES */

function searchVehicles() {

    const searchText =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();


    const filteredVehicles =
        allVehicles.filter(vehicle =>

            vehicle.name
                .toLowerCase()
                .includes(searchText)

            ||

            vehicle.type
                .toLowerCase()
                .includes(searchText)

        );


    displayVehicles(filteredVehicles);

}


/* FILTER VEHICLES */

function filterVehicles(category) {

    if (category === "all") {

        displayVehicles(allVehicles);

        return;

    }


    const filteredVehicles =
        allVehicles.filter(vehicle =>

            vehicle.type
                .toLowerCase() === category

        );


    displayVehicles(filteredVehicles);

}


/* GO PAYMENT */

function goPayment(vehicleId) {

    localStorage.setItem(
        "vehicleId",
        vehicleId
    );


    window.location.href =
        "payment.html";

}


/* LOGOUT */

function logout() {

    localStorage.clear();

    window.location.href =
        "login.html";

}


/* INITIAL LOAD */

loadVehicles();


/* SCROLL TO VEHICLES */

function scrollToVehicles() {

    document
        .getElementById("vehiclesSection")
        .scrollIntoView({

            behavior: "smooth"

        });

}


/* DARK / LIGHT THEME */

function toggleTheme() {

    document.body
        .classList
        .toggle("dark");

}


/* OPEN VEHICLE MODAL */

function openModal(id) {

    const vehicle =
        allVehicles.find(v =>
            v.id === id
        );


    if (!vehicle) {

        return;

    }


    document
        .getElementById("vehicleModal")
        .style.display = "flex";


    document
        .getElementById("modalImage")
        .src =
        vehicle.imageBase64
        ? `data:image/jpeg;base64,${vehicle.imageBase64}`
        : "https://via.placeholder.com/300";


    document
        .getElementById("modalName")
        .innerText =
        vehicle.name;


    document
        .getElementById("modalType")
        .innerText =
        vehicle.type;


    document
        .getElementById("modalPrice")
        .innerText =
        "Rs. " + vehicle.price;


    document
        .getElementById("bookBtn")
        .onclick = () => {

            goPayment(vehicle.id);

        };


    loadReviews(vehicle.id);

}


/* CLOSE MODAL */

function closeModal() {

    document
        .getElementById("vehicleModal")
        .style.display =
        "none";

}


/* REVIEW */

let currentVehicleId = null;


function submitReview() {

    const reviewText =
        document
        .getElementById("reviewText")
        .value;


    if (!reviewText.trim()) {

        alert("Please enter a review");

        return;

    }


    fetch(
        `${API_BASE_URL}/review/add`,

        {

            method: "POST",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body: JSON.stringify({

                vehicleId:
                    currentVehicleId,

                username:
                    localStorage.getItem("userName") || "User",

                rating: 5,

                comment:
                    reviewText

            })

        })

        .then(res => {

            if (!res.ok) {

                throw new Error(
                    "Review failed"
                );

            }

            return res.json();

        })

        .then(data => {

            alert(
                "Review Added ⭐"
            );


            document
                .getElementById("reviewText")
                .value = "";


            loadReviews(
                currentVehicleId
            );

        })

        .catch(error => {

            console.log(error);

            alert(
                "Unable to add review"
            );

        });

}


/* LOAD REVIEWS */

function loadReviews(vehicleId) {

    currentVehicleId =
        vehicleId;


    fetch(
        `${API_BASE_URL}/review/${vehicleId}`
    )

        .then(res => res.json())

        .then(data => {

            const container =
                document
                .getElementById(
                    "reviewContainer"
                );


            if (!container) {

                return;

            }


            container.innerHTML = "";


            data.forEach(review => {

                container.innerHTML += `

                <div class="review-item">

                    ⭐⭐⭐⭐⭐

                    <br>

                    ${review.comment}

                </div>

                `;

            });

        })

        .catch(error => {

            console.log(error);

        });

}


/* LOAD NOTIFICATIONS */

function loadNotifications() {

    const box =
        document
        .getElementById(
            "notificationBox"
        );


    if (!box) {

        return;

    }


    fetch(
        `${API_BASE_URL}/notification/${
            localStorage.getItem("userId")
        }`
    )

        .then(res => res.json())

        .then(data => {

            box.innerHTML = "";


            data.forEach(n => {

                box.innerHTML += `

                <div class="notification-item">

                    ${n.message}

                </div>

                `;

            });


            box.style.display =
                "block";

        })

        .catch(error => {

            console.log(error);

        });

}