<?php

include_once('./../../model/Manage.php');
include_once('./../utils.php');
class functionsManage extends Manage
{
    public function comproveAdmin($datas)
    {
        $comproveAdmin = Manage::comproveAdmin($datas["Id"]);
        if ($comproveAdmin == "0 datas") {
            return "Don´t exist";
        } else {
            return $comproveAdmin;
        }
    }

    public function newManage($datas)
    {
        $createManage = Manage::createManage($datas["IdHotel"], $datas["IdUser"]);
        if ($createManage == "New record created successfully") {
            return "Correct";
        } else {
            return $createManage;
        }
    }
}
