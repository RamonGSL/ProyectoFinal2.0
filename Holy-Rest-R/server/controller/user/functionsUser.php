<?php
include_once('./../../model/User.php');
include_once('./../utils.php');
include_once('./../images');

class functionsUser extends User
{

    public function checkUser($datas)
    {
        $comprobationEmail = User::returnEmail($datas["Email"]);
        if ($comprobationEmail == "0 datas") {
            User::newUser($datas["Name"], $datas["Surnames"], $datas["Email"], md5($datas["Password"]), $datas["DateOfBirth"], $datas["Country"]);
            return "Correct Register";
        } else {
            return "This Email is already registered";
        }
    }


    public function checkLogin($datas)
    {
        $comprobationEmail = User::returnEmail($datas["Email"]);
        if ($comprobationEmail != "0 datas") {
            $checkPassLogin = User::checkPassLogin($datas["Email"], md5($datas["Password"]));

            if ($checkPassLogin != "0 datas") {
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
        $checkPassLogin = User::checkPassLogin($datas["Email"], $datas["Password"]);
        if ($checkPassLogin != "0 datas") {
            return $checkPassLogin;
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
            }else if($datas['ProfileImage'] !== 'userDefault.jpeg'){
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
            if ($updateDatas == 'New record created successfully') {
                $returnPassAndEmail = User::returnEmailAndPass($datas["Id"]);
                return $returnPassAndEmail;
            } else {
                return "Error";
            }
        } else {
            return "This Email is exist";
        }
    }

    public function returnAllNames($datas)
    {
        $role = $this->checkRoleUser($datas['Email'], $datas['Password']);
        if ($role[0]["RoleUser"] == "2") {
            $returnNames = User::returnNamesUsers();
            return $returnNames;
        } else {
            return "Error";
        }
    }

    public function deleteUser($datas)
    {
        $role = $this->checkRoleUser($datas['Email'], $datas['Password']);
        if ($role[0]["RoleUser"] == "2") {
            $deleteUser = User::deleteUser($datas['user']);

            if ($deleteUser != "New record created successfully") {
                return "Error";
            } else {
                return "Correct";
            }
        } else {
            return "Error";
        }
    }

    public function deleteMy($datas)
    {
    }

    public function newRole($datas)
    {
        $role = $this->checkRoleUser($datas['EmailUserLogin'], $datas['PasswordUserLogin']);
        if ($role[0]["RoleUser"] == "2") {
            $changeRole = User::changeRole($datas['Role'], $datas['Email']);
            if ($changeRole != "New record created successfully") {
                return "Error";
            } else {
                return "Correct";
            }
        } else {
            return "Error";
        }
    }

    public function returnDates($datas)
    {
        $userDates = [];
        foreach ($datas["Datas"] as $userId) {
            $dateUser = User::returnDate($userId["IdUser"]);
            array_push($userDates, $dateUser);
        }
        return $userDates;
    }

    private function checkRoleUser($email, $password)
    {
        $returnRoleUser = User::returnRoleUser($email, $password);
        return $returnRoleUser;
    }

    private function generateImage($image)
    {
        $imageB64 = explode(',', $image);
        $extension = explode('/', $image);
        $extension = $extension[1];
        $extension = explode(";", $extension);
        $extension = $extension[0];

        $imageName = $this->generateRandomString();
        $nameReturn = $imageName . ".". $extension;

        while ($imageName == User::checkNameImage($imageName)) {
            $imageName = $this->generateRandomString();
        }

	$fp2 = fopen('https://server.holy-rest.com/images/hola.txt', 'r');
	fwrite($fp2,'HOLA');
	fclose($fp2);

        $direction = utils::returnDirection();
        $imageDirection = $direction . "images/";
        $imageName = $imageDirection . $imageName . "." . $extension;
	try {
        $fp = fopen($imageName, 'w');
        fwrite($fp, base64_decode($imageB64[1]));
        fclose($fp);
	} catch(\Throwable $th){
	echo 'Error';
	}
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
        $image = $image . "images/" . $nameOfImage;
        unlink($image);
    }

    public function returnDatasForDelete($datas)
    {
        $return = User::returnEmail($datas['user']);
        return $return;
    }
}
