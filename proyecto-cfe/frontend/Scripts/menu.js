$(document).ready(function() {

  $('#formTiempoExtra').on('submit', function(e) {
    e.preventDefault();

    const datos = {
      trabajador: $('#trabajador').val().trim(),
      horas: parseInt($('#horas').val() || "0"),
      fecha: $('#fecha').val()
    };

    $.ajax({
      url: "http://localhost:8080/generar-pdf",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(datos),
      xhrFields: {
        responseType: 'blob' 
      },
      success: function(blob) {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "FormatoCFE.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      },
      error: function(error) {
        alert("No se pudo generar el PDF: " + error);
      }
    });
  });

  $('#btnRegresar').on('click', function() {
    window.location.href = "index.html";
  });

});
