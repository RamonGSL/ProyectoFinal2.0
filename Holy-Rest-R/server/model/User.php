<?php
include_once('Queries.php');

class User extends Queries
{


    public function newUser($Name, $Surnames, $Email, $Password, $DateOfBirth, $Country)
    {
        $sql = "INSERT INTO users (Name, Surnames, Email, Password, DateOfBirth, Country)
			values ('" . $Name . "','" . $Surnames . "','" . $Email . "','" . $Password . "','" . $DateOfBirth . "','" . $Country . "')";
        return Queries::insertDatas($sql);
    }

    public function returnNameAndSurnames($Name, $Surnames)
    {
        $sql = "SELECT * FROM Users where Name = '$Name' AND Surnames = '$Surnames' ";
        return Queries::returnDatas($sql);
    }

    public function returnEmail($Email)
    {
        $sql = "SELECT * FROM Users where Email = '$Email'";
        return Queries::returnDatas($sql);
    }

    public function comprobatePassLogin($Email, $Password)
    {
        $sql = "SELECT * FROM Users where Email = '$Email' AND Password = '$Password'";
        return Queries::returnDatas($sql);
    }
}
