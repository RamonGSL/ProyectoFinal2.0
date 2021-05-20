<?php

include_once('./../../model/Room.php');
include_once('./../utils.php');
class functionsRoom extends Room
{
    public function createAllRooms($allRooms)
    {
        $result = [];
        for ($i = 0; $i < count($allRooms) - 1; $i++) {
            $createRoom = Room::insertRoom($allRooms[$i]["Room"], $allRooms[$i]["Price"], $allRooms[$i]["IdHotel"]);
            array_push($result, $createRoom);
        }
        var_dump($result);

        return null;
    }
}
