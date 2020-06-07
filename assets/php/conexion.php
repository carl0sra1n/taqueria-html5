<?php
function ConectaBD()
{
	$servidor = "127.0.0.1";
	$usuario = "root";
	$password = "";
	$bd = "taqueria";

	$conexion = mysqli_connect($servidor, $usuario, $password, $bd);

	return $conexion;
}
?>