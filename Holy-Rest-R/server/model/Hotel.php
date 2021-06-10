<?php
include_once('Queries.php');

class Hotel extends Queries
{

    protected function createHotel($HotelName, $Location, $Description, $Phone, $Prefix, $Email)
    {
        $sql = "INSERT INTO hotels (HotelName, Location, Description, Phone, Prefix, Email)
        values ('" . $HotelName . "','" . $Location . "','" . $Description . "','" . $Phone . "','" . $Prefix . "','" . $Email . "')";
        return Queries::insertDatas($sql);
    }

    protected function updateHotel($HotelName, $Location, $Description, $Phone, $Prefix, $Email)
    {
        $sql = "UPDATE hotels SET HotelName = '$HotelName', Location = '$Location', Description = '$Description',  Phone = '$Phone',  Prefix = '$Prefix' WHERE Email = '$Email'";
        return Queries::insertDatas($sql);
    }

    protected function comproveHotelWithEmail($Email)
    {
        $sql = "SELECT * FROM hotels WHERE Email = '$Email'";
        return Queries::returnDatas($sql);
    }

    protected function getHotels()
    {
        $sql = "SELECT * FROM hotels";
        return Queries::returnDatas($sql);
    }

    protected function changeDisabled($Email, $DisabledHotel)
    {
        $sql = "UPDATE hotels SET Email = '$Email', Disabled = '$DisabledHotel'";
        return Queries::insertDatas($sql);
    }
}
