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
include_once('./../../model/User.php');
include_once('./functionsUser.php');
$user = new User();
$functionUser = new functionsUser();
$comprobationType = false;


var_dump($data);


switch ($data['Type']) {

    case 'register':

        foreach ($data as $index) {
            if (is_string($index)) {
                $comprobationType = true;
            }
        }

        if ($comprobationType == true) {
            return  $functionUser->comprobateUser($data);
        }
        break;

    case 'loginUser':

        foreach ($data as $index) {
            if (is_string($index)) {
                $comprobationType = true;
            }

            if ($comprobationType == true) {
                return  $functionUser->comprobateLogin($data);
            }
        }
        break;

    default:
        # code...
        break;
}
