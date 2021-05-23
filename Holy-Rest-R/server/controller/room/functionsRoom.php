<?php

include_once('./../../model/Room.php');
include_once('./../utils.php');
class functionsRoom extends Room
{
    public function createAllRooms($allRooms)
    {
        $result = [];
        $deleteTable = Room::deleteALLRooms();
        for ($i = 0; $i < count($allRooms) - 1; $i++) {
            $createRoom = Room::insertRoom($allRooms[$i]["Room"], $allRooms[$i]["Price"], $allRooms[$i]["IdHotel"]);
            array_push($result, $createRoom);
        }
        foreach ($result as $insert) {
            if ($insert !== "New record created successfully") {
                return null;
            }
        }

        return "Correct";
    }

    public function getRoomsHotel($data)
    {
        $getFood = Room::getRooms($data['idHotel']);
        if ($getFood === "0 datas") {
            return null;
        }

        return $getFood;
    }
}
