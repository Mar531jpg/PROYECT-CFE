$(document).ready(function() {

    $('#loginForm').on('submit', function(e) {
        e.preventDefault();

        let correo = $('#usuario').val().trim();
        let password = $('#contrasena').val().trim();

        if(correo === '' || password === ''){
            alert('Por favor rellena todos los datos.');
            return;
        }

        $.ajax({
            url: '../backend/login.php',
            type: 'POST',
            dataType: 'json',
            data: { email: correo, password: password },
            success: function(response) {
                if(response.Result == 1){
                    window.location.href = "menu.html";
                } else {
                    alert(response.Message);
                }
            },
            error: function() {
                alert('Error en la conexión con el servidor.');
            }
        });
    });

});
