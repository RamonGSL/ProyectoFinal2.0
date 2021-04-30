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
        /* $comprobationEmail = User::returnEmail($datas["Email"]);
        if ($comprobationEmail == "0 datas") {
            User::newUser($datas["Name"], $datas["Surnames"], $datas["Email"], md5($datas["Password"]), $datas["DateOfBirth"], $datas["Country"]);
            return "Correct Register";
        } else {
            return "This Email is already registered";
        } */
    }
}
