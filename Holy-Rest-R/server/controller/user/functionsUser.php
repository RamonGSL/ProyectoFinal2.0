<?php
//declare(strict_types=1);
include_once('./../../model/User.php');
include_once('./../utils.php');
class functionsUser extends User
{

    public function comprobateUser($datas)
    {
        $comprobationEmail = User::returnEmail($datas["Email"]);
        if ($comprobationEmail == "0 datas") {
            User::newUser($datas["Name"], $datas["Surnames"], $datas["Email"], md5($datas["Password"]), $datas["DateOfBirth"], $datas["Country"]);
            return "Correct Register";
        } else {
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

    public function updateDatasUser($datas)
    {
        $newProfileImage = null;
        $updateDatas = null;

        if (count($datas) == 10) {
            $datas['Password'] = md5($datas['Password']);
        }
        if ($datas['ProfileImage'] != "userDefault.jpeg") {
            $nameOfImage = User::returnNameImage($datas["Id"]);
            $nameOfImage = $nameOfImage[0]["ProfileImage"];

            if ($nameOfImage != "userDefault.jpeg" && $nameOfImage != $datas['ProfileImage']) {
                $this->removeImage($nameOfImage);
                $newProfileImage = $this->generateImage($datas['ProfileImage']);
            }
        }
        $comprobationEmail = User::returnOtherUserEmail($datas["Email"], $datas["Id"]);
        if ($comprobationEmail == "0 datas") {
            if ($newProfileImage != null) {
                $updateDatas = User::updateDatas($datas["Name"], $datas["Surnames"], $datas["Email"], $datas["Password"], $datas["DateOfBirth"], $datas["Country"], $newProfileImage, $datas["Id"]);
            } else {
                $updateDatas = User::updateDatas($datas["Name"], $datas["Surnames"], $datas["Email"], $datas["Password"], $datas["DateOfBirth"], $datas["Country"], $datas["ProfileImage"], $datas["Id"]);
            }

            if ($updateDatas == "New record created successfully") {
                $returnPassAndEmail = User::returnEmailAndPass($datas["Id"]);
                return $returnPassAndEmail;
            } else {
                return "Error";
            }
        } else {
            return "This Email is exist";
        }
    }

    private function generateImage($image)
    {
        $imageB64 = explode(',', $image);
        $extension = explode('/', $image);
        $extension = $extension[1];
        $extension = explode(";", $extension);
        $extension = $extension[0];


        $imageName = $this->generateRandomString();
        $nameReturn = $imageName . "." . $extension;

        while ($imageName == User::comproveNameImage($imageName)) {
            $imageName = $this->generateRandomString();
        }

        $direction = utils::returnDirection();
        $imageDirection = $direction . "server/images/";
        $imageName = $imageDirection . $imageName . "." . $extension;


        $fp = fopen($imageName, 'w+');
        fwrite($fp, base64_decode($imageB64[1]));
        fclose($fp);

        return $nameReturn;
    }

    private function  generateRandomString($word = 30)
    {
        $characters  = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $word; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }

        return $randomString;
    }


    private function removeImage($nameOfImage)
    {
        $image = utils::returnDirection();
        $image = $image . "server/images/" . $nameOfImage;
        unlink($image);
    }
}
