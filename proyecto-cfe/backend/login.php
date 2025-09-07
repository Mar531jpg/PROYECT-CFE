<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

require_once 'config.php';

$correo = $_POST['email'] ?? '';
$contrasena = $_POST['password'] ?? '';

if (empty($correo) || empty($contrasena)) {
    echo json_encode(['Resultado' => 0, 'Mensaje' => 'Por favor rellena todos los campos' ]);
    exit; 
}

$conexion = new mysqli($DB_SERVIDOR, $DB_USUARIO, $DB_CLAVE, $DB_NOMBRE);

$conexion = new mysqli($DB_SERVIDOR, $DB_USUARIO, $DB_CLAVE, $DB_NOMBRE);
if ($conexion->connect_error) {
    echo json_encode([
        'Resultado' => 0, 
        'Mensaje' => 'Error de conexión: ' . $conexion->connect_error
    ]);
    exit;
}

$storedProcedure = $conexion->prepare("CALL LoginUsuario(?, ?)");
$storedProcedure->bind_param("ss", $correo, $contrasena);
$storedProcedure->execute();

$resultado = $storedProcedure->get_result();
$datos = $resultado->fetch_assoc();

echo json_encode($datos);

$storedProcedure->close();
$conexion->close();
?>
