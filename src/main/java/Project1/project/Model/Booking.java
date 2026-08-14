package Project1.project.Model;

import jakarta.persistence.*;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Long vehicleId;

    private String startDate;

    private String endDate;

    private String status;

    private String paymentStatus;

    private String fromDate;

    private String toDate;
    // ✅ GETTERS

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getVehicleId() {
        return vehicleId;
    }

    public String getStartDate() {
        return startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public String getStatus() {
        return status;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public String getfromDate() {
        return fromDate;
    }

    public String gettoDate() {
        return toDate;
    }



    // ✅ SETTERS

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setVehicleId(Long vehicleId) {
        this.vehicleId = vehicleId;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public void setfromDate(String fromDates) {
        this.fromDate= fromDate;
    }

    public void sett0Date(String toDates) {
        this.toDate= toDate;
    }
}