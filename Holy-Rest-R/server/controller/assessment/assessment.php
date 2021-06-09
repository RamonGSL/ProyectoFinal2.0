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
include_once('./functionsAssessment.php');


$functionAssessment = new functionsAssessment();
$comprobationType = true;
if (array_key_exists('Insert', $data)) {
    echo json_encode($functionAssessment->insertAssesment($data));
} else if (array_key_exists('media', $data)) {
    echo json_encode($functionAssessment->getALLAssesment($data));
} else if (array_key_exists('Score', $data)) {
    $result = $functionAssessment->getScore($data);
    if ($result == "0 datas") {
        echo $result;
    } else {
        echo json_encode($result);
    }
} else if (array_key_exists('getAllUsers', $data)) {
    $result2 = $functionAssessment->getAllUsers($data);
    if ($result2 == "0 datas") {
        echo $result2;
    } else {
        echo json_encode($result2);
    }
}
