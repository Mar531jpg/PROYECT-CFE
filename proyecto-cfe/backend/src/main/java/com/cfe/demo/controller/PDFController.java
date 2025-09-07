package com.cfe.demo.controller;

import com.cfe.demo.model.DatosFormulario;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.property.TextAlignment;
import com.itextpdf.layout.property.VerticalAlignment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "*")
public class PDFController {

    @PostMapping("/generar-pdf")
    public void generarPDF(@RequestBody DatosFormulario datos, HttpServletResponse response) throws IOException {
        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=FormatoCFE.pdf");

        PdfWriter writer = new PdfWriter(response.getOutputStream());
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf, PageSize.LETTER);

        // Cargar la imagen de plantilla desde resources/static
        ClassPathResource imgRes = new ClassPathResource("static/formato_cfe.png");
        byte[] imgBytes = imgRes.getInputStream().readAllBytes();
        Image fondo = new Image(ImageDataFactory.create(imgBytes));
        fondo.setFixedPosition(0, 0);
        fondo.scaleToFit(PageSize.LETTER.getWidth(), PageSize.LETTER.getHeight());
        document.add(fondo);

        // Posicionar textos (ajusta coordenadas según tu plantilla real)
        document.showTextAligned(new Paragraph(datos.getTrabajador() == null ? "" : datos.getTrabajador()),
                120, 620, 1, TextAlignment.LEFT, VerticalAlignment.TOP, 0);

        document.showTextAligned(new Paragraph(String.valueOf(datos.getHoras())),
                450, 500, 1, TextAlignment.LEFT, VerticalAlignment.TOP, 0);

        document.showTextAligned(new Paragraph(datos.getFecha() == null ? "" : datos.getFecha()),
                450, 720, 1, TextAlignment.LEFT, VerticalAlignment.TOP, 0);

        document.close();
    }
}
