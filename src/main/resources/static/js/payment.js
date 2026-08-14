/*
  IMPORTANT: Replace with your actual Razorpay TEST key id (starts with rzp_test_).
  Never put your Razorpay KEY SECRET in frontend code — that stays on the backend only.
*/
const RAZORPAY_KEY_ID = "rzp_test_XXXXXXXXXXXXXX";

let vehiclePricePerDay = 0;

/* LOAD VEHICLE DETAILS (name + price per day) */
function loadVehicleDetails(){

    const vehicleId = localStorage.getItem("vehicleId");

    fetch(`http://localhost:8080/vehicle/${vehicleId}`)

    .then(res => res.json())

    .then(vehicle => {

        vehiclePricePerDay = vehicle.price;

        document.getElementById("vehicleName").innerText = vehicle.name;
        document.getElementById("pricePerDay").innerText = "Rs. " + vehicle.price + " / day";

        updateAmount();

    })

    .catch(error => {

        console.log(error);
        document.getElementById("vehicleName").innerText = "Vehicle unavailable";

    });

}

/* CALCULATE NIGHTS BETWEEN DATES */
function calculateNights(){

    const fromDate = document.getElementById("fromDate").value;
    const toDate = document.getElementById("toDate").value;

    if(!fromDate || !toDate) return 0;

    const from = new Date(fromDate);
    const to = new Date(toDate);
    const diffTime = to - from;
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return nights > 0 ? nights : 0;

}

/* UPDATE TOTAL AMOUNT DISPLAY */
function updateAmount(){

    const nights = calculateNights();
    const amount = nights * vehiclePricePerDay;

    document.getElementById("totalAmount").innerText = "Rs. " + amount;

    return amount;

}

document.getElementById("fromDate").addEventListener("change", updateAmount);
document.getElementById("toDate").addEventListener("change", updateAmount);

/* START PAYMENT */
function payNow(){

    const vehicleId = localStorage.getItem("vehicleId");
    const userId = localStorage.getItem("userId");
    const fromDate = document.getElementById("fromDate").value;
    const toDate = document.getElementById("toDate").value;

    if(!fromDate || !toDate){
        alert("Please select both from and to dates.");
        return;
    }

    const nights = calculateNights();

    if(nights <= 0){
        alert("To date must be after from date.");
        return;
    }

    const amount = nights * vehiclePricePerDay;

    if(amount <= 0){
        alert("Could not calculate amount. Please try again.");
        return;
    }

    /* Ask backend to create a Razorpay order (amount must be verified server-side) */
    fetch("http://localhost:8080/payment/create-order", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            amount: amount,
            vehicleId: vehicleId
        })

    })

    .then(res => res.json())

    .then(order => {

        openRazorpayCheckout(order, { vehicleId, userId, fromDate, toDate, amount });

    })

    .catch(error => {

        console.log(error);
        alert("Could not start payment. Please try again.");

    });

}

/* OPEN RAZORPAY CHECKOUT MODAL */
function openRazorpayCheckout(order, bookingDetails){

    const options = {

        key: RAZORPAY_KEY_ID,
        amount: order.amount,          // in paise, returned by backend
        currency: order.currency || "INR",
        name: "RIDEX",
        description: "Vehicle booking payment",
        order_id: order.orderId,

        handler: function(response){
            verifyAndBook(response, bookingDetails);
        },

        prefill: {
            name: localStorage.getItem("userName") || ""
        },

        theme: {
            color: "#E4342F"
        },

        modal: {
            ondismiss: function(){
                console.log("Payment popup closed by user");
            }
        }

    };

    const rzp = new Razorpay(options);

    rzp.on('payment.failed', function(response){
        alert("Payment failed: " + response.error.description);
    });

    rzp.open();

}

/* VERIFY SIGNATURE + CREATE BOOKING */
function verifyAndBook(paymentResponse, bookingDetails){

    fetch("http://localhost:8080/payment/verify", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            razorpay_order_id: paymentResponse.razorpay_order_id,
            razorpay_payment_id: paymentResponse.razorpay_payment_id,
            razorpay_signature: paymentResponse.razorpay_signature,

            userId: bookingDetails.userId,
            vehicleId: bookingDetails.vehicleId,
            startDate: bookingDetails.fromDate,
            endDate: bookingDetails.toDate,
            amount: bookingDetails.amount

        })

    })

    .then(res => res.json())

    .then(data => {

        alert("Booking Successful 🚗");
        window.location.href = "user.html";

    })

    .catch(error => {

        console.log(error);
        alert("Payment succeeded but booking could not be confirmed. Please contact support with your payment ID: " + paymentResponse.razorpay_payment_id);

    });

}

/* DOWNLOAD INVOICE */
function downloadInvoice(){

    const vehicleId = localStorage.getItem("vehicleId");

    window.open(

    `http://localhost:8080/invoice/${vehicleId}`,

    "_blank"

    );

}

/* INITIAL LOAD */
loadVehicleDetails();