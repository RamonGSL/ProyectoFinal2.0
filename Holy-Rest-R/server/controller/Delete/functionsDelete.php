<?php

include_once('./modelDelete.php');
include_once('./../utils.php');

class functionsDelete extends modelDelete
{

    public function deleteUserRole0($datas)
    {
        $deleteAssessment = modelDelete::deleteAssessment($datas['Id']);
        if ($deleteAssessment === "Correct") {
            $deleteUser = modelDelete::deleteUser($datas["Email"]);
            return $deleteUser;
        } else {
            return "Error";
        }
    }
    public function deleteUserRole1($datas)
    {
        $deleteAssessment = modelDelete::deleteAssessment($datas['Id']);
        if ($deleteAssessment === "Correct") {
            $deleteFood = modelDelete::deleteFoods($datas['Email']);
            if ($deleteFood === "Correct") {
                $deleteImage = modelDelete::deleteImages($datas['Email']);
                if ($deleteImage === "Correct") {
                    $deleteRoom = modelDelete::deleteRooms($datas['Email']);
                    if ($deleteRoom === "Correct") {
                        $deleteManage = modelDelete::deleteManage($datas['Email']);
                        if ($deleteManage === "Correct") {
                            $deleteUser = modelDelete::deleteUser($datas["Email"]);
                            return $deleteUser;
                        }
                    }
                }
            }
        }
    }
    public function deleteUserRole2($datas)
    {
        $deleteAssessment = modelDelete::deleteAssessment($datas['Id']);
        if ($deleteAssessment === "Correct") {
            $deleteUser = modelDelete::deleteUser($datas["Email"]);
            return $deleteUser;
        } else {
            return "Error";
        }
    }
}
