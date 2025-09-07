$(document).ready(function() {

  $('#loginForm').on('submit', function(e) {
    e.preventDefault();

    const usuario = $('#usuario').val().trim();
    const password = $('#contrasena').val().trim();

    if(usuario && password){
      window.location.href = "menu.html"; 
    } else {
      alert("Por favor rellena todos los campos.");
    }
  });

});
