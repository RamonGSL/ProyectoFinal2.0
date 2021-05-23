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

    protected function deleteALLFoods()
    {
        $sql = "DELETE FROM food ";
        return Queries::insertDatas($sql);
    }

    protected function getFoods($IdHotel)
    {
        $sql = "SELECT * FROM food where IdHotel = '$IdHotel'";
        return Queries::returnDatas($sql);
    }
}
