fetch("http://localhost:8080/booking/all")

.then(res => res.json())

.then(data => {

    const container =
    document.getElementById("bookingContainer");

    const emptyState =
    document.getElementById("emptyState");

    container.innerHTML = "";

    if(data.length === 0){

        emptyState.style.display = "block";
        return;
    }

    emptyState.style.display = "none";

    data.forEach(booking => {

        container.innerHTML += `

        <div class="booking-card">

            <h3>Vehicle ID:
            ${booking.vehicleId}</h3>

            <p>
            User ID:
            ${booking.userId}
            </p>

            <p>
            Start Date:
            ${booking.startDate}
            </p>

            <p>
            End Date:
            ${booking.endDate}
            </p>

            <p class="status">
            ${booking.status}
            </p>

        </div>

        `;

    });

})

.catch(error => {

    console.log(error);

});