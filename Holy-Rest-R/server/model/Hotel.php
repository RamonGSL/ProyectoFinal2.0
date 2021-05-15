<?php
include_once('Queries.php');

class Hotel extends Queries
{
    protected function comproveHotel($Email)
    {
        /*  $sql = "INSERT INTO users (Name, Surnames, Email, Password, DateOfBirth, Country)
			values ('" . $Name . "','" . $Surnames . "','" . $Email . "','" . $Password . "','" . $DateOfBirth . "','" . $Country . "')";
        return Queries::insertDatas($sql); */


        //$sql = "SELECT IdHotel FROM manage where "
    }

    protected function createHotel($HotelName, $Location, $Description, $Phone, $Prefix, $Email)
    {
        $sql = "INSERT INTO hotels (HotelName, Location, Description, Phone, Prefix, Email)
        values ('" . $HotelName . "','" . $Location . "','" . $Description . "','" . $Phone . "','" . $Prefix . "','" . $Email . "')";
        return Queries::insertDatas($sql);
    }

    protected function comproveHotelWithEmail($Email)
    {
        $sql = "SELECT * FROM hotels WHERE Email = '$Email'";
        return Queries::returnDatas($sql);
    }
}
