<?php

include_once('./../../model/Hotel.php');
include_once('./../utils.php');
class functionsHotel extends Hotel
{
    public function comproveHotel($datas)
    {
        $comproveEmail = Hotel::comproveHotel($datas["Email"]);
        /* $comprobationEmail = User::returnEmail($datas["Email"]);
        if ($comprobationEmail == "0 datas") {
            User::newUser($datas["Name"], $datas["Surnames"], $datas["Email"], md5($datas["Password"]), $datas["DateOfBirth"], $datas["Country"]);
            return "Correct Register";
        } else {
            return "This Email is already registered";
        } */
    }

    public function newHotel($datas)
    {
        $createHotel = Hotel::createHotel($datas["HotelName"], $datas["Location"], $datas["Description"], $datas["Phone"], $datas["Prefix"], $datas["Email"]);
        if ($createHotel == "New record created successfully") {
            $returnHotel = Hotel::comproveHotelWithEmail($datas["Email"]);
            return $returnHotel[0]["Id"];
        } else {
            return "Error";
        }
    }
}
