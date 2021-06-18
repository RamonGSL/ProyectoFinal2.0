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

include_once('./functionsImages.php');
$functionImages = new functionsImages();

if (array_key_exists('idHotel', $data)) {
    echo  json_encode($functionImages->getImagesForHotel($data));
} else if (array_key_exists('GetImages', $data)) {
    echo  json_encode($functionImages->getALLImages());
} else if (array_key_exists('extensionImg', $data)) {
    echo  json_encode($functionImages->getUrl($data));
} else {
    echo  json_encode($functionImages->createAllImages($data));
}

