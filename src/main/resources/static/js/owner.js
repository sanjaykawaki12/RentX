const userRole = localStorage.getItem("userRole");

if(userRole !== "PROVIDER"){

    alert("Access Denied");

    window.location.href = "login.html";
}
/* ADD VEHICLE */

function addVehicle(){

    const formData = new FormData();

    formData.append(
        "name",
        document.getElementById("name").value
    );

    formData.append(
        "type",
        document.getElementById("type")
        .value
        .toLowerCase()
    );

    formData.append(
        "price",
        document.getElementById("price").value
    );

    formData.append(
        "providerId",
        localStorage.getItem("userId")
    );

    formData.append(
        "image",
        document.getElementById("image").files[0]
    );

    fetch("http://localhost:8080/vehicle/add",{

        method:"POST",

        body:formData

    })

    .then(res => res.json())

    .then(data => {

        alert("Vehicle Added Successfully 🚗");

        loadVehicles();

    })

    .catch(error => {

        console.log(error);

        alert("Vehicle Add Failed");

    });

}

/* LOAD VEHICLES */

function loadVehicles(){

    fetch("http://localhost:8080/vehicle/all")

    .then(res => res.json())

    .then(data => {

        const container =
        document.getElementById("vehicleContainer");

        container.innerHTML = "";

        data.forEach(vehicle => {

            container.innerHTML += `

            <div class="card">

                <img src="${
                vehicle.imageBase64
                ? `data:image/jpeg;base64,${vehicle.imageBase64}`
                : 'https://via.placeholder.com/300'
                }">

                <div class="info">

                    <h3>${vehicle.name}</h3>

                    <p>${vehicle.type}</p>

                    <h4>Rs. ${vehicle.price}</h4>
                       <button
                       class="edit-btn"
                       onclick="editVehicle(${vehicle.id},
                       '${vehicle.name}',
                       '${vehicle.type}',
                       ${vehicle.price})">

                       Edit

                       </button>
                    <button
                    class="delete-btn"
                    onclick="deleteVehicle(${vehicle.id})">

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

/* DELETE VEHICLE */

function deleteVehicle(id){

    const confirmDelete =
    confirm("Delete this vehicle?");

    if(confirmDelete){

        fetch(
        `http://localhost:8080/vehicle/delete/${id}`,

        {
            method:"DELETE"
        })

        .then(() => {

            alert("Vehicle Deleted 🚗");

            loadVehicles();

        })

        .catch(error => {

            console.log(error);

        });

    }

}

/* LOAD BOOKINGS */

function loadBookings(){

    fetch("http://localhost:8080/booking/all")

    .then(res => res.json())

    .then(data => {

        const container =
        document.getElementById("bookingContainer");

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
                onclick="approveBooking(${booking.id})">

                Approve

                </button>

                <button
                class="reject-btn"
                onclick="rejectBooking(${booking.id})">

                Reject

                </button>

                `

                :

                `

                <p>Action Completed</p>

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

/* APPROVE BOOKING */

function approveBooking(id){

    fetch(
    `http://localhost:8080/booking/approve/${id}`,

    {
        method:"PUT"
    })

    .then(() => {

        alert("Booking Approved ✅");

        loadBookings();

    })

    .catch(error => {

        console.log(error);

    });

}

/* REJECT BOOKING */

function rejectBooking(id){

    fetch(
    `http://localhost:8080/booking/reject/${id}`,

    {
        method:"PUT"
    })

    .then(() => {

        alert("Booking Rejected ❌");

        loadBookings();

    })

    .catch(error => {

        console.log(error);

    });

}

/* LOGOUT */

function logout(){

    localStorage.clear();

    alert("Logged Out");

    window.location.href =
    "login.html";
}

/* INITIAL LOAD */

loadVehicles();

loadBookings();

loadAnalytics();

function editVehicle(
    id,
    oldName,
    oldType,
    oldPrice
){

    const name =
    prompt("Vehicle Name", oldName);

    const type =
    prompt("Vehicle Type", oldType);

    const price =
    prompt("Vehicle Price", oldPrice);

    if(!name || !type || !price){

        return;
    }

    fetch(
    `http://localhost:8080/vehicle/update/${id}`,

    {

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            name:name,

            type:type,

            price:price

        })

    })

    .then(res => res.json())

    .then(data => {

        alert("Vehicle Updated ✅");

        loadVehicles();

    })

    .catch(error => {

        console.log(error);

    });

}
function loadAnalytics(){

    fetch("http://localhost:8080/vehicle/all")

    .then(res => res.json())

    .then(vehicles => {

        document.getElementById(
        "totalVehicles"
        ).innerText = vehicles.length;

    });

    fetch("http://localhost:8080/booking/all")

    .then(res => res.json())

    .then(bookings => {

        document.getElementById(
        "totalBookings"
        ).innerText = bookings.length;

        const approved =

        bookings.filter(
        b => b.status === "APPROVED"
        ).length;

        document.getElementById(
        "approvedBookings"
        ).innerText = approved;

        document.getElementById(
        "totalRevenue"
        ).innerText =
        "Rs. " + (approved * 2000);

    });

}