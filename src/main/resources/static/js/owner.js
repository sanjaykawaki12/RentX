const API_BASE_URL =
    "https://rentx-production-513d.up.railway.app";


/* ================================
   PROVIDER ACCESS CHECK
================================ */

const userRole =
    localStorage.getItem("userRole");

if (userRole !== "PROVIDER") {

    alert("Access Denied");

    window.location.href =
        "login.html";
}


/* ================================
   ADD VEHICLE
================================ */

function addVehicle() {

    const name =
        document.getElementById("name").value.trim();

    const type =
        document.getElementById("type").value
        .trim()
        .toLowerCase();

    const price =
        document.getElementById("price").value;

    const imageInput =
        document.getElementById("image");


    if (!name || !type || !price) {

        alert("Please fill all vehicle details");

        return;
    }


    if (!imageInput.files[0]) {

        alert("Please select a vehicle image");

        return;
    }


    const providerId =
        localStorage.getItem("userId");


    if (!providerId || providerId === "undefined") {

        alert("Provider ID not found. Please login again.");

        localStorage.clear();

        window.location.href =
            "login.html";

        return;
    }


    const formData =
        new FormData();


    formData.append(
        "name",
        name
    );


    formData.append(
        "type",
        type
    );


    formData.append(
        "price",
        price
    );


    formData.append(
        "providerId",
        providerId
    );


    formData.append(
        "image",
        imageInput.files[0]
    );


    fetch(
        `${API_BASE_URL}/vehicle/add`,
        {
            method: "POST",
            body: formData
        }
    )

    .then(async res => {

        if (!res.ok) {

            const errorText =
                await res.text();

            console.log(
                "Vehicle Add Error:",
                errorText
            );

            throw new Error(
                `Vehicle Add Failed: ${res.status}`
            );
        }

        return res.json();

    })

    .then(data => {

        alert(
            "Vehicle Added Successfully 🚗"
        );


        document.getElementById("name").value = "";
        document.getElementById("type").value = "";
        document.getElementById("price").value = "";
        document.getElementById("image").value = "";


        loadVehicles();
        loadAnalytics();

    })

    .catch(error => {

        console.log(error);

        alert(
            "Vehicle Add Failed ❌"
        );

    });

}


/* ================================
   LOAD VEHICLES
================================ */

function loadVehicles() {

    fetch(
        `${API_BASE_URL}/vehicle/all`
    )

    .then(res => res.json())

    .then(data => {

        const container =
            document.getElementById(
                "vehicleContainer"
            );


        if (!container) {

            return;
        }


        container.innerHTML = "";


        data.forEach(vehicle => {

            container.innerHTML += `

                <div class="card">

                    <img
                        src="${
                            vehicle.imageBase64
                            ? `data:image/jpeg;base64,${vehicle.imageBase64}`
                            : "https://via.placeholder.com/300"
                        }"
                    >

                    <div class="info">

                        <h3>
                            ${vehicle.name}
                        </h3>

                        <p>
                            ${vehicle.type}
                        </p>

                        <h4>
                            Rs. ${vehicle.price}
                        </h4>


                        <button
                            class="edit-btn"
                            onclick="editVehicle(
                                ${vehicle.id},
                                '${vehicle.name}',
                                '${vehicle.type}',
                                ${vehicle.price}
                            )"
                        >
                            Edit
                        </button>


                        <button
                            class="delete-btn"
                            onclick="deleteVehicle(
                                ${vehicle.id}
                            )"
                        >
                            Delete
                        </button>

                    </div>

                </div>

            `;

        });

    })

    .catch(error => {

        console.log(error);

    });

}


/* ================================
   DELETE VEHICLE
================================ */

function deleteVehicle(id) {

    const confirmDelete =
        confirm(
            "Delete this vehicle?"
        );


    if (!confirmDelete) {

        return;
    }


    fetch(
        `${API_BASE_URL}/vehicle/delete/${id}`,
        {
            method: "DELETE"
        }
    )

    .then(async res => {

        if (!res.ok) {

            throw new Error(
                `Delete failed: ${res.status}`
            );
        }

        return res.text();

    })

    .then(() => {

        alert(
            "Vehicle Deleted 🚗"
        );

        loadVehicles();
        loadAnalytics();

    })

    .catch(error => {

        console.log(error);

        alert(
            "Vehicle Delete Failed ❌"
        );

    });

}


/* ================================
   LOAD BOOKINGS
================================ */

function loadBookings() {

    fetch(
        `${API_BASE_URL}/booking/all`
    )

    .then(res => res.json())

    .then(data => {

        const container =
            document.getElementById(
                "bookingContainer"
            );


        if (!container) {

            return;
        }


        container.innerHTML = "";


        data.forEach(booking => {

            container.innerHTML += `

                <div class="booking-card">

                    <h3>
                        Vehicle ID:
                        ${booking.vehicleId}
                    </h3>

                    <p>
                        User ID:
                        ${booking.userId}
                    </p>

                    <p>
                        Status:
                        <b>${booking.status}</b>
                    </p>

                    ${
                        booking.status === "PENDING"

                        ?

                        `

                        <button
                            class="approve-btn"
                            onclick="
                                approveBooking(
                                    ${booking.id}
                                )
                            "
                        >
                            Approve
                        </button>


                        <button
                            class="reject-btn"
                            onclick="
                                rejectBooking(
                                    ${booking.id}
                                )
                            "
                        >
                            Reject
                        </button>

                        `

                        :

                        `

                        <p>
                            Action Completed
                        </p>

                        `
                    }

                </div>

            `;

        });

    })

    .catch(error => {

        console.log(error);

    });

}


/* ================================
   APPROVE BOOKING
================================ */

function approveBooking(id) {

    fetch(
        `${API_BASE_URL}/booking/approve/${id}`,
        {
            method: "PUT"
        }
    )

    .then(async res => {

        if (!res.ok) {

            throw new Error(
                `Approve failed: ${res.status}`
            );
        }

        return res.text();

    })

    .then(() => {

        alert(
            "Booking Approved ✅"
        );

        loadBookings();
        loadAnalytics();

    })

    .catch(error => {

        console.log(error);

        alert(
            "Booking Approval Failed ❌"
        );

    });

}


/* ================================
   REJECT BOOKING
================================ */

function rejectBooking(id) {

    fetch(
        `${API_BASE_URL}/booking/reject/${id}`,
        {
            method: "PUT"
        }
    )

    .then(async res => {

        if (!res.ok) {

            throw new Error(
                `Reject failed: ${res.status}`
            );
        }

        return res.text();

    })

    .then(() => {

        alert(
            "Booking Rejected ❌"
        );

        loadBookings();
        loadAnalytics();

    })

    .catch(error => {

        console.log(error);

        alert(
            "Booking Rejection Failed ❌"
        );

    });

}


/* ================================
   LOGOUT
================================ */

function logout() {

    localStorage.clear();

    alert(
        "Logged Out"
    );

    window.location.href =
        "login.html";
}


/* ================================
   EDIT VEHICLE
================================ */

function editVehicle(
    id,
    oldName,
    oldType,
    oldPrice
) {

    const name =
        prompt(
            "Vehicle Name",
            oldName
        );


    const type =
        prompt(
            "Vehicle Type",
            oldType
        );


    const price =
        prompt(
            "Vehicle Price",
            oldPrice
        );


    if (!name || !type || !price) {

        return;
    }


    fetch(
        `${API_BASE_URL}/vehicle/update/${id}`,
        {

            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({

                name: name,

                type:
                    type.toLowerCase(),

                price:
                    Number(price)

            })

        }
    )

    .then(async res => {

        if (!res.ok) {

            const errorText =
                await res.text();

            console.log(errorText);

            throw new Error(
                `Update failed: ${res.status}`
            );
        }

        return res.json();

    })

    .then(data => {

        alert(
            "Vehicle Updated ✅"
        );

        loadVehicles();

    })

    .catch(error => {

        console.log(error);

        alert(
            "Vehicle Update Failed ❌"
        );

    });

}


/* ================================
   ANALYTICS
================================ */

function loadAnalytics() {


    /* TOTAL VEHICLES */

    fetch(
        `${API_BASE_URL}/vehicle/all`
    )

    .then(res => res.json())

    .then(vehicles => {

        const totalVehicles =
            document.getElementById(
                "totalVehicles"
            );


        if (totalVehicles) {

            totalVehicles.innerText =
                vehicles.length;

        }

    })

    .catch(error => {

        console.log(error);

    });


    /* BOOKINGS */

    fetch(
        `${API_BASE_URL}/booking/all`
    )

    .then(res => res.json())

    .then(bookings => {

        const totalBookings =
            document.getElementById(
                "totalBookings"
            );


        const approvedBookings =
            document.getElementById(
                "approvedBookings"
            );


        const totalRevenue =
            document.getElementById(
                "totalRevenue"
            );


        if (totalBookings) {

            totalBookings.innerText =
                bookings.length;

        }


        const approved =
            bookings.filter(
                b =>
                    b.status === "APPROVED"
            ).length;


        if (approvedBookings) {

            approvedBookings.innerText =
                approved;

        }


        if (totalRevenue) {

            totalRevenue.innerText =
                "Rs. " +
                (approved * 2000);

        }

    })

    .catch(error => {

        console.log(error);

    });

}


/* ================================
   INITIAL LOAD
================================ */

loadVehicles();

loadBookings();

loadAnalytics();