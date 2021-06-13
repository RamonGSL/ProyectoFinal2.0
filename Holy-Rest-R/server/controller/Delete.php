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

//Componentes del controlador
include_once('../model/Assessment.php');
include_once('../model/Food.php');
include_once('../model/Hotel.php');
include_once('../model/Images.php');
include_once('../model/Manage.php');
include_once('../model/Room.php');
include_once('../model/User.php');

$data = json_decode(file_get_contents("php://input"), true);


var_dump($data);
