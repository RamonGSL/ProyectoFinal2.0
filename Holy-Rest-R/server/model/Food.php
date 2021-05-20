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
}
