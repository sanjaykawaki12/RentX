package Project1.project.Model;

import jakarta.persistence.*;

@Entity
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type;

    private double price;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;

    @Transient
    private String imageBase64;

    private Long providerId;

    // ✅ IMAGE BASE64

    public String getImageBase64() {

        if(image != null){

            return java.util.Base64
                    .getEncoder()
                    .encodeToString(image);

        }

        return null;
    }

    // ✅ GETTERS

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public double getPrice() {
        return price;
    }

    public byte[] getImage() {
        return image;
    }

    public Long getProviderId() {
        return providerId;
    }

    // ✅ SETTERS

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public void setProviderId(Long providerId) {
        this.providerId = providerId;
    }
}