<?php
include("conexion.php");

if (isset($_POST['register'])) {
    if (
        strlen($_POST['username']) >= 1 &&
        strlen($_POST['password']) >= 1 &&
        strlen($_POST['nombre']) >= 1 &&
        strlen($_POST['email']) >= 1
    ) {
        $name = trim($_POST['nombre']);
        $email = trim($_POST['email']);
        $password = trim($_POST['password']);
        $sexo = trim($_POST['username']);

        // Preparar la consulta SQL con mysqli_prepare()
        $consulta = "INSERT INTO proveedor(nombre, email, password, username) VALUES(?, ?, ?, ?)";
        $stmt = mysqli_prepare($conex, $consulta);

        // Vincular parámetros y ejecutar la consulta
        mysqli_stmt_bind_param($stmt, "ssss", $name, $email, $password, $sexo);
        $resultado = mysqli_stmt_execute($stmt);

        // Verificar si la consulta fue exitosa
        if ($resultado) {
            echo "<h3 class='success'>Se ha completado tu registro</h3>";
        } else {
            echo "<h3 class='error'>Ha ocurrido un error en tu registro</h3>";
        }
    } else {
        echo "<h3 class='error'>Debes llenar todos los campos</h3>";
    }
}
?>
