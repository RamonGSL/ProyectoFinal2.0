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
}
