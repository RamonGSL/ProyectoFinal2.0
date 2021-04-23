<?php
include_once('Queries.php');

class User extends Queries
{


    protected function newUser($Name, $Surnames, $Email, $Password, $DateOfBirth, $Country)
    {
        $sql = "INSERT INTO users (Name, Surnames, Email, Password, DateOfBirth, Country)
			values ('" . $Name . "','" . $Surnames . "','" . $Email . "','" . $Password . "','" . $DateOfBirth . "','" . $Country . "')";
        return Queries::insertDatas($sql);
    }

    protected function returnNameAndSurnames($Name, $Surnames)
    {
        $sql = "SELECT * FROM Users where Name = '$Name' AND Surnames = '$Surnames' ";
        return Queries::returnDatas($sql);
    }

    protected function returnEmail($Email)
    {
        $sql = "SELECT * FROM Users where Email = '$Email'";
        return Queries::returnDatas($sql);
    }

    protected function comprobatePassLogin($Email, $Password)
    {
        $sql = "SELECT * FROM Users where Email = '$Email' AND Password = '$Password'";
        return Queries::returnDatas($sql);
    }
    protected function returnEmailAndPass($Id)
    {
        $sql = "SELECT Email , Password FROM Users where Id = '$Id'";
        return Queries::returnDatas($sql);
    }

    protected function returnOtherUserEmail($Email, $Id)
    {
        $sql = "SELECT Email FROM Users where Email = '$Email' AND Id != '$Id'";
        return Queries::returnDatas($sql);
    }

    protected function comproveNameImage($ProfileImage)
    {
        $sql = "SELECT ProfileImage FROM Users where ProfileImage = '$ProfileImage'";
        return Queries::returnDatas($sql);
    }

    protected function returnNameImage($Id)
    {
        $sql = "SELECT ProfileImage FROM Users where Id = '$Id'";
        return Queries::returnDatas($sql);
    }

    protected function updateDatas($Name, $Surnames, $Email, $Password, $DateOfBirth, $Country, $ProfileImage, $Id)
    {
        $sql = "UPDATE Users SET Name = '$Name', Surnames ='$Surnames', Email = '$Email', Password = '$Password', DateOfBirth = '$DateOfBirth', Country = '$Country', ProfileImage = '$ProfileImage' WHERE Id = '$Id'";
        return Queries::insertDatas($sql);
    }
}
