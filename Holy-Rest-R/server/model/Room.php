<?php
include_once('Queries.php');

class Room extends Queries
{
    protected function insertRoom($TypeRoom, $RoomPrice, $IdHotel)
    {
        $sql = "INSERT INTO room (IdHotel, TypeRoom, RoomPrice )
        	values ('" . $IdHotel . "','" . $TypeRoom . "','" . $RoomPrice . "')";
        return Queries::insertDatas($sql);
    }

    protected function deleteALLRooms($IdHotel)
    {
        $sql = "DELETE FROM room WHERE IdHotel = '$IdHotel'";
        return Queries::insertDatas($sql);
    }

    protected function getRooms($IdHotel)
    {
        $sql = "SELECT * FROM room where IdHotel = '$IdHotel'";
        return Queries::returnDatas($sql);
    }
}
