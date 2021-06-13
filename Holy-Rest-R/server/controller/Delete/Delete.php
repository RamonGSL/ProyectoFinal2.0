<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods:POST"); //, PUT, PATCH, DELETE, OPTIONS
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Orgin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
    header("HTTP/1.1 200 OK");
    die();
}
//Error en el includeOnce
$data = json_decode(file_get_contents("php://input"), true);
$datasUser = $data["dataUser"];
include_once('./functionsDelete.php');
$functionsDelete = new functionsDelete();
//Componentes del controlador
if ($datasUser["RoleUser"] === "0") {
    echo $functionsDelete->deleteUserRole0($datasUser);
} else if ($datasUser["RoleUser"] === "1") {
    echo $functionsDelete->deleteUserRole1($datasUser);
} else if ($datasUser["RoleUser"] === "2") {
    echo $functionsDelete->deleteUserRole2($datasUser);
}
