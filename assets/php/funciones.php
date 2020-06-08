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

        $sQuery = "SELECT id, usuario, nombre, direccion, telefono, correo FROM clientes WHERE correo = '" . $correo . "' AND password = '" . $password . "' LIMIT 1";
        
        $res = mysqli_query($conn, $sQuery);
    
        if($res)
        {
            if(mysqli_num_rows($res) == 1)
            {
                while($row = mysqli_fetch_array($res))
                {
                    $_SESSION["id"] = $row["id"];
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

function getMenu()
{
    $conn = ConectaBD();
    $data = array();

    $sQuery = "SELECT id, nombre, imagen, precio FROM menu";
    
    $res = mysqli_query($conn, $sQuery);

    if($res)
    {
        if(mysqli_num_rows($res) > 0)
        {
            while($row = mysqli_fetch_array($res))
            {
                $data[] = $row;
            }
        }
    }

    echo json_encode($data);
}

function getUsuarioLogueado()
{
    echo json_encode($_SESSION);
}

function insertPedido()
{
    $conn = ConectaBD();

    $data = array("mensaje" => "No se ejecutó función insertPedido()", "estado" => -1);

    $id_pedido = $_GET["idpedido"];
    $fecha = $_GET["fecha"];
    $id_cliente = $_GET["id_cliente"];
    $id_producto = $_GET["id_producto"];
    $cantidad = $_GET["cantidad"];

    $sQuery = "INSERT INTO pedidos (id_pedido, fecha, id_cliente, id_producto, cantidad) VALUES ('" . $id_pedido . "', '" . $fecha . "', " . $id_cliente . ", ". $id_producto . ", " . $cantidad . ")";
    
    $res = mysqli_query($conn, $sQuery);

    if($res)
    {
        $data = array("mensaje" => "OK", "estado" => 0);
    }

    echo json_encode($data);
}

function cerrarSesion()
{
    session_destroy();
    echo json_encode($data = array("mensaje" => "OK", "estado" => 0));
}

function registroUsuario()
{
    $conn = ConectaBD();

    $data = array("mensaje" => "No se ejecutó función registroUsuario()", "estado" => -1);

    $usuario = $_GET["usuario"];
    $nombre = $_GET["nombre"];
    $direccion = $_GET["direccion"];
    $telefono = $_GET["telefono"];
    $correo = $_GET["correo"];
    $password = crypt($_GET["password"], 'password');

    $sQuery = "SELECT true FROM clientes WHERE correo = '" . $correo . "' OR usuario = '" . $usuario . "'";

    $res = mysqli_query($conn, $sQuery);

    $existeusuario = false;
    while($row = mysqli_fetch_array($res))
    {
        $existeusuario = true;
    }

    if($existeusuario != true)
    {
        $sQuery = "INSERT INTO clientes (usuario, nombre, direccion, telefono, correo, password) VALUES ('" . $usuario . "', '" . $nombre . "', '" . $direccion . "', '" . $telefono . "', '" . $correo . "', '" . $password . "');";
    
        $res = mysqli_query($conn, $sQuery);
    
        if($res)
        {
            $data = array("mensaje" => "Se registro al usuario correctamente. Ya puede iniciar sesi&oacute;n", "estado" => 0);
        }
    }
    else
    {
        $data = array("mensaje" => "Ya existe un usuario con el correo o nombre de usuario que ingresaste. Por favor verifica.", "estado" => -1);
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
        case "getMenu":
            getMenu();
        break;
        case "getUsuarioLogueado":
            getUsuarioLogueado();
        break;
        case "insertPedido":
            insertPedido();
        break;
        case "cerrarSesion":
            cerrarSesion();
        break;
        case "registroUsuario":
            registroUsuario();
        break;
    }
}
?>