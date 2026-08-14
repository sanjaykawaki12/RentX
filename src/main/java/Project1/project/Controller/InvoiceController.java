package Project1.project.Controller;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.*;

import java.io.OutputStream;

@RestController
public class InvoiceController {

    @GetMapping("/invoice/{id}")

    public void invoice(

            @PathVariable Long id,

            HttpServletResponse response

    ) throws Exception {

        response.setContentType(
                "application/pdf"
        );

        response.setHeader(

                "Content-Disposition",

                "attachment; filename=invoice.pdf"

        );

        OutputStream out =
                response.getOutputStream();

        Document document =
                new Document();

        PdfWriter.getInstance(
                document,
                out
        );

        document.open();

        document.add(

                new Paragraph(
                        "Vehicle Rental Invoice"
                )

        );

        document.add(

                new Paragraph(
                        "Vehicle ID : " + id
                )

        );

        document.add(

                new Paragraph(
                        "Status : SUCCESS"
                )

        );

        document.add(

                new Paragraph(
                        "Thank You For Booking"
                )

        );

        document.close();

        out.close();

    }

}