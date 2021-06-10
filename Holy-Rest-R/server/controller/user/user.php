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
include_once('./functionsUser.php');

$functionUser = new functionsUser();
$comprobationType = true;


switch ($data['Type']) {

    case 'register':


        foreach ($data as $index) {
            if (!is_string($index)) {
                $comprobationType = false;
            }
        }

        if ($comprobationType == true) {
            echo  json_encode($functionUser->checkUser($data));
        }
        break;

    case 'login':

        foreach ($data as $index) {
            if (!is_string($index)) {
                $comprobationType = false;
            }
        }
        if ($comprobationType == true) {

            $login = $functionUser->checkLogin($data);
            if ($login != "Incorrect Login") {
                echo json_encode($login);
            } else {

                echo json_encode("Incorrect Login");
            }
        }

        break;

    case 'datas':

        foreach ($data as $index) {
            if (!is_string($index)) {
                $comprobationType = false;
            }
        }

        if ($comprobationType == true) {
            $datasUser = $functionUser->returnDatasUser($data);
            if ($datasUser != "Error") {
                echo json_encode($datasUser);
            } else {
                echo json_encode("Server Not Found");
            }
        }


        break;

    case 'update':
        foreach ($data as $index) {
            if (!is_string($index)) {
                $comprobationType = false;
            }
        }
        if ($comprobationType == true) {
            $datasUser = $functionUser->updateDatasUser($data);

            if ($datasUser != "Error") {
                echo json_encode($datasUser);
            } else {
                echo json_encode("Server Not Found");
            }
        }
        break;

    case 'names':

        foreach ($data as $index) {
            if (!is_string($index)) {
                $comprobationType = false;
            }
        }

        if ($comprobationType == true) {
            $datasUser = $functionUser->returnAllNames($data);
            if ($datasUser != "Error") {
                echo json_encode($datasUser);
            } else {
                echo json_encode("Server Not Found");
            }
        }
        break;

    case 'delete':
        foreach ($data as $index) {
            if (!is_string($index)) {
                $comprobationType = false;
            }
        }


        if ($comprobationType == true) {
            $datasUser = $functionUser->deleteUser($data);
            if ($datasUser != "Error") {
                echo json_encode("Has been deleted successfully");
            } else {
                echo json_encode("Server Not Found");
            }
        }

        break;

    case 'role':
        foreach ($data as $index) {
            if (!is_string($index)) {
                $comprobationType = false;
            }
        }

        if ($comprobationType == true) {
            $datasUser = $functionUser->newRole($data);
            if ($datasUser != "Error") {
                echo json_encode("User role has been changed successfully");
            } else {
                echo json_encode("Server Not Found");
            }
        }

        break;

    case 'Dates':
        echo json_encode($functionUser->returnDates($data));
        /*  if ($datasUser != "Error") {
            echo json_encode("User role has been changed successfully");
        } else {
            echo json_encode("Server Not Found");
        }
 */
        break;

    default:
        # code...
        break;
}
