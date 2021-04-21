<?php
include_once('./../../model/User.php');

class functionsUser extends User
{

    public function comprobateUser($datas)
    {
        $comprobationEmail = User::returnEmail($datas["Email"]);
        if ($comprobationEmail == "0 datas") {
            User::newUser($datas["Name"], $datas["Surnames"], $datas["Email"], md5($datas["Password"]), $datas["DateOfBirth"], $datas["Country"]);
            return "Correct Register";
        } else {
            //echo "This Email is already registered";
            return "This Email is already registered";
        }
    }


    public function comprobateLogin($datas)
    {
        $comprobationEmail = User::returnEmail($datas["Email"]);
        if ($comprobationEmail != "0 datas") {
            $comprobatePassLogin = User::comprobatePassLogin($datas["Email"], md5($datas["Password"]));

            if ($comprobatePassLogin != "0 datas") {
                $objUsuario = ['Email' => $datas["Email"], 'Password' => md5($datas["Password"])];
                return  $objUsuario;
            } else {
                return "Incorrect Login";
            }
        } else {
            return "Incorrect Login";
        }
    }

    public function returnDatasUser($datas)
    {
        $comprobatePassLogin = User::comprobatePassLogin($datas["Email"], $datas["Password"]);
        if ($comprobatePassLogin != "0 datas") {
            return $comprobatePassLogin;
        } else {
            return "Error";
        }
    }
}
