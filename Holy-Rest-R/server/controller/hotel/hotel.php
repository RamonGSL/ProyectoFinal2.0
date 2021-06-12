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
include_once('./functionsHotel.php');

$functionHotel = new functionsHotel();
$comprobationType = true;


switch ($data['Type']) {

    case 'CreateHotel':


        foreach ($data as $index) {
            if (!is_string($index)) {
                $comprobationType = false;
            }
        }

        if ($comprobationType == true) {
            echo  $functionHotel->newHotel($data);
        }
        break;

    case 'getAllHotels':
        echo  json_encode($functionHotel->getAllHotels());
        break;

    case 'disableHotel':
        echo  json_encode($functionHotel->disableHotel($data));
        break;

    default:
        # code...
        break;
}
