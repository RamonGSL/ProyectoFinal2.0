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
        $sql = "SELECT * FROM users where Name = '$Name' AND Surnames = '$Surnames' ";
        return Queries::returnDatas($sql);
    }

    protected function returnEmail($Email)
    {
        $sql = "SELECT * FROM users where Email = '$Email'";
        return Queries::returnDatas($sql);
    }

    protected function checkPassLogin($Email, $Password)
    {
        $sql = "SELECT * FROM users where Email = '$Email' AND Password = '$Password'";
        return Queries::returnDatas($sql);
    }
    protected function returnEmailAndPass($Id)
    {
        $sql = "SELECT Email , Password FROM users where Id = '$Id'";
        return Queries::returnDatas($sql);
    }

    protected function returnOtherUserEmail($Email, $Id)
    {
        $sql = "SELECT Email FROM users where Email = '$Email' AND Id != '$Id'";
        return Queries::returnDatas($sql);
    }

    protected function checkNameImage($ProfileImage)
    {
        $sql = "SELECT ProfileImage FROM users where ProfileImage = '$ProfileImage'";
        return Queries::returnDatas($sql);
    }

    protected function returnNameImage($Id)
    {
        $sql = "SELECT ProfileImage FROM users where Id = '$Id'";
        return Queries::returnDatas($sql);
    }

    protected function updateDatas($Name, $Surnames, $Email, $Password, $DateOfBirth, $Country, $ProfileImage, $Id)
    {
        $sql = "UPDATE users SET Name = '$Name', Surnames ='$Surnames', Email = '$Email', Password = '$Password', DateOfBirth = '$DateOfBirth', Country = '$Country', ProfileImage = '$ProfileImage' WHERE Id = '$Id'";
        return Queries::insertDatas($sql);
    }

    protected function returnRoleUser($Email, $Password)
    {
        $sql = "SELECT RoleUser FROM users where Email = '$Email' AND Password = '$Password' ";
        return Queries::returnDatas($sql);
    }

    protected function returnNamesUsers()
    {
        $sql = "SELECT Name,Email,ProfileImage FROM users";
        return Queries::returnDatas($sql);
    }

    protected function deleteUser($Email)
    {
        $sql = "DELETE * FROM users where Email = '$Email'";
        return Queries::insertDatas($sql);
    }
}
