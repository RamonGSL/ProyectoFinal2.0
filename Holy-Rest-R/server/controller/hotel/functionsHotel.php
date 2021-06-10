<?php

include_once('./../../model/Hotel.php');
include_once('./../utils.php');
class functionsHotel extends Hotel
{


    public function newHotel($datas)
    {
        $comproveEmail = $this->comproveHotel($datas["Email"]);
        if ($comproveEmail == true) {
            $createHotel = Hotel::createHotel($datas["HotelName"], $datas["Location"], $datas["Description"], $datas["Phone"], $datas["Prefix"], $datas["Email"]);
            if ($createHotel == "New record created successfully") {
                $returnHotel = Hotel::comproveHotelWithEmail($datas["Email"]);
                return $returnHotel[0]["Id"];
            } else {
                return "Error";
            }
        } else {

            $updateHotel = Hotel::updateHotel($datas["HotelName"], $datas["Location"], $datas["Description"], $datas["Phone"], $datas["Prefix"], $datas["Email"]);

            if ($updateHotel == "New record created successfully") {
                $returnHotel = Hotel::comproveHotelWithEmail($datas["Email"]);
                return $returnHotel[0]["Id"];
            } else {
                return "Error";
            }
        }
    }

    public function getAllHotels()
    {
        $getHotels = Hotel::getHotels();
        return $getHotels;
    }

    public function disableHotel($datas)
    {
        $changeDisabled = Hotel::changeDisabled($datas["EmailHotel"], $datas["DisabledHotel"]);
        if ($changeDisabled === "New record created successfully") {
            return "Correct";
        }
        return "Error";
    }

    protected function comproveHotel($Email)
    {
        $comproveEmail = Hotel::comproveHotelWithEmail($Email);
        if ($comproveEmail === "0 datas") {
            return true;
        } else {
            return false;
        }
    }
}
