<?php
include_once('Queries.php');

class Food extends Queries
{
    protected function insertFood($Type, $Price, $IdHotel)
    {
        $sql = "INSERT INTO food (IdHotel, Type, Price )
        	values ('" . $IdHotel . "','" . $Type . "','" . $Price . "')";
        return Queries::insertDatas($sql);
    }

    protected function deleteALLFoods($IdHotel)
    {
        $sql = "DELETE FROM food WHERE IdHotel = '$IdHotel'";
        return Queries::insertDatas($sql);
    }

    protected function getFoods($IdHotel)
    {
        $sql = "SELECT * FROM food where IdHotel = '$IdHotel'";
        return Queries::returnDatas($sql);
    }
}
