<?php
session_start();
//header('Content-Type: application/json');
include("conexion.php");

function loginUsuario()
{
    $data = array("estado" => -1, "mensaje" => "No se ejecutó función loginUsuario()");
    
    if(!isset($_SESSION["usuario"]))
    {
        $conn = ConectaBD();

        $correo = $_GET["correo"];
        $password = crypt($_GET["password"], 'password');

        $sQuery = "SELECT usuario, nombre, direccion, telefono, correo FROM clientes WHERE correo = '" . $correo . "' AND password = '" . $password . "' LIMIT 1";
        
        $res = mysqli_query($conn, $sQuery);
    
        if($res)
        {
            if(mysqli_num_rows($res) == 1)
            {
                while($row = mysqli_fetch_array($res))
                {
                    $_SESSION["usuario"] = $row["usuario"];
                    $_SESSION["nombre"] = $row["nombre"];
                    $_SESSION["direccion"] = $row["direccion"];
                    $_SESSION["telefono"] = $row["telefono"];
                    $_SESSION["correo"] = $row["correo"];
                }
    
                $data = array("estado" => 0, "mensaje" => "Se inició sesión. Bienvenido, " . $_SESSION["nombre"] . ".");
            }
            else 
            {
                $data = array("estado" => -1, "mensaje" => "Usuario o contraseña incorrectos. Por favor, reintente.");
            }
        }
        else 
        {
            $data = array("estado" => -1, "mensaje" => "No se ejecutó la consulta: " . mysqli_errno($conn) . ": " . mysqli_error($conn));
        }
        mysqli_close($conn);
    }
    else 
    {
        $data = array("estado" => -1, "mensaje" => "Se encuentra iniciada la sesión de " . $_SESSION["nombre"] . ", por favor cierrala antes de abrir una nueva.");
    }

    echo json_encode($data);
}


if(isset($_GET["opc"]))
{
    $opc = $_GET["opc"];

    switch($opc)
    {
        case "loginUsuario":
            loginUsuario();
        break;
    }
}
?>