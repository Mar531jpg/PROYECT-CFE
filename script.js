// Simulación de login local
    document.getElementById("loginForm").addEventListener("submit", function(e){
      e.preventDefault();
      document.getElementById("loginDiv").style.display = "none";
      document.getElementById("menuDiv").style.display = "block";
    });

    // Enviar datos al backend y descargar PDF 
    document.getElementById("formTiempoExtra").addEventListener("submit", async function(e){
      e.preventDefault();
      const datos = {
        trabajador: document.getElementById("trabajador").value,
        horas: parseInt(document.getElementById("horas").value || "0"),
        fecha: document.getElementById("fecha").value
      };
      try{
        const response = await fetch("http://localhost:8080/generar-pdf", {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(datos)
        });
        if(!response.ok){ throw new Error("Error en el backend"); }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "FormatoCFE.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      }catch(err){
        alert("No se pudo generar el PDF: " + err.message);
      }
    });