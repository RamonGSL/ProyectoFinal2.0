<?php
include_once('Queries.php');

class Images extends Queries
{
    protected function insertImage($IdHotel, $Type, $NameImage)
    {
        $sql = "INSERT INTO imageshotels (IdHotel, Type, NameImage )
        	values ('" . $IdHotel . "','" . $Type . "','" . $NameImage . "')";
        return Queries::insertDatas($sql);
    }

    protected function checkNameImage($NameImage)
    {
        $sql = "SELECT NameImage FROM imageshotels where NameImage = '$NameImage'";
        return Queries::returnDatas($sql);
    }

    protected function deleteALLImages()
    {
        $sql = "DELETE FROM imageshotels ";
        return Queries::insertDatas($sql);
    }
}
