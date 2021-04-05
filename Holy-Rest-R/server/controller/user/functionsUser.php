<?php
include_once('./../../model/User.php');

class functionsUser extends User
{

    public function comprobateUser($datas)
    {
        $comprobationEmail = User::returnEmail($datas["Email"]);
        if ($comprobationEmail == "0 datas") {
            $comprobationNameAndSurnames = User::returnNameAndSurnames($datas["Name"], $datas["Surnames"]);

            if ($comprobationNameAndSurnames == "0 datas") {
                echo "new user Created";
                return User::newUser($datas["Name"], $datas["Surnames"], $datas["Email"], md5($datas["Password"]), $datas["DateOfBirth"], $datas["Country"]);
            } else {
                echo "This name along with this surname already exist";
                return "This name along with this surname already exist";
            }
        } else {
            echo "This Email is already registered";
            return "This Email is already registered";
        }
    }


    public function comprobateLogin($datas)
    {
        $comprobationEmail = User::returnEmail($datas["Email"]);
        if ($comprobationEmail != "0 datas") {
            $comprobatePassLogin = User::comprobatePassLogin($datas["Email"], md5($datas["Password"]));

            if ($comprobatePassLogin != "0 datas") {
                echo "Correct Login";
                return "Correct Login";
            }
        }
    }
}
