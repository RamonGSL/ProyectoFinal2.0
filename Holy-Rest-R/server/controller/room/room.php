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
$data = json_decode(file_get_contents("php://input"), true);
//Componentes del controlador
include_once('./functionsRoom.php');

$functionRoom = new functionsRoom();
$comprobationType = true;

$option = end($data);
switch ($option[0]['Type']) {

    case 'CreateRoom':
        $functionRoom->createAllRooms($data);
        //echo  json_encode($functionRoom->createAllRooms($data));
        break;


    default:
        # code...
        break;
}
